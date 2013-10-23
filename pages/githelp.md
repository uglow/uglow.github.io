---
layout: page
permalink: githelp.html
title: Git Tips
tags: [git, tips]
share: true
---

##Common commands

###Create a repository
{% highlight console %}
cd projectDir
git init
{% endhighlight %}


##Emergency commands

###Delete a tag
{% highlight console %}
git tag -d _tagName_
git push origin :refs/tags/_tagName_
{% endhighlight %}


