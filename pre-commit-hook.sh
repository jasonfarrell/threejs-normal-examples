#!/bin/sh

if git rev-parse --verify HEAD >/dev/null 2>&1
then
    against=HEAD
else
    # Initial commit: diff against an empty tree object
    against=4b825dc642cb6eb9a060e54bf8d69288fbee4904
fi

git stash --include-untracked --keep-index -q
output=`grunt validate-code`
ret=$?
git stash pop -q

if [ 0 -ne $ret ]; then
  grunt validate-code
  echo "You have JavaScript errors. Commit aborted."
  exit 1
fi
