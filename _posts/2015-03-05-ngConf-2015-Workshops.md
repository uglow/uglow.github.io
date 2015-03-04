---
published: true
layout: post
title: "ngConf 2015 - Day 2 - Workshops"
description: "ngConf 2015 - Advanced Angular Workshops"
modified: 2015-03-05
tags: [angularjs, ngConf, 2015]
comments: true
share: true 
image:
  feature: ngConf1.jpg
  credit: Me
  creditlink: 
---

**Update 10:00am**: About to commence [Angular Form-ly](https://github.com/formly-js/angular-formly) workshop by Kent C Dodds.

# Angular Formly (10am-11:20am)

Formly has a dependency on a library called `apiCheck.js` (also by Kent), which you can use to validate that the parameters passed to your
components' APIs are valid, and if not, provide a nice error message. It also requires `jquery`. :(

Formly works with Angular 1.2+. Separation of core-library from templates, which are in another library.
Formly knows about the form definition, Formly-Bootstrap-Template knows how to render the form definition.

Expression properties allow you to conditionally set a field-definition property.

Wrappers are how you add visible error messages to fields. E.g.: '<formly-transclude></formly-transclude><div my-messages="options"></div>'

Thoughts: - Similar to Angular-Form-Lib, but doesn't sync ARIA properties.




