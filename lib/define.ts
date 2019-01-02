import query from "./core/query";
import queryAll from "./core/queryAll";

type Name = string;
type Attributes = string;

type Query = (q: string) => Promise<HTMLElement>;
type QueryAll = (q: string) => Promise<HTMLElement[]>;

type ObservedAttributes = Attributes[];

type TemplateResult = string | void;
type Template = (data?: any) => TemplateResult;
type Component = (
  { element: HTMLElement, query: Query, queryAll: QueryAll }
) => Template;
type Renderer = (element: HTMLElement, template: TemplateResult) => void;
type Options = {
  BaseElement?: typeof HTMLElement;
  observedAttributes?: ObservedAttributes;
  renderer?: Renderer;
};

const define = (
  name: Name,
  Component: Component,
  {
    BaseElement = HTMLElement,
    observedAttributes,
    renderer,
    ...customElementOptions
  }: Options = {} as Options
) => {
  class CustomElement extends BaseElement {
    static get observedAttributes() {
      return observedAttributes;
    }

    private _initialized: boolean;
    private _template: Template;

    /* TODO: rename with __ convention */
    public _shouldUpdate: boolean;
    public __handleAttributeChangedCallback__: (
      { name, current, old }: { name: string; current: string; old: string }
    ) => void;
    public __handleConnectedCallback__: () => void;
    public __handleDisconnectedCallback__: () => void;
    public __currentState__: any;
    public __hasCustomRenderer__: boolean;
    public __renderer__: Renderer;

    constructor() {
      super();

      this._initialized = false;
      this.__handleAttributeChangedCallback__ = function() {};
      this.__handleConnectedCallback__ = function() {};
      this.__handleDisconnectedCallback__ = function() {};
      this.__currentState__ = undefined;
      this.__hasCustomRenderer__ = !!renderer;
      this.__renderer__ =
        renderer ||
        function renderer(element, template) {
          if (typeof template === "string") {
            element.innerHTML = template;
          }
        };

      this._template = Component({
        element: this,
        query: query(this),
        queryAll: queryAll(this)
      });

      this._shouldUpdate =
        this._template && typeof this._template === "function";
    }

    connectedCallback() {
      this.__handleConnectedCallback__.call(this);

      if (this._shouldUpdate && !this._initialized) {
        this._initialized = true;
        this.__renderer__(
          this,
          this._templateWithClearing(this.__currentState__)
        );
      }
    }

    disconnectedCallback() {
      this.__handleDisconnectedCallback__.call(this);
    }

    _templateWithClearing(state) {
      const template = this._template(state);

      return typeof template === "string" ? template.trim() : template;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (!this.isConnected) {
        return;
      }

      this.__handleAttributeChangedCallback__.call(this, {
        name,
        current: newValue,
        old: oldValue
      });
    }
  }

  customElements.define(name, CustomElement, customElementOptions);

  return {
    name,
    component: CustomElement
  };
};

export default define;
