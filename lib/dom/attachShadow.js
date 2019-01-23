function attachShadow(element, shadowRootInit = { mode: "open" }) {
  element[SHADOW_DOM] = element.attachShadow(shadowRootInit);
}

export const SHADOW_DOM = "__shadowDom__";

export default attachShadow;
