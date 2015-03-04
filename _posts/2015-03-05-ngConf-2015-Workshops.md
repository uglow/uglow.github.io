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

**Update 11:30am** 

## ngAnimate Advanced (11:30am -) Lukas Ruebbelke [One hungry mind](http://onehungrymind.com/)
- Has a Flex / Actionscript / Flash background
- Uses Greensock animation library
- Also see `ngFx` for alternative JS animations

ngAnimate is about *events* and *conventions*.
- enter, leave, move (DOM manipulation via ng-if, ng-repeat)
- addClass, removeClass

"ngAnimate is really just a CSS-defined directive for animations"

Naming convention: \[class\]\[event\]\[state\] e.g. `.repeat-item.ng-leave.ng-leave-active`

You can also write JS animations using `myApp.animation('.fade', ...`. This works well with Greensock library.

CSS animations allow you to do harder things (like staggering, and animation cancelling) easier than in JS.

Exercises: http://plnkr.co/edit/YhuDxvW9FSpW5SHQFfHT?p=info



## Angular Formly (10am-11:20am)

Formly has a dependency on a library called `apiCheck.js` (also by Kent), which you can use to validate that the parameters passed to your
components' APIs are valid, and if not, provide a nice error message. It also requires `jquery`. :(

Formly works with Angular 1.2+. Separation of core-library from templates, which are in another library.
Formly knows about the form definition, Formly-Bootstrap-Template knows how to render the form definition.

Expression properties allow you to conditionally set a field-definition property.

Wrappers are how you add visible error messages to fields. E.g.: '<formly-transclude></formly-transclude><div my-messages="options"></div>'

Thoughts: - Similar to Angular-Form-Lib, but doesn't sync ARIA properties.


**Update 10:00am**: About to commence [Angular Form-ly](https://github.com/formly-js/angular-formly) workshop by Kent C Dodds.

