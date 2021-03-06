import { Action } from "@ngrx/store";
import { CurrentSite } from "../../model/CurrentSite";
import { RenderTemplate } from "../../model/RenderTemplate";
import { AuthoringTemplate } from "../../model/AuthoringTemplate";
import { SiteArea } from "../../model/SiteArea";
export enum WcmSystemActionTypes {
  GET_WCMSYSTEM = "[WcmSystem] Get WcmSystem",
  GET_WCMSYSTEM_SUCCESS = "[WcmSystem] Get WcmSystem Success",
  GET_WCMSYSTEM_FAILED = "[WcmSystem] Get WcmSystem Failed",
  UPDATE_SITE_AREA_LAYOUT = "[WcmSystem] Update Sitearea Layout",
  WCMSYSTEM_CLEAR_ERROR = "[WcmSystem] Clear Error",
  CREATE_RENDER_TEMPLATE = "[WcmSystem - RenderTemplate] Create",
  UPDATE_RENDER_TEMPLATE = "[WcmSystem - RenderTemplate] Update",
  CREATE_RENDER_TEMPLATE_SUCCESS = "[WcmSystem- RenderTemplate] Create Success",
  CREATE_RENDER_TEMPLATE_FAILED = "[WcmSystem- RenderTemplate] Create Failed",
  RENDER_TEMPLATE_CLEAR_ERROR = "[WcmSystem- RenderTemplate] Clear Error",
  CREATE_AUTHORING_TEMPLATE = "[WcmSystem - AuthoringTemplate] Create",
  UPDATE_AUTHORING_TEMPLATE = "[WcmSystem - AuthoringTemplate] Update",
  CREATE_AUTHORING_TEMPLATE_FAILED = "[WcmSystem - AuthoringTemplate] Create Failed",
  AUTHORING_TEMPLATE_CLEAR_ERROR = "[WcmSystem - AuthoringTemplate] Clear Error"
}

export class GetWcmSystem implements Action {
  readonly type = WcmSystemActionTypes.GET_WCMSYSTEM;
  constructor(public payload: CurrentSite) {}
}

export class GetWcmSystemSuccess implements Action {
  readonly type = WcmSystemActionTypes.GET_WCMSYSTEM_SUCCESS;
  constructor(public payload: any) {}
}

export class GetWcmSystemFailed implements Action {
  readonly type = WcmSystemActionTypes.GET_WCMSYSTEM_FAILED;
  constructor(public payload: string) {}
}

export class UpdateSiteareaLayout implements Action {
  readonly type = WcmSystemActionTypes.UPDATE_SITE_AREA_LAYOUT;
  constructor(public payload: SiteArea) {}
}

export class WcmSystemClearError implements Action {
  readonly type = WcmSystemActionTypes.WCMSYSTEM_CLEAR_ERROR;
  constructor() {}
}

export class CreateRenderTemplate implements Action {
  readonly type = WcmSystemActionTypes.CREATE_RENDER_TEMPLATE;
  constructor(public payload: RenderTemplate) {}
}

export class UpdateRenderTemplate implements Action {
  readonly type = WcmSystemActionTypes.UPDATE_RENDER_TEMPLATE;
  constructor(public payload: RenderTemplate) {}
}

export class CreateRenderTemplateSuccess implements Action {
  readonly type = WcmSystemActionTypes.CREATE_RENDER_TEMPLATE_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateRenderTemplateFailed implements Action {
  readonly type = WcmSystemActionTypes.CREATE_RENDER_TEMPLATE_FAILED;
  constructor(public payload: string) {}
}

export class RenderTemplateClearError implements Action {
  readonly type = WcmSystemActionTypes.RENDER_TEMPLATE_CLEAR_ERROR;
  constructor() {}
}

export class CreateAuthoringTemplate implements Action {
  readonly type = WcmSystemActionTypes.CREATE_AUTHORING_TEMPLATE;
  constructor(public payload: AuthoringTemplate) {}
}

export class UpdateAuthoringTemplate implements Action {
  readonly type = WcmSystemActionTypes.UPDATE_AUTHORING_TEMPLATE;
  constructor(public payload: AuthoringTemplate) {}
}
// export class CreateAuthoringTemplateSuccess implements Action {
//   readonly type = WcmSystemActionTypes.CREATE_AUTHORING_TEMPLATE_SUCCESS;
//   constructor(public payload: any) {
//   }
// }

export class CreateAuthoringTemplateFailed implements Action {
  readonly type = WcmSystemActionTypes.CREATE_AUTHORING_TEMPLATE_FAILED;
  constructor(public payload: string) {}
}

export class AuthoringTemplateClearError implements Action {
  readonly type = WcmSystemActionTypes.AUTHORING_TEMPLATE_CLEAR_ERROR;
  constructor() {}
}

export type WcmSystemActions =
  | GetWcmSystem
  | GetWcmSystemSuccess
  | GetWcmSystemFailed
  | UpdateSiteareaLayout
  | WcmSystemClearError
  | CreateRenderTemplate
  | UpdateRenderTemplate
  | CreateRenderTemplateSuccess
  | CreateRenderTemplateFailed
  | RenderTemplateClearError
  | CreateAuthoringTemplate
  | UpdateAuthoringTemplate
  // CreateAuthoringTemplateSuccess |
  | CreateAuthoringTemplateFailed
  | AuthoringTemplateClearError;
