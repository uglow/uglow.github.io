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

<dt>Revert all unstaged changes</dt>
<dd>{% highlight console %}
git checkout -- .  # . = all changed files{% endhighlight %}</dd>

</dl>



