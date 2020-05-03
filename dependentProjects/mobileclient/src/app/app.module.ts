import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatBadgeModule } from '@angular/material/badge'; 
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatToolbarModule } from '@angular/material/toolbar';

import { StorageServiceModule } from 'ngx-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './page/home/home.component';
import { NowplayingComponent } from './component/home/nowplaying/nowplaying.component';
import { UpnextComponent } from './component/home/upnext/upnext.component';
import { AddComponent } from './component/home/add/add.component';
import { ManualAddComponent } from './dialog/home/manual-add/manual-add.component';
import { SearchComponent } from './page/search/search.component';
import { PlayerQrComponent } from './dialog/home/player-qr/player-qr.component';
import { PlayerdetailsComponent } from './component/home/playerdetails/playerdetails.component';
import { FeaturedMenuComponent } from './page/featured-menu/featured-menu.component';
import { ListItemComponent } from './component/util/list-item/list-item.component';
import { QueueComponent } from './page/queue/queue.component';
import { HistoryComponent } from './page/history/history.component';
import { AuthcheckComponent } from './helper/authcheck/authcheck.component';
import { ConnectPlayerComponent } from './page/connect-player/connect-player.component';
import { AddOptionsComponent } from './dialog/search/add-options/add-options.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NowplayingComponent,
    UpnextComponent,
    AddComponent,
    ManualAddComponent,
    SearchComponent,
    PlayerQrComponent,
    PlayerdetailsComponent,
    FeaturedMenuComponent,
    ListItemComponent,
    QueueComponent,
    HistoryComponent,
    AuthcheckComponent,
    ConnectPlayerComponent,
    AddOptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    StorageServiceModule,
  ],
  entryComponents: [
    AddOptionsComponent,
    ManualAddComponent,
    PlayerQrComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
