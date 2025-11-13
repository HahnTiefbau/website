import sys
import re

def is_valid_commit_msg(commit_msg):
    pattern = r'^(feat|fix|refactor|chore|docs|style|test|build|ci|perf)(\(\w+\))?!?: .+'

    if re.match(pattern, commit_msg):
        return True
    else:
        return False

if __name__ == "__main__":
    commit_msg_filepath = sys.argv[1]
    with open(commit_msg_filepath, "r") as file:
        commit_msg = file.read().strip()
    if not is_valid_commit_msg(commit_msg):
        print("The commit message does not follow Conventional Commits guidelines.")
        print("Valid message examples: 'feat(module): add new feature', 'fix: correct typo'.")
        sys.exit(1)