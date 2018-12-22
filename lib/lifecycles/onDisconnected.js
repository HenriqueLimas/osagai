export default function onDisconnected(element, callback) {
  element.__handleDisconnectedCallback__ = callback;
}
