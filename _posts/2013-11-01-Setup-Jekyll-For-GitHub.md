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


{% highlight console linenos %}
# rename current master to something else
git branch -m master master-old
# Create source branch from the old master and check it out
git checkout master-old && git checkout -b source

# Delete the master branch
git branch -D master
# Create a new master branch
git checkout -b master
#Force the web subdirectory to be project root:
git filter-branch --subdirectory-filter web/ -f


{% endhighlight}