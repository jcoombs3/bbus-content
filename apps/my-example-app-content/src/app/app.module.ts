import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ExampleWidgetModule } from '@bbus/example-widget';

// Containers
import { ContainersModule } from '@backbase/universal-ang/containers';
import { LayoutContainerModule } from '@backbase/universal-ang/layouts';

// WA3 Image, Plain Text, Rich Text
import { ContentWidgetModule } from '@backbase/universal-ang/content';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    BackbaseCoreModule.forRoot({
			features: {
				THEME_V2: true
			}
		}),
    RouterModule.forRoot([], { initialNavigation: false, useHash: true }),
    ExampleWidgetModule,
		ContainersModule,
		LayoutContainerModule,
		ContentWidgetModule
  ],
  providers: [...environment.mockProviders || []],
  bootstrap: [AppComponent]
})
export class AppModule { }
