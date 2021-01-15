/**
 *	Portal Content Services
 *
 * @author  John Coombs (BB-ATL FE)
 * @version 1.0.0
 * @since   01-12-2019
 */

import { Injectable, Inject } from "@angular/core";
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
    @Inject(PORTAL_CONTENT) private readonly contentService: PortalContent
  ) {}

  getContentByContentRef(id: string) {
    return new Observable(observer => {
      this.contentService.get(id).then((content: any) => {
        observer.next(content);
        observer.complete();
      });
    });
  }
}
