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
	
	it("does not set the innerHTML property when there is not template function", () => {
		const testCaseValues = [undefined, null, 42, "string", true, {}];
		
		testCaseValues.forEach((testCaseValue, idx) => {
			function Component() {
				return testCaseValue;
			}
			
			const { component: Template } = define(`x-ce${idx}`, Component);
			
			const element = new Template();
			element.connectedCallback();
			
			assert.isEmpty(element.innerHTML, `for the returned value of ${testCaseValue}`);
		});
	});
	
	it("extends builtin elements", () =>
		new Promise((resolve, reject) => {
			function Component(){
				return () => "<li>Item</li>";
			}
			
			define("expanding-list", Component, { BaseElement: HTMLUListElement, extends: 'ul' });
			
			document.body.insertAdjacentHTML('beforeend', '<ul is="expanding-list"></ul>');
			
			const element = document.querySelector('ul[is=expanding-list]');
			
			assert.isNotNull(element);
			assert.instanceOf(element, HTMLUListElement);
			
			setTimeout(resolve, 10, element); // rendering is asynchronous with the polyfill
		})
		.then(element => {
			assert.strictEqual(element.innerHTML, "<li>Item</li>");
		})
	);
	
	it("creates a class constructor the CE is an instance of which", () => {
		let elementArgument;
		function Component({element}) {
			elementArgument = element;
		}
		
		const { component: Template } = define('d-ce', Component);
		
		document.body.insertAdjacentHTML('beforeend', "<d-ce></d-ce>");
		const domElement = document.querySelector('d-ce');
		
		assert.strictEqual(domElement, elementArgument, "Element parameter in the factory fn should be equal to the DOM element");
		assert.instanceOf(domElement, Template);
	});
	
	it("provides query and queryAll for querying the inserted HTML", () =>
		new Promise(resolve => {
			let queryArg, queryAllArg;
			
			function Component({ queryAll, query }) {
				queryArg = query;
				queryAllArg = queryAll;
				
				return () => "<div>foo</div><i>bar</i>";
			}
			
			define("e-ce", Component);
			
			const element = document.createElement('e-ce');
			document.body.appendChild(element);
			
			resolve(Promise.all([queryArg('div'), queryAllArg('i')]));
		})
		.then(([aDiv, allIs]) => {
			assert.strictEqual(aDiv.innerHTML, "foo");
			
			assert.instanceOf(allIs, NodeList);
			assert.lengthOf(allIs, 1);
			assert.strictEqual(allIs[0].innerHTML, "bar");
		})
	);
});
