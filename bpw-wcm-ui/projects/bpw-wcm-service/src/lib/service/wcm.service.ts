import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import {
  RestClient,
  Client,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Path,
  Timeout,
  Produces,
  Query,
  MediaType,
  ApiConfigService
} from "bpw-rest-client";

import { JsonForm } from "../model/JsonForm";
import { Theme } from "../model/Theme";
import { ControlField } from "../model/ControlField";
import { AuthoringTemplate } from "../model/AuthoringTemplate";
import { RenderTemplate } from "../model/RenderTemplate";
import { ContentAreaLayout } from "../model/ContentAreaLayout";
import { SiteArea } from "../model/SiteArea";
import { ContentItem } from "../model/ContentItem";
import { WcmSystem } from "../model/WcmSystem";
import { PageConfig } from "../model/PageConfig";
import { SiteConfig } from "../model/SiteConfig";
import { WcmNode } from "../model/WcmNode";
import { WcmItemFilter } from "../model/WcmItemFilter";
import { Library } from "../model/Library";
import { Category } from "../model/category";
import { ValidationRule } from "../model/ValidationRule";
import { QueryStatement } from "../model/QueryStatement";
import { BpmnWorkflow } from "../model/BpmnWorkflow";

@Injectable({
  providedIn: "root"
})
@Client({
  serviceId: "modeshape-service",
  baseUrl: "/wcm/api",
  headers: {
    "content-type": "application/json"
  }
})
export class WcmService extends RestClient {
  constructor(apiConfigService: ApiConfigService, httpClient: HttpClient) {
    super(httpClient, apiConfigService);
  }

  @Get("/theme/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getTheme(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string
  ): Observable<Theme[]> {
    return null;
  }

  @Get("/control/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getControlField(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string
  ): Observable<ControlField[]> {
    return null;
  }

  @Post("/library")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public createLibrary(@Body library: Library): Observable<any> {
    return null;
  }

  @Post("/category")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public createCategory(@Body category: Category): Observable<any> {
    return null;
  }

  // @Delete("/library/{repository}/{workspace}/{library}")
  // @Timeout(2000) //In milliseconds
  // @Produces(MediaType.JSON)
  // public deleteLibrary(
  //   @Path("repository") repository: string,
  //   @Path("workspace") workspace: string,
  //   @Path("library") library: string
  // ): Observable<any> {
  //   return null;
  // }

  @Post("/at")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public createAuthoringTemplate(@Body at: AuthoringTemplate): Observable<any> {
    return null;
  }

  @Put("/at")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public saveAuthoringTemplate(@Body at: AuthoringTemplate): Observable<any> {
    return null;
  }

  @Get("/queryStatement/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getQueryStatement(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") nodePath: string
  ): Observable<QueryStatement> {
    return null;
  }

  @Post("/queryStatement")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public createQueryStatement(
    @Body queryStatement: QueryStatement
  ): Observable<any> {
    return null;
  }

  @Put("/queryStatement")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public saveQueryStatement(
    @Body queryStatement: QueryStatement
  ): Observable<any> {
    return null;
  }
  @Get("/bpmnWorkflow/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getBpmnWorkflow(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") nodePath: string
  ): Observable<BpmnWorkflow> {
    return null;
  }

  @Post("/bpmnWorkflow")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public createBpmnWorkflow(@Body bpmnWorkflow: BpmnWorkflow): Observable<any> {
    return null;
  }

  @Put("/bpmnWorkflow")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public saveBpmnWorkflow(@Body bpmnWorkflow: BpmnWorkflow): Observable<any> {
    return null;
  }

  @Get("/validationRule/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getValidationRule(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") nodePath: string
  ): Observable<ValidationRule> {
    return null;
  }

  @Post("/validationRule")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public createValidationRule(
    @Body validationRule: ValidationRule
  ): Observable<any> {
    return null;
  }

  @Put("/validationRule")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public saveValidationRule(
    @Body validationRule: ValidationRule
  ): Observable<any> {
    return null;
  }

  @Get("/at/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getAuthoringTemplates(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string
  ): Observable<AuthoringTemplate[]> {
    return null;
  }

  @Get("/authoringTemplate/get/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getAuthoringTemplate(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") nodePath: string
  ): Observable<AuthoringTemplate> {
    return null;
  }

  @Put("/authoringTemplate/lock/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public lockAuthoringTemplate(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") absPath: string
  ): Observable<AuthoringTemplate> {
    return null;
  }

  @Get("/wcmSystem/{repository}/{workspace}/{library}/{siteConfig}")
  // @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getWcmSystem(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Path("library") library: string,
    @Path("siteConfig") siteConfig: string
  ): Observable<WcmSystem> {
    return null;
  }

  @Get("/pageConfig/{repository}/{workspace}/{library}/{siteConfig}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getPageConfig(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Path("library") library: string,
    @Path("siteConfig") siteConfig: string
  ): Observable<PageConfig> {
    return null;
  }

  @Get("/jsonform/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getJsonForms(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string
  ): Observable<{ [key: string]: JsonForm }> {
    return null;
  }

  @Post("/rt")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public createRenderTemplate(@Body rt: RenderTemplate): Observable<any> {
    return null;
  }

  @Put("/rt")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public saveRenderTemplate(@Body rt: RenderTemplate): Observable<any> {
    return null;
  }

  @Post("/siteConfig")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public createSiteConfig(@Body siteConfig: SiteConfig): Observable<any> {
    return null;
  }

  @Put("/siteConfig")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public saveSiteConfig(@Body siteConfig: SiteConfig): Observable<any> {
    return null;
  }

  @Get("/siteConfig/get/{repository}/{workspace}/{library}/{siteConfig}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getSiteConfig(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Path("siteConfig") siteConfig: string
  ): Observable<SiteConfig> {
    return null;
  }

  @Put("/siteConfig/lock/{repository}/{workspace}/{library}/{siteConfig}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public lockSiteConfig(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Path("siteConfig") siteConfig: string
  ): Observable<SiteConfig> {
    return null;
  }

  @Get("/rt/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getRenderTemplates(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string
  ): Observable<{ [key: string]: RenderTemplate }> {
    return null;
  }

  @Get("/renderTemplate/get/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getRenderTemplate(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") renderTemplatePath: string
  ): Observable<RenderTemplate> {
    return null;
  }

  @Put("/renderTemplate/lock/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public lockRenderTemplate(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") renderTemplatePath: string
  ): Observable<RenderTemplate> {
    return null;
  }

  @Post("/contentAreaLayout")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public createContentAreaLayout(
    @Body contentAreaLayout: ContentAreaLayout
  ): Observable<any> {
    return null;
  }

  @Put("/contentAreaLayout")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public saveContentAreaLayout(
    @Body contentAreaLayout: ContentAreaLayout
  ): Observable<any> {
    return null;
  }

  @Get("/contentAreaLayout/list/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getContentAreaLayouts(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string
  ): Observable<{ [key: string]: ContentAreaLayout }> {
    return null;
  }

  @Get("/contentAreaLayout/get/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getContentAreaLayout(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") renderTemplatePath: string
  ): Observable<ContentAreaLayout> {
    return null;
  }

  @Put("/contentAreaLayout/lock/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public lockContentAreaLayout(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") renderTemplatePath: string
  ): Observable<{ [key: string]: ContentAreaLayout }> {
    return null;
  }

  @Post("/sitearea")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public createSiteArea(@Body sa: SiteArea): Observable<any> {
    return null;
  }

  @Put("/sitearea")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public saveSiteArea(@Body sa: SiteArea): Observable<any> {
    return null;
  }

  @Get("/siteArea/get/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getSiteArea(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") contentItemPath: string
  ): Observable<SiteArea> {
    return null;
  }

  @Put("/siteArea/lock/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public lockSiteArea(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") contentItemPath: string
  ): Observable<SiteArea> {
    return null;
  }

  @Post("/contentItem/create-publish")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public createAndPublishContentItem(
    @Body contentItem: ContentItem
  ): Observable<any> {
    return null;
  }

  @Put("/contentItem/update-published")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public updateContentItem(@Body contentItem: ContentItem): Observable<any> {
    return null;
  }

  @Get("/contentItem/get/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public getContentItem(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") contentItemPath: string
    //@Path('contentItemPath') ontentItemPath: string
  ): Observable<ContentItem> {
    return null;
  }

  @Put("/contentItem/lock/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public lockContentItem(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") contentItemPath: string
    //@Path('contentItemPath') ontentItemPath: string
  ): Observable<ContentItem> {
    return null;
  }

  // @Delete('/ContentItem/remove/{repository}/{workspace}')
  // @Timeout(2000) //In milliseconds
  // @Produces(MediaType.JSON)
  // public remmoveContentItem(
  //   @Path('repository') repository: string,
  //   @Path('workspace') workspace: string,
  //   @Query("path") absPath: string): Observable<any> { return null; };

  @Put("/WcmItem/unlock/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public unlock(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") absPath: string
  ): Observable<null> {
    return null;
  }

  @Put("/WcmItem/restore/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public restore(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") absPath: string,
    @Query("version") version: string
  ): Observable<null> {
    return null;
  }

  @Delete("/WcmItem/purge/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public purgeWcmItem(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Query("path") absPath: string
  ): Observable<any> {
    return null;
  }

  @Put("/ContentItem/workflow/{repository}/{workspace}/{state}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  public updateWcmItemWorkflowStage(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Path("state") state: string,
    @Query("path") absPath: string
  ): Observable<any> {
    return null;
  }

  @Post("/wcmNodes/{repository}/{workspace}")
  @Timeout(2000) //In milliseconds
  @Produces(MediaType.JSON)
  getWcmNodes(
    @Path("repository") repository: string,
    @Path("workspace") workspace: string,
    @Body filter: WcmItemFilter
  ): Observable<WcmNode[]> {
    return null;
  }
}
