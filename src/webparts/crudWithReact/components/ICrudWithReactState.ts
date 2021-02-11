
import { ISiteInspectionItem } from "./ISiteInspectionItem";

export interface ICrudWithReactState {
    status: string;
    SiteInspectionListItems: ISiteInspectionItem[];
    SiteInspectionListItem: ISiteInspectionItem;
  }