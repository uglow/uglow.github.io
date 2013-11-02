---
published: true
layout: post
title: "Setup Jekyll for Github Pages"
description: ""
modified: 2013-11-01
tags: [git, github, jekyll, newbie]
comments: false
share: true 
---

Using [this article](alink: http://davidensinger.com/2013/04/deploying-jekyll-to-github-pages/) as a guide and
[this one](http://blog.coolaj86.com/articles/hosting-your-blog-on-github-pages.html):

##Setup
Basically what we will do is commit the source code into a `source` branch and have the compiled code on the master branch:

{% highlight console  %}
# rename current master to something else
git branch -m master master-old
# Create source branch from the old master and check it out
git checkout master-old && git checkout -b source
{% endhighlight %}

## Publishing Steps

1. Build your site from the `source` branch into `/web` (your output folder). I'm using `grunt` to do this step.
1. Checkout the `master` branch
1. Remove the existing content files from `master`
1. Copy the new site content into the root project directory
1. Add the new site content to git & push to origin

Here's a script to do Step 2 onwards, which I call from `grunt` after doing step 1:

{% highlight console  %}
git status

# Checkout master branch
git checkout master

# Rename the /web directory to .web
mv web .web
mv node_modules .node_modules
 
# Remove all non . files
rm -rf *

# Copy everything from .web to current dir
rsync -a .web/ ./
 
# Remove .web 
rm -rf .web

# Add everything
git add .

# Commit using the same commit message as from the 'source' branch
git commit -C source
git push origin master

# Remove everything again
rm -rf *

# Re-add node_modules
mv .node_modules node_modules

# checkout source again
git checkout source

# undo any pending changes to any files
git checkout -- .

{% endhighlight %}