import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { SearchComponent } from './page/search/search.component';
import { FeaturedMenuComponent } from './page/featured-menu/featured-menu.component';
import { QueueComponent } from './page/queue/queue.component';
import { HistoryComponent } from './page/history/history.component';
import { AuthcheckComponent } from './helper/authcheck/authcheck.component';
import { ConnectPlayerComponent } from './page/connect-player/connect-player.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: AuthcheckComponent},
  { path: 'connect', component: ConnectPlayerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'featured', component: FeaturedMenuComponent },
  { path: 'queue', component: QueueComponent},
  { path: 'history', component: HistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
