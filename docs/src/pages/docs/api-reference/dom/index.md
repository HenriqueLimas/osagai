---
title: "dom"
description: "Osagai dom"
layout: "guide"
weight: 2
---

<article id="overview">

## Overview

The `osagai/dom` module has functions responsible for manipulating the DOM tree
of the custom element. Use this module if your custom element will need to
update the data and efficiently update the DOM.

- [`update`](#update)

### Update DOM elements

Usually, our components needs to be updated reflecting the data passed in the `Template`
function into the DOM. This could not be so performant if we always use `innerHTML`
for reflecting the template defined. For that reason, `osagai` use a library called
[`morphdom`](https://github.com/patrick-steele-idem/morphdom) that change only the
elements in the DOM that differentiate from the previous state. Note: If you use a custom
`renderer` in the `define` function, the `update` function will use that custom
renderer instead of `mophdom`.

</article>

<hr />

## Reference

<article id="update">

## update

```javascript
update(element, dataChanger) => Promise(newData)
```

Updates the data of the Component, scheduling a new change in the DOM
using the renderer (default to `morphdom`) and return a promise with
the new data returned by the `dataChanger`.

##### Parameters

###### element
Instance of the osagai element

###### dataChanger
Function that receive as parameter the data that needs to be changed
and needs to return the new data. This could also be a promise that
will be resolved by the `update` function.

##### Example

```javascript
update(element, (data = {}) => {
  data.changed = true
  return data
})
```

###### Async function

```javascript
update(element, async (data = {}) => {
  const items = await api.getItems()
  data.items = items
  return data
})
```

</article>
