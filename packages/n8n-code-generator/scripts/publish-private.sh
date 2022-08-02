#!/usr/bin/env bash

set -e  # exit when any command fails
set -x  # print each command
debug="true"
currentTag=`git name-rev --name-only --tags HEAD`


function go () {
  # arguments
  branch=$1
  tag=$3
  commitMsg=$4

  # apply defaults
  branch=${branch:=dist}
  tag=${tag:="dist/$currentTag"}
  commitMsg=${commitMsg:="Publish $tag"}

  if [ $debug != "true" ]
  then
    npm run build
    git stash push -a dist
    
    # switch to distr branch
    if git show-ref --verify --quiet refs/heads/$branch
    then
      git checkout $branch
    else
      echo "Local branch not exists, checking out from remote."
      git checkout --track $branch
    fi
    
    git pull
    rm -rf dist
    git stash pop
    npm version --no-commit-hooks --no-git-tag-version $1
    git add --all
    git commit -m $commitMsg
    git tag $tag
    git push
    git push origin $tag
    git checkout main
  else
    set +x
    echo $ver
    echo $branch
    echo $tag
    echo $commitMsg
  fi
}

# Checks

if [ $debug == "false" ]
then
  if [ -z "$(git status --porcelain)" ]; then
    echo "Working directory not clean, there is Uncommitted changes"
    exit 1;
  fi

  if [ $currentTag == 'undefined' ]
  then
    echo "You are not on tag. Release first, then publish."
    exit 1;
  fi
fi

# Run

go "$@"