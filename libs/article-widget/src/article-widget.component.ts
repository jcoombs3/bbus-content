import { Component, OnInit, Inject } from "@angular/core";
import { ItemModel } from "@backbase/foundation-ang/core";
import {
  PORTAL_CONTENT,
  PortalContent
} from "@backbase/foundation-ang/web-sdk";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "bbus-article-widget",
  templateUrl: './article-widget.component.html'
})
export class ArticleWidgetComponent implements OnInit {
  public $content = this.model
    .property("content-articleContent", "")
    .pipe(
      switchMap((contentRef: string) => this.contentService.get(contentRef))
    );

  constructor(
    private readonly model: ItemModel,
    @Inject(PORTAL_CONTENT) private readonly contentService: PortalContent
  ) {}

  ngOnInit(): void {}
}
