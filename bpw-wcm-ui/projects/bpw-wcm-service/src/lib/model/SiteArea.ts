import { HasName } from "./HasName";
import { KeyValues } from "./KeyValues";
import { SearchData } from "./SearchData";
import { SiteAreaLayout } from "./SiteAreaLayout";
import { NavigationBadge } from "./NavigationBadge";

export interface SiteArea extends HasName {
  repository: string;
  workspace: string;
  nodePath?: string;
  name: string;

  // title?: string;
  // description?: string;
  // url?: string;
  // sorderOrder?: number;
  // friendlyURL?: string;
  // showOnMenu?: boolean;
  // siteConfig?: string;
  // contentPath?: string;
  // allowedFileExtension?: string;
  // allowedArtifactTypes?: string;

  // contentAreaLayout?: string;
  // cacheTTL?: number;
  // securePage?: boolean;
  // navigationId?: string;
  // navigationType?: string;
  // function?: string;
  // translate?: string;
  // icon?: string;
  // classes?:string;
  // exactMatch?: boolean;
  // externalUrl?: boolean;
  // openInNewTab?: boolean;

  elements?: { [key: string]: string };
  properties?: { [key: string]: string };
  metadata?: KeyValues;
  searchData?: SearchData;
  siteAreaLayout?: SiteAreaLayout;
  badge?: NavigationBadge;
}
