export const SHADOW_DOM = "__shadowDom__";

function root(element) {
  return element[SHADOW_DOM] || element;
}

export default root;
