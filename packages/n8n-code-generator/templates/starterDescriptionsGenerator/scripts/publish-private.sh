#!/usr/bin/env bash

set -e  # exit when any command fails
set -x  # print each command

debug="false"

currentTag=$(git name-rev --name-only --tags HEAD)
main=$(git branch --show-current)

# arguments & defaults
files="dist package.json README.md LICENSE.md"
branch=${branch:=dist}
tag=${tag:="dist/$currentTag"}
commitMsg=${commitMsg:="Publish $tag"}


###############################################################################
### Checks

gitRepoIsClean() {
  if [ -n "$(git status --porcelain)" ]
  then
    echo "Working directory not clean, there is Uncommitted changes"
    exit 1;
  fi
}

gitRepoIsOnTag() {
  if [ $currentTag == 'undefined' ]
  then
    echo "You are not on tag. Release first, then publish."
    exit 1;
  fi
}

runAllChecks() {
  gitRepoIsClean
  gitRepoIsOnTag
}


###############################################################################
### Utilities & Helper functions

outputVariables() {
  set +x
  echo branch=$branch
  echo tag=$tag
  echo commitMsg=$commitMsg
  echo main=$main
}


###############################################################################
### Main logic

createOrphan() {
  echo "Create new orphan branch and push to remote"
  git checkout --orphan $branch
  git reset
  git commit --allow-empty -m 'Initial empty root commit'
  git push --set-upstream origin $branch
}

switchToDistBranch() {
  if git show-ref --verify --quiet refs/heads/$branch
  then
    echo "Local branch exists"
    git checkout $branch
  else
    echo "Local branch not exists"
    if git branch -a | grep "\bremotes/origin/$branch$"
    then
      echo "Remote exists. Checking out from remote."
      git checkout --track origin/$branch
    else 
      echo "Remote not exists."
      createOrphan
    fi
  fi
}

saveDistToTmp() {
  local tmp=$(mktemp -d)
  cp -r $files "$tmp/"
  echo $tmp
}

deleteDistContent() {
  rm -rf $files
}

restoreDistFromTmp() {
  local tmp=$1
  cp -r $tmp/* .
  rm -rf $tmp
}

main() {
  npm run build
  
  tmp=$(saveDistToTmp)
  switchToDistBranch
  git pull
  deleteDistContent
  restoreDistFromTmp $tmp

  git add --all -f $files
  git commit -m "$commitMsg"
  git tag "$tag"
  git push --set-upstream origin $branch
  git push origin $tag
  git reset --hard
  git clean -f -d -e node_modules
  git checkout $main
}


###############################################################################
### Entry point

if [ $debug != "true" ]
then
  runAllChecks
  main "$@"
else
  outputVariables
fi
