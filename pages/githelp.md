---
published: true
layout: page
title: "Git Tips"
description: ""
modified: 2013-11-02
tags: [git, tips]
comments: false
share: true
---
[http://ndpsoftware.com/git-cheatsheet.html](Git Cheatsheet)

##Common commands

<dl>
<dt>Create a repository</dt>
<dd>{% highlight console %}
cd projectDir
git init{% endhighlight %}</dd>

<dt>Checkout a branch</dt>
<dd>{% highlight console %}
git checkout _branchName_{% endhighlight %}</dd>

<dt>Commit changes</dt>
<dd>{% highlight console %}
git add .		# adds all changed files to the staging area
git commit -m "message"		# Commits changes to repo with a commit message
git commit -C source        # Commit changes using commit message from the 'source' branch
git commit -C HEAD          # Commit changes using commit message from the HEAD{% endhighlight %}</dd>

<dt>Status of repository</dt>
<dd>{% highlight console %}
git status	{% endhighlight %}</dd>

<dt>Last commit message</dt>
<dd>{% highlight console %}
git log -1 		# view last commit
git log -5		# view last 5 commits
git log -1 --pretty=%B  # Prints just the commit message{% endhighlight %}</dd>

</dl>


##Emergency commands
<dl>

<dt>Delete a tag</dt>
<dd>{% highlight console %}
git tag -d _tagName_
git push origin :refs/tags/_tagName_{% endhighlight %}</dd>

<dt>Revert - reverts any _public_ commits done on the repository (current branch)
 Revert Commit(s) from the history by generating another commit that reverses the impact of the commit that you are trying to revert.</dt>
<dd>{% highlight console %}
git commit -m "changes that will be reverted"
git revert HEAD     # newset commit points to previous commit
git revert HEAD~2   # newset commit points to the commit 2 commits ago{% endhighlight %}</dd>

<dt>Revert all unstaged changes</dt>
<dd>{% highlight console %}
git checkout -- .  # . = all changed files{% endhighlight %}</dd>

<dt>Reset -  It CHANGES the history, whereas revert ADDS to the history. BEWARE! Is designed only for _local_ changes</dt>
<dd>{% highlight console %}
# Create a new file called `foo.java` and add some code to it

# Commit it to the project history
git add foo.java
git commit -m "Start developing a crazy feature"

# Edit `foo.java` again and change some other tracked files, too

# Commit another snapshot
git commit -a -m "Continue my crazy feature"

# Decide to scrap the feature and remove the associated commits
git reset --hard HEAD~2

{% endhighlight %}</dd>

</dl>


##Typical Workflow

