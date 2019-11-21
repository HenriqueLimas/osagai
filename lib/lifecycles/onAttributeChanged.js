export default function onAttributeChanged(element, callback) {
  element.__handleAttributeChangedCallback__.add(callback);
  return () => element.__handleAttributeChangedCallback__.delete(callback);
}
