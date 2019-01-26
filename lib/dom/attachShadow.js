function attachShadow(element, shadowRootInit = { mode: "open" }) {
  element[SHADOW_DOM] = element.attachShadow(shadowRootInit);
  return element[SHADOW_DOM];
}

export const SHADOW_DOM = "__shadowDom__";

export default attachShadow;
