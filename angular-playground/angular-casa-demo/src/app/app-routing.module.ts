import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {MainNavigationComponent} from './core/main-navigation/main-navigation.component';

const router: Routes = [
  {path: '', redirectTo: '404', pathMatch: 'full'},
  {path: 'user/:id', component: MainNavigationComponent, children: [
    {path: 'vertrag', loadChildren: './pages/vertrag/vertrag.module#VertragModule'},
    {path: 'uebersicht', loadChildren: './pages/uebersicht/uebersicht.module#UebersichtModule'},
    {path: 'person', loadChildren: './pages/person/person.module#PersonModule'},
    {path: 'leistung', loadChildren: './pages/leistung/leistung.module#LeistungModule'},
    {path: 'swisspass', loadChildren: './pages/swisspass/swisspass.module#SwissPassModule'},
    {path: 'onlinekonto', loadChildren: './pages/onlinekonto/onlinekonto.module#OnlineKontoModule'},
    {path: 'kommunikation', loadChildren: './pages/kommunikation/kommunikation.module#KommunikationModule'},
    {path: 'rechnung', loadChildren: './pages/rechnung/rechnung.module#RechnungModule'},
    {path: 'marketing', loadChildren: './pages/marketing/marketing.module#MarketingModule'},
    {path: 'notiz', loadChildren: './pages/notiz/notiz.module#NotizModule'}
    ]
  },
  {path: '404', loadChildren: './pages/notfound/notfound.module#NotfoundModule'},
  {path: '**', redirectTo: '404'}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
