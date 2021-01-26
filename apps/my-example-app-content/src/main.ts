import { StaticProvider, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerSingleApp } from '@backbase/foundation-ang/core';

import { AppModule } from './app/app.module';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const start = registerSingleApp((extraProviders: Array<StaticProvider>) =>
  platformBrowserDynamic(extraProviders).bootstrapModule(AppModule)
);

if (environment.bootstrap) {
  const { services, pageModel } = environment.bootstrap;

  if (environment.fetchModel) {
    environment
      .fetchModel()
      .then((res: Response) => {
        if (res.status !== 200) {
          console.log(
            'Unexpected error: Unable to retrieve Experience Model. Status Code: ' +
              res.status
          );
          return;
        }

        res.json().then(function(data: any) {
          window.BB.startSingleApp(services).then((app: any) =>
            app.bootstrap(data.children[0])
          );
        });
      })
      .catch(function(err: any) {
        console.log('Fetch Error: Unable to retrieve Experience Model', err);
      });
  } else {
    start(services).then(app => {
      app.bootstrap(pageModel, { parentName: '', index: 0 });
    });
  }
}
