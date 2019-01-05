---
title: "events"
description: "Osagai events"
layout: "guide"
weight: 3
---

<article id="overview">

## Overview
The `osagai/events` module has functions for adding event listeners in your custom
element DOM tree. Use this module if you need to listen to events.

- [`on`](#on)

</article>

<hr />

## Reference

<article id="on">

## on

```javascript
on(eventType, element, callback) => Promise
```

Add an event listener to the element and return a promise when this is done.

##### Parameters

###### eventType
A case-sensitive string representing the [event type](https://developer.mozilla.org/en-US/docs/Web/Events)
to listen for

###### element
Instance of the element to add the event listener. It could be also a promise that resolve
with the element (ex. `query` and `queryAll` functions from the component function)

###### callback
A function that runs when the event type occurs. It could also be an object
that implements the [EventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) interface.

</article>
