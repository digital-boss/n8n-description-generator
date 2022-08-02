#!/usr/bin/env bash

# Usage: 
# 		 release.sh $ver $package
#		OR release.sh $ver '' $tag $commitMessage
#
# Examples:
# 		 release.sh 0.1.2 myproj
# 	or release.sh 0.1.2 '' "myproj-v0.1.2" "Release myproj v0.1.2"

set -e  # exit when any command fails
set -x  # print each command
debug="false"


function go () {
	# arguments
	ver=$1
	package=$2
	tag=$3
	commitMsg=$4

	tag="$package-v$ver"
	commitMsg="Release $package v$ver"

	# defaults
	tag=${tag:="v$ver"}
	commitMsg=${commitMsg:="Release $ver"}

	if [ $debug != "true" ]
	then
		git pull
		npm run version:bump $ver
		npm run version:gen --if-present
		npm run build
		git add --all
		git commit -m "$commitMsg"
		git tag "$tag"
		git push
		git push origin $tag
	else # test/dry run - just output variables
		set +x
		echo $ver
		echo $package
		echo $tag
		echo $commitMsg
	fi
}

# Checks

if [ $debug == "false" ] && [ -n "$(git status --porcelain)" ]; then
	echo "Working directory not clean, there is Uncommitted changes"
	exit 1;
fi

# Run

go "$@"
