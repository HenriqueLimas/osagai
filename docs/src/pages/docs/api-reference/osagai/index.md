---
title: "osagai"
description: "Osagai Top-Level API"
layout: "guide"
weight: 1
---

<article id="overview">

## Overview

### Define custom elements

Osagai let you define your <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements" target="_blank">custom elements</a> in a functional way,
making than reusable and think about the separation of the component logic from the view.
Custom elements can be defined using the [`define`](#define) function,
passing the name of the component with the `Component` function

#### Component function
Osagai Components are functions that will define your custom element.
They need to return a `Template` function and can be used to add the logic of your custom
element. Like adding event listeners, making api calls or initialize variables. Osagai will
pass useful arguments to the Component like the `element` reference and methods
like `query` and `queryAll` that you can use to query elements in the element DOM tree.
Both methods return a promise resolving the value as the element that match the query.

```javascript
function Component({element, query, queryAll}) {
  /* ✨ Some magic here ✨ */
  return () => `<h1>Hello</h1>`
}
```


#### Template function
The template function is what will define the layout of your custom element and it will be
executed during the <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks" target="_blank">connectedCallback</a> lifecycle.
The interface of the `Template` function is simple, it needs to return a string that will
define the layout of the custom element:

```javascript
function Template() {
  return '<h1>Hello</h1>'
}

```

If your components doesn't need a layout (Renderless component), you do not need to return a string, just execute your logic inside this function.

```javascript
function RenderlessTemplate() {
  window.addEventListener('resize', runSomething)
}
```

Osagai will pass as argument of the `Template` function the data needed for your layout.
This is usually changed with the `update` function of the `osagai/dom` module.

```javascript
const initialData = {name: 'world'}

function Template(data = initialData) {
  return `<h1>Hello ${data.name}</h1>`
}
```

#### Custom renderer
Osagai consider the template of the custom element as string. Initialization and updates of the element are all based of strings,
it uses `innerHTML` for the initialization and [morphdom](https://github.com/patrick-steele-idem/morphdom) for the updates.
But if you want to have a custom initialization and update, you can use the `renderer` option on the definition of the custom element.
This is a function that receives the `element` and the `template` result with the current data.
For example, you could use [lit-html](https://lit-html.polymer-project.org/) for manipulating the DOM in this way:

```javascript
import { define } from 'osagai'
import { render, html } from 'lit-html';

function renderer(element, template) {
  render(template, element);
}

function LitComponent() {
  return () => html`<h1>Hello</h1>`;
}

define('lit-component', LitComponent, { renderer });
```

</article>

<hr />

## Reference

<article id="define">

## define

```javascript
define(name, Component[, options])
```

Defines a new custom element.

##### Parameters

###### name
Name for the new custom element. Note that custom element names
must contain a hyphen (ex. `hello-world`)

###### Component
Component is the function that will return a Template function that
defines the layout of your custom element. Here you can run the logic of the component,
like making api calls or add event listeners of the component elements

###### Component class properties

- **observedAttributes**: array of strings with the attributes to observe and run <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks" target="_blank">attributeChangedCallback</a>
    ```javascript
    function HelloWorld() { /*...*/ }
    HelloWorld.observedAttributes = ["name"]

    define('hello-world', HelloWorld)
    ```


###### options `Optional`

- **BaseElement**: element constructor that the component will extend. (Default `HTMLElement`)
- **renderer**: Custom renderer function to use during the render process. The function has two arguments `element` and `template`. Where `element` is the element reference and `template` is the result of the `Template` function with the current data.
- **observedAttributes [DEPRECATED]**: use `Component.observedAttributes` instead
- **...customElementOptions**: All the other are options defined by the custom element spec (<a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#Parameters" target="_blank">MDN link</a>).

</article>

<hr />
