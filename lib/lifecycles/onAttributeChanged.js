export default function onAttributeChanged(element, callback) {
  element.__handleAttributeChangedCallback__ = callback;
}
