import { HasName } from "./HasName";
export interface QueryStatement extends HasName {
  repository?: string;
  workspace?: string;
  library?: string;

  title?: string;
  query?: string;
}
