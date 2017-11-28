import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FreeboardComponent } from './freeboard/freeboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FreeboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
