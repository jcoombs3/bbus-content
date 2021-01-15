import { Component, OnInit, Inject } from '@angular/core';
import { ItemModel } from '@backbase/foundation-ang/core';
import {
  PORTAL_CONTENT,
  PortalContent,
  StructuredContentItem,
  ImageContentItem
} from '@backbase/foundation-ang/web-sdk';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'bbus-article-widget',
  templateUrl: './article-widget.component.html'
})
export class ArticleWidgetComponent implements OnInit {
  public $content: Observable<StructuredContentItem> = this.model
    .property('content-articleContent', '')
    .pipe(
      switchMap((contentRef: string) => this.contentService.get(contentRef)),
      map(
        (contentItem: StructuredContentItem | ImageContentItem) =>
          <StructuredContentItem>contentItem
      ),
			map((structuredContentItem: StructuredContentItem) => structuredContentItem.content)
    );

  constructor(
    private readonly model: ItemModel,
    @Inject(PORTAL_CONTENT) private readonly contentService: PortalContent
  ) {}

  ngOnInit(): void {}
}
