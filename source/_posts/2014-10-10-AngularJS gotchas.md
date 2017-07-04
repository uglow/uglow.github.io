---
title: AngularJS gotchas
date: 2014-10-10
tags: [AngularJS, gotchas, IE8, lessons learnt]
coverImage: abstract-6.jpg
coverCaption: '[dargadgetz](http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/)'
---

There are lots of things that have tripped me up with Angular. This post is intended to be a list of all of the things that have tripped me up, with relevant links

<!-- more -->

## General Gotchas

### $http GET requires a data property for the `content-type` header to be sent
This won’t send a `content-type` header with the GET request:
{% codeblock lang:js  %}
$http({url: '/something', method: 'GET'})
{% endcodeblock %}

But this will:
{% codeblock lang:js  %}
$http({url: '/something', method: 'GET', data: ''})
{% endcodeblock %}


## IE8-specific Gotchas

### Specifying directives as elements
You can’t declare a directive as an element in IE8.

{% codeblock lang:html  %}
<!-- This won't work in IE8-->
<my-directive attr="true"></my-directive>

<!-- Attribute-syntax IS supported in IE8-->
<div my-directive attr="true"></div>
{% endcodeblock %}


### Whitespace in transcluded content
This won’t work in IE8:
{% codeblock lang:html  %}
<div your-custom-directive-which-transcludes-content>
   <span>There’s whitespace before this span but it looks nicely formatted in the editor</span>
</div>
{% endcodeblock %}

Instead, you need to do make sure there is no whitespace surrounding the content:
{% codeblock lang:html  %}
<div your-custom-directive-which-transcludes-content><span>My content</span></div>
{% endcodeblock %}

See [StackOverflow](http://stackoverflow.com/questions/24221661/object-doesnt-support-this-property-or-methoddiv-ng-transclude) for more details.
