---
published: false
layout: post
title: "Exploring the different kinds of AngularJS directives"
description: ""
modified: 2014-03-20
tags: [angularjs, directives, components]
comments: true
share: true 
---

While working for a client, I wanted to come up with some directives to try and keep the code dry.
I noticed that most of the form fields we used had the same basic HTML structure, which supported labels, the field itself,
tooltips and error messages. Rather than copy that code for each form field, why not use a directive to do it? 

Sounds simple, but it took me a while to understand that not all directives need to have their own scope. So here's a list of
the kinds of directives that I've seen and/or written.

Decorator Directives
- add behaviour to an exisiting element (e.g. form directive, or extending the default anchor element behaviour)
- powerful in that you don't need to change your HTML to start using them (as they decorate existing elements)
- work most-naturally with elements, but it is possible to decorate attribute-directives too (using priority)
- may or may not require an isolate scope 

Template Directives
- Use when you want to change the DOM structure of an existing element, or when you want to add a specific DOM structure around existing elements
- Does NOT require an isolate scope (in fact, creating an isolate scope will produce unexpected results)

Component Directives
- Have internal state that they want to manage
- Generally have isolate scope to help manage the state
- May require their own controller when co-ordinating behaviour across multiple directives (e.g. angular-ui Tab/TabPane directives)