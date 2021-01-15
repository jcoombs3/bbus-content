import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { ArticleWidgetComponent } from './article-widget.component';

@NgModule({
  declarations: [ArticleWidgetComponent],
  imports: [
    CommonModule,
    BackbaseCoreModule.withConfig({
      classMap: { ArticleWidgetComponent }
    })
  ]
})
export class ArticleWidgetModule { }