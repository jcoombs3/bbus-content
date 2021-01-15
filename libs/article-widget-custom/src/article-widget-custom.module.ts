import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { ArticleWidgetCustomComponent } from './article-widget-custom.component';

@NgModule({
  declarations: [ArticleWidgetCustomComponent],
  imports: [
    CommonModule,
    BackbaseCoreModule.withConfig({
      classMap: { ArticleWidgetCustomComponent }
    })
  ]
})
export class ArticleWidgetCustomModule { }