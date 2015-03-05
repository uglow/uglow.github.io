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

**Update 5:15pm:**

*Quick Poll*: Computers in the room: Apple MacBook - 20, PC - 8.

##4. Advanced Directives (3:45 - 5:15pm) - Joe Maddalone

Practical workshop
- Externalising directive controller as a top-level controller will make testing easier
- Compile happens first, top-to-bottom, parent-to-child first. EXCEPT WHEN YOU USE `ng-transclude`. 
  - When you use `ng-transclude`, you are saying, "Make my contents of my directive a part of my (the directive's) template".
  - For the parent directive (which is using `ng-transclude`) to know it's template, the child template has to be compiled first.
  - So in this case, the compilation happens bottom-up: grandchild, child, parent
- Pre-link & post-link happen sequentially, for all elements that are siblings
- For Nested elements: prelink parent, pre-link child, post-link child, post-link parent
- Bootstrap-UI is a good place to look at how advanced techniques are used.
- PreLink is useful when You need to evaluate some data before postLink runs.
  
- You can use the transclude function to roll your own `ng-repeat` feature to deal with lists of things
  - ngRepeat uses `transclude: 'element'`, which initially takes the element out of the DOM and replaces it with a comment
  - Adds a 5th argument to postLink: function(scope, elem, attrs, ctrl, transcludeFn)

```js
transclude: 'element',  // This is what we are doing - transcluding THIS ELEMENT (not the contents of this element)
link: function(scope, elm, attrs, ctrl, transclude){
  var current = elm;
  var cloneScope;
  scope.$watch('featureList', function(newVal){
    newVal.forEach(function(f, i){
      cloneScope = scope.$new();
      cloneScope.feature = f
      
      // The next line is saying "clone the element that this directive is attached to, and provide it with it's own scope"
      transclude(cloneScope, function(clone){
        current.after(clone);
        current = clone;
      });
    })
})
```

- Use bindOnce to reduce number of watchers (see example - didn't cover in workshop)


**Update 3:30pm:**

##3. Protractor (2:15 - 3:30pm) - Ben Clinkinbeard

Stack: Node - Protractor - selenium-webdriver (calls local or remote) selenium server - browser driver - mouse moves!

Official Binding: `selenium-webdriver`, aka `WebdriverJS`. There's also something called `WebDriverIO`, which used to be called
`webdriverjs`.

Protractor has a great JS Selenium API, even when using it on a non-JS site. Extends Selenium APIs, easier to use. But biggest
feature is that Protractor knows about Angular's run loop. Under the covers, Protractor is completely asynchronous.

`element(.by.css*'something')).click()` produces 3 HTTP calls under the covers.

A modified version of Jasmine is included in Protractor. All of the test steps are converted into promise chains, which
Protractor then executes as each promise is resolved or rejected.

Protractor externalises the Selenium config, which is really helpful.

Using `directConnect` option bypasses the need for Selenium when you are testing browsers locally. This is much faster
than going through Selenium, but only usable when the browser you want to test is installed locally.

You can separate all your Protractor config into separate files (if you need to), as it's just Node JS files. `require()`.
 
Appium allows you to test on simulator, and on device, requires XCode. Tests Mobile Safari, Android. Use Appium's GUI. Hard to setup though.

Test Providers: Sauce Labs, BrowserStack. They offer managed selenium infrastructure, hundreds of platforms, CI integration, Dashboard.
Sauce Labs is better than BrowserStack. Both offer screen-casting as well - useful.

This workshop will probably end up as a training course at Odecee :)


**Update 11:30am:** 

##2. ngAnimate (11:30am - 2:20pm) - Lukas Ruebbelke [One hungry mind](http://onehungrymind.com/)
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

Focussed more on JS implementation.



##1. Angular Formly (10am-11:20am) - Kent C Dodds

Formly has a dependency on a library called `apiCheck.js` (also by Kent), which you can use to validate that the parameters passed to your
components' APIs are valid, and if not, provide a nice error message. It also requires `jquery`. :(

Formly works with Angular 1.2+. Separation of core-library from templates, which are in another library.
Formly knows about the form definition, Formly-Bootstrap-Template knows how to render the form definition.

Expression properties allow you to conditionally set a field-definition property.

Wrappers are how you add visible error messages to fields. E.g.: '<formly-transclude></formly-transclude><div my-messages="options"></div>'

Thoughts: - Similar to Angular-Form-Lib, but doesn't sync ARIA properties.


**Update 10:00am**: About to commence [Angular Form-ly](https://github.com/formly-js/angular-formly) workshop by Kent C Dodds.
Workshop notes: http://cl.ly/text/151s1s2K293A
