---
published: true
layout: post
title: "AngularJS gotchas"
description: ""
modified: 2014-10-10
tags: [angularjs, gotchas, IE8, lessons learnt]
comments: true
share: true 
image:
  feature: abstract-6.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

There are lots of things that have tripped me up with Angular. This post is intended to be
a list of all of the things that have tripped me up, with relevant links


##General Gotchas

###$http GET requires a data property for the `content-type` header to be sent
This won’t send a `content-type` header with the GET request:
{% highlight js  %}
$http({url: '/something', method: 'GET'})
{% endhighlight %}

But this will:
{% highlight js  %}
$http({url: '/something', method: 'GET', data: ''})
{% endhighlight %}


##IE8-specific Gotchas

###Specifying directives as elements
You can’t declare a directive as an element in IE8.

{% highlight html  %}
<!-- This won't work in IE8-->
<my-directive attr="true"></my-directive>

<!-- Attribute-syntax IS supported in IE8-->
<div my-directive attr="true"></div>
{% endhighlight %}


###Whitespace in transcluded content
This won’t work in IE8:
{% highlight html  %}
<div your-custom-directive-which-transcludes-content>
   <span>There’s whitespace before this span but it looks nicely formatted in the editor</span>
</div>
{% endhighlight %}

Instead, you need to do make sure there is no whitespace surrounding the content:
{% highlight html  %}
<div your-custom-directive-which-transcludes-content><span>My content</span></div>
{% endhighlight %}

[StackOverflow](http://stackoverflow.com/questions/24221661/object-doesnt-support-this-property-or-methoddiv-ng-transclude)
