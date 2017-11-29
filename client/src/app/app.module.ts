import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FreeboardComponent } from './freeboard/freeboard.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './/app-routing.module';
import { WriteComponent } from './write/write.component';
import { BoardComponent } from './board/board.component';
import { HumorComponent } from './humor/humor.component';
import { HumorboardComponent } from './humorboard/humorboard.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FreeboardComponent,
    MainComponent,
    WriteComponent,
    BoardComponent,
    HumorComponent,
    HumorboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
