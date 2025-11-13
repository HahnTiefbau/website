#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

set -eu

# see https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/#Default-variables for all variables
if [ -z ${GITHUB_HEAD_REF+x} ]; then
  echo "Skipping commit linting: No source branch specified, so we are not in a pull request..."
  exit 0
fi
SOURCE_BRANCH=${GITHUB_HEAD_REF}

if [ -z ${GITHUB_BASE_REF+x} ]; then
  echo "Skipping commit linting: No target branch specified..."
  exit 0
fi
TARGET_BRANCH=${GITHUB_BASE_REF}

echo "Checking all commits between branches $SOURCE_BRANCH and $TARGET_BRANCH"

git fetch origin $SOURCE_BRANCH:$SOURCE_BRANCH
git fetch origin $TARGET_BRANCH:$TARGET_BRANCH

# We fetch all commits between the given branches but limit the number
# of commits to the last 100, in case something goes wrong
COMMITS=$(git log --pretty=format:"%H" -n 100 --no-merges $SOURCE_BRANCH...$TARGET_BRANCH)

for COMMIT in $COMMITS
do
  echo "Checking commit $COMMIT..."
  # Extract the commit message for the current commit
  MSG=$(git log --format=%B -n 1 $COMMIT)
  # Save the commit message to a temporary file
  MSG_FILE=$(mktemp)
  echo "$MSG" > $MSG_FILE
  # Use the validate_commit_msg.py script to check the commit message
  python3 $SCRIPT_DIR/validate_commit_msg.py $MSG_FILE
  # Clean up the temporary file
  rm $MSG_FILE
done

