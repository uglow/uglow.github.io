---
published: true
layout: post
title: "Classifying AngularJS directives"
description: ""
modified: 2014-10-13
tags: [angularjs, directives, components]
comments: true
share: true 
image:
  feature: abstract-5.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

There are many different kinds of directives. When you're starting out with Angular, it can be really difficult to
know what kind of directive you need and how to write it correctly. This article aims to classify the main types of directives,
their key features, when to use them and how to write them.

Through-out this post I'll refer to HTML elements and components interchangeably. Given that an HTML element can be both an element and a component (in the sense
that it may have built-in behaviour or directive-provided behaviour, the line between the two things is indistinguishable). 

#Summary

- Decorator Directives (as in the Gang-of-4 decorator-pattern)   
    - Additive Decorators 
    - Intercepting Decorators

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
        - Required for more-complex components, to prevent the component's state leaking into the external state (and potentially colliding with existing external-state properties)

    - Stateful Collaborative Components (e.g. ngForm + input or ngForm + select, with ngModelController as the controller)
        - Master-child relationship between a set of directives
        - Master has a controller, maintains state of the system
        - Children register with the controller


#Decorator Directives

##Common features
- Powerful in that you don't need to change your HTML to start using them (as they decorate existing elements)
- Can co-exist with other decorator-directives on the element and can decorate component-directives
- These directive work most-naturally with elements, but it is possible to decorate attribute-directives too (using `priority`)

##Additive Decorators
Additive decorators *add* behaviour to *existing* elements/components (e.g. form directive, or extending the default anchor element behaviour).

There are 3 main ways to decorate an element/component:

- Event decoration (adding an event listener, e.g. `ng-focus`, `ng-blur`, `ng-click`)
- State decoration (adding more properties to a controller, such as adding an `isSubmitted` property to the `ngForm`'s controller)
- View decoration (adding things to the DOM, such as product-directive which adds the class `new-product` to an element if the product is less than 3 months old)

###When to use
Use when you want to preserve the existing behaviour of a component/element, but add additional behaviour.

###How to write
Typically you would add the additional behaviour to the `link` function, meaning that the behaviour is added when the element is linked to the DOM and receives a `$scope` reference.

If the directive needs to change the DOM, you must be careful not to break other directives or make assumptions about the element-or-its-contents. If other directives try to change the DOM, an error will occur, so consider changing the directive from a decorator into a full component.

###Examples
- Adding an event-listener to an element E.g. `ngClick`, `ngMouseup`. Note that these directive do not modify the element itself - good!
- Using `ngModel` to bind a an `<input>` to a scope's data model
- `ng-repeat` can be added to an existing element and it also creates it's own isolate-scope which is used by it's child elements


##Interceptors
- A kind of decorator that intercepts the existing behaviour, and *often modifies it*.
    - Element-level Interceptors
        - These also use the decorator pattern, but typically *change* the existing behaviour of a component
        - Examples: A directive that binds to the click event of a button and conditionally processes the event (overriding the basic `ng-click` behaviour).
        
    - Global-level interceptors
        - Add listeners to the window or document objects
        - Useful to apply global behaviour changes, rather than element-level behaviour changes

###Examples
- Element-level interceptor: Directive that listens to `click` or `focus` events on the `window` object (for some purpose)
- The `anchor` directive which intercepts the browser's default anchor behaviour and replaces it with Angular-specific behaviour in most cases. (I say 'in most cases' because the directive does not intercept URLs which are external to the application. This fact does not change the nature of the directive - it still intercepts *every* anchor element and decides what to do with it *after* intercepting it.) 


##Template Directives
- Use when you want to change the DOM structure of an existing element, or when you want to add a specific DOM structure around existing elements
- Can have an isolate scope, but this is optional (sometimes creating an isolate scope will produce unexpected results)

###Examples
- Any directive that uses `template` or `templateUrl`, such as the [Angular Bootstrap](http://angular-ui.github.io/bootstrap/) directives
- Difference between a template-directive and a component-directive is that template directives usually don't need to have their own state


#Component Directives
- Have internal state
- Generally have isolate scope to prevent internal state being interfered with by external state
- May require their own controller when co-ordinating behaviour across multiple directives (e.g. angular-ui Tab/TabPane directives)

###Examples
- Any directive that has an isolate scope (a private scope). E.g. if the directive object contains something like this:  `..., scope: { title: '@' }, ...`
- Components that remember the state of a control, such as Tab Panes, DatePickers and most other input controls.


#Conclusion
I wrote this article to help me understand how to build different kinds of components in AngularJS. It was written over several months, so please excuse the grammatical or stylistic inconsistencies.
It's helped me when designing new components to consider what I'm trying to do.
Do I want to replace the existing behaviour of an element? - use an interceptor. Do I want the new behaviour to work alongside other behaviours? - use an additive decorator.
Do I want to generate a whole new set of DOM elements which don't need private state? - use a template. OR Do I want to create an element which has it's own state? - use a component.

Now it's time to consider [channels, CSP and transducers...](http://phuu.net/2014/08/31/csp-and-transducers.html)
