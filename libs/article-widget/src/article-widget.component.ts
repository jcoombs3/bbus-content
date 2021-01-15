import { Component, Inject } from '@angular/core';
import { ItemModel } from '@backbase/foundation-ang/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { PortalContentService } from '@bbus/portal-content';

@Component({
  selector: 'bbus-article-widget',
  templateUrl: './article-widget.component.html',
  providers: [PortalContentService]
})
export class ArticleWidgetComponent {
  public $content = this.model
    .property('content-articleContent', '')
    .pipe(
      switchMap((contentRef: string) =>
        this.contentService.getContentByQuery(contentRef)
      ),
      map((content: any) =>
        this.contentService.updateImageUrls(content, ['picture'])
      )
    );

  constructor(
    private readonly model: ItemModel,
    private readonly contentService: PortalContentService
  ) {}
}
