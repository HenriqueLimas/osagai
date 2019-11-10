import updateDom from "../core/updateDom.js";
import root, { SHADOW_DOM } from "../core/root.js";

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
              let _root = root(element);
              let _content;

              if (element[SHADOW_DOM]) {
                const templateElement = document.createElement("template");
                templateElement.innerHTML = template;
                _content = templateElement.content;
              } else {
                _root = _root.childNodes[0];
                _content = template;
              }

              updateDom(_root, _content);
            }
          }

          resolve(nextState);
        });
      });
    }
  );
}

export default update;
