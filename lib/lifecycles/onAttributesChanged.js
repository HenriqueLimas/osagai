export default function onAttributesChanged(element, callback) {
  element.__handleAttributeChangedCallback__ = callback;
}
