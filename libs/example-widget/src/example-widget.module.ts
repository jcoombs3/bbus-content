import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { ExampleWidgetComponent } from './example-widget.component';

@NgModule({
  declarations: [ExampleWidgetComponent],
  imports: [
    CommonModule,
    BackbaseCoreModule.withConfig({
      classMap: { ExampleWidgetComponent }
    })
  ]
})
export class ExampleWidgetModule { }