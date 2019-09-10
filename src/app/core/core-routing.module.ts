import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader} from '@gilsdav/ngx-translate-router';
import { Location } from '@angular/common';
export function createTranslateLoader(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, ['en', 'es'], 'ROUTES.');
}

const routes: Routes = [
  {
    path: '',
    redirectTo: '/portal',
    pathMatch: 'full'
  },
  {
    path: 'portal',
    loadChildren: () => import('../portal/portal.module').then( mod => mod.PortalModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then( mod => mod.AdminModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (createTranslateLoader),
        deps: [TranslateService, Location, LocalizeRouterSettings/*, HttpClient*/]
      }
    })
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class CoreRoutingModule { }
