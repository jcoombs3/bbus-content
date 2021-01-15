/**
 * Portal Content Services
 *
 * @author  John Coombs (BB-US Hub FE)
 * @version 1.0.0
 * @since   01-15-2021
 */

import { Injectable, Inject } from "@angular/core";
import { PortalContentDataService } from "@bbus/portal-content-data";
import {
  PAGE_CONFIG,
  PageConfig,
  PORTAL_CONTENT,
  PortalContent
} from "@backbase/foundation-ang/web-sdk";
import { Observable } from "rxjs";
import { map, switchMap, pluck } from "rxjs/operators";
import { find } from "lodash";

@Injectable()
export class PortalContentService {
  constructor(
    @Inject(PAGE_CONFIG) private readonly pageConfig: PageConfig,
    @Inject(PORTAL_CONTENT) private readonly contentService: PortalContent,
    private data: PortalContentDataService
  ) {}

  getContentByQuery(contentRef: string) {
		const id: string[] = contentRef.split(':');
		const repoName: string = id[1] === "contentRepository" ? "contentRepository" : this.pageConfig.portalName;
		console.log('++ id', id);
		console.log('++ repoName', repoName);
    const body: any = {
      ids: [id[2]],
      loadContentForTypes: ["bb:structuredcontent"],
			repositories: [repoName],
      inlineRelationshipsContent: true // to return fully resolved content data, not content references.
    };
    return this.data.postPortalContentQueryRecord(body).pipe(
      pluck("body"),
      map((result: Array<any>) => {
        const parentContent = find(result, item => {
          return item.id === id;
        });
        if (parentContent && parentContent.content)
          return JSON.parse(parentContent.content);
        else return undefined;
      })
    );
  }
}
