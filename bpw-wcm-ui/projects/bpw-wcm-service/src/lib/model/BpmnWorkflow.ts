import { ResourceNode } from "./ResourceNode";
import { HasName } from "./HasName";
export interface BpmnWorkflow extends ResourceNode, HasName {
  repository?: string;
  workspace?: string;
  library?: string;

  bpmn?: string;
}
