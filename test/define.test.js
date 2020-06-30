import define from "../lib/define.js";
import chai from './chai.mjs';
import '../node_modules/@ungap/custom-elements-builtin/esm/index.js';

const
	assert = chai.assert;

describe("define", function () {
	afterEach(function() {
		document.querySelectorAll('c-component').forEach(element => element.remove());
	});
	
	it("returns an object with the name and the component class definition", () => {
		function Component() {}
		
		const definedResult = define("a-component", Component);
		
		assert.hasAllKeys(definedResult, ['name', 'component']);
		assert.propertyVal(definedResult, 'name', "a-component");
		assert.isFunction(definedResult.component);
	});
	
	it("defines the customElement in the CE registry", () => {
		function Component() {}
		
		define("b-component", Component);
		
		return customElements.whenDefined('b-component');
	});
	
	it.skip("does not define the customElement when already exists", () => {});
	
	it("sets the innerHTML property with the returned value of the template on connectedCallback", () => {
		function Component() {
			return () => "<div>Template</div>";
		}
		
		define("c-component", Component);
		
		const element = document.createElement('c-component');
		document.body.appendChild(element);
		
		assert.strictEqual(element.innerHTML, "<div>Template</div>");
	});
	
	it("extends builtin elements", () => {
		function Component(){
			return () => "<li>Item</li>";
		}
		
		define("expanding-list", Component, { BaseElement: HTMLUListElement, extends: 'ul' });
		
		document.body.insertAdjacentHTML('beforeend', '<ul is="expanding-list"></ul>');
		
		const element = document.querySelector('ul[is=expanding-list]');
		
		assert.isNotNull(element);
		assert.instanceOf(element, HTMLUListElement);
		assert.strictEqual(element.innerHTML, "<li>Item</li>");
	});
});
