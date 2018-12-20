import updateDom from "../core/updateDom.js";

function update(element, stateChanger = () => {}) {
  return Promise.resolve(stateChanger(element.__currentState__)).then(
    nextState => {
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          element.__currentState__ = nextState;

          if (element._shouldUpdate) {
            updateDom(
              element.childNodes[0],
              element._templateWithClearing(currentState)
            );
          }

          resolve(nextState);
        });
      });
    }
  );
}

export default update;
