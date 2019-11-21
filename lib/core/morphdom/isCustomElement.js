/**
 * Check if the element is a custom element or not
 *
 * @param {Element} element the element that will be checked
 *
 * @returns {boolean}
 */
export default function isCustomElement(element) {
  // By definition custom elements must have "-" in the tag name
  return /-/.test(element.tagName);
}
