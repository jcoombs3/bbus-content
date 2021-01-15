import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { BannersWidgetComponent } from './banners-widget.component';

@NgModule({
  declarations: [BannersWidgetComponent],
  imports: [
    CommonModule,
    BackbaseCoreModule.withConfig({
      classMap: { BannersWidgetComponent }
    })
  ]
})
export class BannersWidgetModule { }