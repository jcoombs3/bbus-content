/**
 * --Note--
 * The below code is custom retrieval of content service.
 * While it is possible to retrieve content and manipulate,
 * BB already provides the ability to retrieve structured content
 */
import { Component } from '@angular/core';
import { ItemModel } from '@backbase/foundation-ang/core';
import { map, switchMap } from 'rxjs/operators';
import { PortalContentService } from '@bbus/portal-content';

@Component({
  selector: 'bbus-article-widget-custom',
  templateUrl: './article-widget-custom.component.html',
	providers: [PortalContentService]
})
export class ArticleWidgetCustomComponent {
  public article$ = this.model
    .property('content-articleContent', '')
    .pipe(
      switchMap((contentRef: string) =>
        this.portalContentService.getContentByQuery(contentRef)
      ),
      map((content: any) =>
        this.portalContentService.updateImageUrls(content, ['picture'])
      )
    );

  constructor(
    private readonly model: ItemModel,
    private readonly portalContentService: PortalContentService
  ) {}
}
