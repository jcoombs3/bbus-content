/**
 * Portal Content Services
 *
 * @author  John Coombs (BB-US Hub FE)
 * @version 1.0.0
 * @since   01-15-2021
 */

import { Injectable, Inject } from '@angular/core';
import { PortalContentDataService } from '@bbus/portal-content-data';
import {
  PAGE_CONFIG,
  PageConfig,
  StructuredContentItem,
  ImageContentItem
} from '@backbase/foundation-ang/web-sdk';
import { Observable } from 'rxjs';
import { map, switchMap, pluck } from 'rxjs/operators';
import { find } from 'lodash';

@Injectable()
export class PortalContentService {
  constructor(
    @Inject(PAGE_CONFIG) private readonly pageConfig: PageConfig,
    private data: PortalContentDataService
  ) {}

  /**
   * @description
   * Manual process to retrieve custom structured content, without the Universal Content widget
   * @param contentRef - the unique content identifier in order to find this content
   * @returns a structured content item
   */
  getContentByQuery(contentRef: string) {
    const idArr: string[] = contentRef.split(':');
    const id = idArr[2];
		const repoName = idArr[1].replace('@', '');
    const body: any = {
      ids: [id],
      loadContentForTypes: ['bb:structuredcontent'],
      repositories: [repoName],
      inlineRelationshipsContent: true // to return fully resolved content data, not content references.
    };
    return this.data.postPortalContentQueryRecord(body).pipe(
      // retrieve the response body
      pluck('body'),
      // body can be an array of structured content or images
      map((result: Array<StructuredContentItem | ImageContentItem>) => {
        // find the structured content that matches our id
        const contentItem:
          | StructuredContentItem
          | ImageContentItem
          | undefined = find(result, item => {
          return item.id === id;
        });
        if (contentItem) {
          return <StructuredContentItem>contentItem;
        }
        throw new Error('content missing');
      }),
      // structured content is wrapped in a 'content' key; parse it and return
      map((structuredContentItem: StructuredContentItem) => {
        if (structuredContentItem && structuredContentItem.content) {
          return JSON.parse(structuredContentItem.content);
        } else return undefined;
      })
    );
  }

  /**
   * @description
   * Portal Content services does not append the apiRoot.
   * This function will loop through all applicable image keys and append the apiRoot
   * @param content - the approved structured content
   * @param imgKeys - a list key properties that are trusted image types
   * @returns an updated structured content object
   */
  updateImageUrls(content: any, imgKeys: string[]) {
    for (let i = 0; i < imgKeys.length; i++) {
      const links = content[imgKeys[i]].links;
      for (const prop in links) {
        if (Object.prototype.hasOwnProperty.call(links, prop)) {
          links[prop].href = this.getContentRefUrl(links[prop].href);
        }
      }
    }
    return content;
  }

  /**
   * @description
   * Appends the apiRoot to the content service url, so images are retrieved correctly
   * @param href - the url without the apiRoot
   * @returns an image url
   */
  private getContentRefUrl(href: string) {
    return `${this.pageConfig.apiRoot}${href}`;
  }
}
