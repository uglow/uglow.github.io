---
published: false
layout: post
title: "Classifying AngularJS directives"
description: ""
modified: 2014-03-20
tags: [angularjs, directives, components]
comments: true
share: true 
image:
  feature: abstract-5.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

While working for a client, I wanted to come up with some directives to try and keep the code [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself).
I noticed that most of the form fields we used had the same basic HTML structure, which supported labels, the field itself,
tooltips and error messages. Rather than copy that code for each form field, why not use a directive to do it? 

Sounds simple, but it took me a while to understand that not all directives need to have their own scope. And the example
directives in the documentation (which has improved over time) did not go into the details of the different kinds of directives that you can create, and when to use each one.

This post is an attempt to classify the different kinds of directives that you can write, with examples of components.

- Decorator Directives (as in the Gang-of-4 decorator-pattern)
    - *Add* behaviour to *existing* elements/components
        - Event decoration (adding an event listener, e.g. `ng-focus`, `ng-blur`, `ng-click`)
        - State decoration (adding more properties to a controller, such as adding an `isSubmitted` property to the `ngForm`'s controller)
    - Powerful in that you don't need to change your HTML to start using them (as they decorate existing elements)
    - Can co-exist with other decorator-directives on the element and can decorate component-directives
    - These directive work most-naturally with elements, but it is possible to decorate attribute-directives too (using `priority`)
    
    - Element-level Interceptors
        - These also use the decorator pattern, but typically *change* the existing behaviour of a component
        - Examples: A directive that binds to the click event of a button and conditionally processes the event (overriding the basic `ng-click` behaviour).
        
    - Global-level interceptors
        - Add listeners to the window or document objects
        - Useful to apply global behaviour changes, rather than element-level behaviour changes

- Component Directives
    - Transform into one-or-more DOM elements
    - Different to decorators in that you *almost always* need to change your HTML to use them (it is possible to completely replace (hijack) the behaviour of an element with a new directive (using `priority` and `terminal`), but this is not common) 
    - Usually rely on being the "master" directive on an element - co-existence with other directives & attributes may not be meaningful (or possible), depending on the DOM transformation that the directive produces.
    - Usually have internal state (and keep the component state separate from the external state)

    - Stateless Components
        - Don't have internal state
        - Rely on being configured by hand, each time they are used
        - Directive consists of templateUrl, and not much else

    - Stateful Components
        - Maintain an internal state, optionally linked to properties on the external state (via the `scope: { 'prop': ...}` directive property)
        - Required for more-complex components, to prevent the component's state existing as part of the external state (and potentially colliding with existing external-state properties)

    - Stateful Collaborative Components (e.g. ngForm && input, select, with ngModelController as the controller)
        - Master-child relationship between a set of directives
        - Master has a controller, maintains state of the system
        - Children register with the controller
    


##Decorators
- add behaviour to an exisiting element (e.g. form directive, or extending the default anchor element behaviour)
- powerful in that you don't need to change your HTML to start using them (as they decorate existing elements)
- work most-naturally with elements, but it is possible to decorate attribute-directives too (using priority)
- may or may not require an isolate scope 

###Examples:
- Adding an event-listener to an element E.g. `ngClick`, `ngMouseup`
- Using `ngModel` to bind a an `<input>` to a scope's data model
- `ng-repeat` can be added to an existing element and it also creates it's own isolate-scope which is used by it's child elements


##Interceptors
- A kind of decorator that intercepts the existing behaviour, and often modifies it in some. This is in contrast to a directive which adds new behaviour.

### Examples
- Directive that listens to `click` or `focus` events on the `window` object (for some purpose)
- ngDisabled, w


##Template Directives
- Use when you want to change the DOM structure of an existing element, or when you want to add a specific DOM structure around existing elements
- Can have an isolate scope, but this is optional (sometimes creating an isolate scope will produce unexpected results)

###Examples:
- Any directive that uses `template` or `templateUrl`, such as the [Angular Bootstrap](http://angular-ui.github.io/bootstrap/) directives
- Difference between a template-directive and a component-directive is that template directives usually don't 


##Component Directives
- Have internal state that they want to manage
- Generally have isolate scope to prevent internal state being interfered with by external state
- May require their own controller when co-ordinating behaviour across multiple directives (e.g. angular-ui Tab/TabPane directives)