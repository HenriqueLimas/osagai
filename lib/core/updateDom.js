import { render } from "lit-html";

export default function updateDom(fromNode, template) {
  return render(template, fromNode);
}
