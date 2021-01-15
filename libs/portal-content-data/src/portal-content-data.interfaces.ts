export interface Additions {
  [key: string]: any;
}
export interface Customizable {
  additions?: Additions;
}
export interface PortalContentQueryRequest extends Customizable {
  ids: string[];
	loadContentForTypes: string[];
  repositories?: string[];
}
