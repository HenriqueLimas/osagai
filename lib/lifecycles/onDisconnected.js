export default function onDisconnected(element, callback) {
  element.__handleDisconnectedCallback__.push(callback);
}
