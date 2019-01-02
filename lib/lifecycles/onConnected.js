export default function onConnected(element, callback) {
  element.__handleConnectedCallback__.push(callback);
}
