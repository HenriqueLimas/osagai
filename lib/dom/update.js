import updateDom from "../core/updateDom.js";
import { SHADOW_DOM } from "./attachShadow";

function update(element, stateChanger = () => {}) {
  return Promise.resolve(stateChanger(element.__currentState__)).then(
    nextState => {
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          element.__currentState__ = nextState;

          if (element._shouldUpdate) {
            const template = element._templateWithClearing(nextState);

            if (element.__hasCustomRenderer__) {
              element.__renderer__(element, template);
            } else {
              const root = element[SHADOW_DOM] || element;
              updateDom(root.childNodes[0], template);
            }
          }

          resolve(nextState);
        });
      });
    }
  );
}

export default update;
