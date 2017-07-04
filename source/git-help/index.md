---
title: Git Tips
date: 2015-03-14 22:26:35
---

[http://ndpsoftware.com/git-cheatsheet.html](Git Cheatsheet)

<!-- toc -->

## Permanently Authenticating on OSX
Use the [osxkeychain credential helper](https://confluence.atlassian.com/display/STASH/Permanently+authenticating+with+Git+repositories)

## Common commands

Purpose | Command
:------ | :------
Create a repository | {% codeblock lang:bash line_number:false %}
                      cd projectDir
                      git init{% endcodeblock %}
Create a bare repository (on a USB stick, for transferring between networks) | {% codeblock lang:bash line_number:false %}
                                                                               cd projectDir
                                                                               git init —-bare myrepo.git
                                                                               # Then set this repo as the origin of a local repo{% endcodeblock %}  
Checkout a branch | {% codeblock lang:bash line_number:false %}git checkout _branchName_
                    {% endcodeblock %}
Commit changes | {% codeblock lang:bash line_number:false %}
                  git add .		# add changed files to staging area
                  git commit -m "message"   # Commit with a message
                  {% endcodeblock %}
Status of repository | {% codeblock lang:bash line_number:false %}git status
                       {% endcodeblock %}
Last commit message | {% codeblock lang:bash line_number:false %}
                      git log -1 		# view last commit
                      git log -5		# view last 5 commits
                      git log -1 --pretty=%B  # Prints just the commit message{% endcodeblock %}


## Emergency commands

### Delete a tag
{% codeblock lang:bash %}
git tag -d _tagName_
git push origin :refs/tags/_tagName_{% endcodeblock %}

### Revert 
"Revert" reverts any _public_ commits done on the repository (current branch).

####  Revert Commit(s) from the history by generating another commit that reverses the impact of the commit that you are trying to revert.
{% codeblock lang:bash %}
git commit -m "changes that will be reverted"
git revert HEAD     # newset commit points to previous commit
git revert HEAD~2   # newset commit points to the commit 2 commits ago{% endcodeblock %}

#### Revert all unstaged changes
{% codeblock lang:bash %}
git checkout -- .  # . = all changed files{% endcodeblock %}

### Reset
Reset CHANGES the history, whereas revert ADDS to the history. BEWARE! Is designed only for _local_ changes

{% codeblock lang:bash %}
# Create a new file called `foo.java` and add some code to it

# Commit it to the project history
git add foo.js
git commit -m "Start developing a crazy feature"

# Edit `foo.js` again and change some other tracked files, too

# Commit another snapshot
git commit -a -m "Continue my crazy feature"

# Decide to scrap the feature and remove the associated commits
git reset --hard HEAD~2

{% endcodeblock %}