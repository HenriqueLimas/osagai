import { SHADOW_DOM } from "../core/root";

function attachShadow(element, shadowRootInit = { mode: "open" }) {
  element[SHADOW_DOM] = element.attachShadow(shadowRootInit);
  return element[SHADOW_DOM];
}

export default attachShadow;
