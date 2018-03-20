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

import { FileUploadModule  } from 'ng2-file-upload';
import { EditComponent } from './edit/edit.component';
import { BodygallComponent } from './bodygall/bodygall.component';
import { BodyComponent } from './body/body.component';

import { AdsenseModule } from 'ng2-adsense';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FreeboardComponent,
    MainComponent,
    WriteComponent,
    BoardComponent,
    HumorComponent,
    HumorboardComponent,
    EditComponent,
    BodygallComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,FormsModule,
    AppRoutingModule,
    FileUploadModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-2651262364281330',
      adSlot: 4461430600,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
