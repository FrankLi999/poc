import { Action } from "@ngrx/store";
import { ContentAreaLayout } from "../../model/ContentAreaLayout";
export enum ContentAreaLayoutActionTypes {
  CREATE_CONTENT_AREA_LAYOUT = "[ContentAreaLayout] Create",
  CREATE_NEW_CONTENT_AREA_LAYOUT = "[ContentAreaLayout] New",
  UPDATE_CONTENT_AREA_LAYOUT = "[ContentAreaLayout] Update",
  CREATE_CONTENT_AREA_LAYOUT_SUCCESS = "[ContentAreaLayout] Create Success",
  CREATE_CONTENT_AREA_LAYOUT_FAILED = "[ContentAreaLayout] Create Failed",
  CONTENT_AREA_LAYOUT_CLEAR_ERROR = "[ContentAreaLayout] Clear Error",
  REMOVE_CONTENT_AREA_LAYOUT = "[ContentAreaLayout] Remove"
}

export class CreateContentAreaLayout implements Action {
  readonly type = ContentAreaLayoutActionTypes.CREATE_CONTENT_AREA_LAYOUT;
  constructor(public payload: ContentAreaLayout) {}
}

export class UpdateContentAreaLayout implements Action {
  readonly type = ContentAreaLayoutActionTypes.UPDATE_CONTENT_AREA_LAYOUT;
  constructor(public payload: ContentAreaLayout) {}
}

export class CreateNewContentAreaLayout implements Action {
  readonly type = ContentAreaLayoutActionTypes.CREATE_NEW_CONTENT_AREA_LAYOUT;
  constructor(
    public repository: string,
    public workspace: string,
    public library: string
  ) {}
}
export class CreateContentAreaLayoutSuccess implements Action {
  readonly type =
    ContentAreaLayoutActionTypes.CREATE_CONTENT_AREA_LAYOUT_SUCCESS;
  constructor(public payload: ContentAreaLayout) {}
}

export class CreateContentAreaLayoutFailed implements Action {
  readonly type =
    ContentAreaLayoutActionTypes.CREATE_CONTENT_AREA_LAYOUT_FAILED;
  constructor(public payload: string) {}
}

export class RemoveContentAreaLayout implements Action {
  readonly type = ContentAreaLayoutActionTypes.REMOVE_CONTENT_AREA_LAYOUT;
  constructor(public payload: ContentAreaLayout) {}
}

export class ContentAreaLayoutClearError implements Action {
  readonly type = ContentAreaLayoutActionTypes.CONTENT_AREA_LAYOUT_CLEAR_ERROR;
  constructor() {}
}

export type ContentAreaLayoutActions =
  | CreateContentAreaLayout
  | UpdateContentAreaLayout
  | CreateNewContentAreaLayout
  | RemoveContentAreaLayout
  | CreateContentAreaLayoutSuccess
  | CreateContentAreaLayoutFailed
  | ContentAreaLayoutClearError;
