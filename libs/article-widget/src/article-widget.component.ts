import { Component } from '@angular/core';
import { ContentService } from '@backbase/universal-ang/content';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bbus-article-widget',
  templateUrl: './article-widget.component.html',
  providers: [ContentService]
})
export class ArticleWidgetComponent {
  public article$ = this.contentService
    .getContent('content-articleContent')
    .pipe(map((item: any) => item || {}));

  constructor(private readonly contentService: ContentService) {}
}
