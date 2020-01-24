
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModuleNgFactory } from '../../../compiled/src/redux-test/src/app/app.module.ngfactory';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);