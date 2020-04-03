import { ResourceNode } from "./ResourceNode";
import { HasName } from "./HasName";
export interface ValidationRule extends HasName {
  repository?: string;
  workspace?: string;
  library?: string;

  title?: string;
  description?: string;
  type?: string;
  rule?: string;
}
