---
title: "lifecycles"
description: "Osagai lifecycles"
layout: "guide"
weight: 3
---

<article id="overview">

## Overview
The `osagai/lifecycles` module has functions for listening to [lifecyles of the custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks).
Use this module if you need to define different callbacks which are fired at different points in
the element's lifecycle.

- [`onConnected`](#onConnected)
- [`onDisconnected`](#onDisconnected)
- [`onAttributeChanged`](#onAttributeChanged)

### Lifecycles

#### Connected

A custom element is consider as connected when the element is appended into a document.
This will also happen when the element is moved.

#### Disconnected

The custom element is disconnected when it is removed from the document. It could be
useful for any necessary cleanup like subscriptions or cancelling network requests.

#### Attribute changed

This is invoked when an attribute from the `observedAttributes` list is added, changed or
removed. This could be useful to make network request for updating the data.

```javascript
const unsubscribe = onAttributeChanged(element, ({ name, current }) => {
  if (name === 'userID') {
    update(element, async () => {
      return await api.getUser(current)
    })
  }
})
```

</article>

<hr />

## Reference

<article id="onConnected">

## onConnected

```javascript
onConnected(element, callback)
```

Add a callback to be performed when the element is connected in the document.

##### Parameters

###### element
Instance of the osagai element

###### callback
Function that will be perfomed when the element is connected.

</article>

<hr />

<article id="onDisconnected">

## onDisconnected

```javascript
onDisconnected(element, callback)
```

Add a callback to be performed when the element is disconnected from the document.

##### Parameters

###### element
Instance of the osagai element

###### callback
Function that will be perfomed when the element is disconnected.

</article>

<hr />

<article id="onAttributeChanged">

## onAttributeChanged

```javascript
onAttributeChanged(element, callback) => function
```

Add a callback to be performed when one of the attribute from the `observedAttributes`
list is added, changed or removed. Returns an unsubscriber function which when called
removes the callback to get more updates of attribute changes.

##### Parameters

###### element
Instance of the osagai element

###### callback
Function that will be runned with an object with the information of the attribute changed:

- **name**: string that represent the name of the attribute that changed
- **current**: string with the new value
- **old**: string with the old value

</article>

<hr />
