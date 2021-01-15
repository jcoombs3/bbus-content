import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  createServiceDataHttpConfig,
  DATA_HTTP_CONFIG,
  DataHttpModule,
  ServiceDataHttpConfig
} from '@backbase/foundation-ang/data-http';
import {
  PORTAL_CONTENT_DATA_CONFIG,
  PortalContentDataService
} from './portal-content-data.service';
export const CONFIG_VALUE = new InjectionToken('ServiceDataHttpConfig');
@NgModule({
  declarations: [],
  imports: [CommonModule, DataHttpModule, HttpClientModule],
  providers: [
    PortalContentDataService,
    {
      provide: CONFIG_VALUE,
      useValue: {
        servicePath: ''
      }
    },
    {
      provide: PORTAL_CONTENT_DATA_CONFIG,
      useFactory: createServiceDataHttpConfig,
      deps: [DATA_HTTP_CONFIG, CONFIG_VALUE]
    }
  ]
})
export class PortalContentDataModule {
  static forRoot(config: Partial<ServiceDataHttpConfig>): ModuleWithProviders<any> {
    return {
      ngModule: PortalContentDataModule,
      providers: [
        {
          provide: CONFIG_VALUE,
          useValue: config
        }
      ]
    };
  }
}
