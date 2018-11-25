// Using morphdom for applying the diff
import morphdom from "morphdom";

export default function updateDom(fromNode, toNode) {
  return morphdom(fromNode, toNode);
}
