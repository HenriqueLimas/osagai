import define from "../../lib/define";
import { onAttributeChanged } from "../../lib/lifecycles/index.js";

describe("onAttributeChange", function() {
	beforeEach(() => {
		const
			Component = () => () => `<span>dummy text content</span>`;
		
		Component.observedAttributes = ['foo'];
		define("attribute-test-element", Component);
		
		const
			element = document.createElement("attribute-test-element");
		element.setAttribute("foo", "init");
      document.body.appendChild(element);
	});
	
	afterEach(() => {
		document.querySelector('attribute-test-element').remove();
	});
	
	it("should call the callback with the assigned attribute value", (done) => {
		const
			element = document.querySelector('attribute-test-element');
      
      onAttributeChanged(element, ({name, current, old}) => {
      	if (name !== "foo") {
      		done.fail(new Error(`"${name}" != "foo" wrong attribute name`));
	      }
      	else if (current !== "bar") {
      		done.fail(new Error(`"${current}" != "bar" wrong current value`));
	      }
      	else if (old !== "init") {
      		done.fail(new Error(`"${old}" != "init" wrong previous value`));
	      }
      	else {
		      done();
	      }
      });
      
      element.setAttribute("foo", "bar");
	});
	
	it("should not call the callback after it is unsubscribed", (done) => {
		const
			element = document.querySelector('attribute-test-element');
		
		const
			unsubscribe =
				onAttributeChanged(element, ({current}) => {
					if (current !== "first") {
						done.fail(
							new Error(`"${current}" !== "first", unexpected attribute value`)
						);
					}
					else {
						unsubscribe();
						element.setAttribute("foo", "second");
						setTimeout(done, 20);
					}
				});
		
		element.setAttribute("foo", "first");
		
		if (typeof unsubscribe !== "function") {
			done.fail(new Error(`${typeof unsubscribe} != "function", return value is not an unsubscriber`));
		}
	});
});