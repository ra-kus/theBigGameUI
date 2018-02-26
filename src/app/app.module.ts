import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './rpsls/login/login.component';
import { GameComponent } from './rpsls/game/game.component';

import { WebsocketService } from './services/websocket.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
