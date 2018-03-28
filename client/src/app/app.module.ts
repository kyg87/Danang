import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
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
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { InstarboardComponent } from './instarboard/instarboard.component';
import { InstarComponent } from './instar/instar.component'
import { NgxGalleryModule } from 'ngx-gallery';
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
    BodyComponent,
    InstarboardComponent,
    InstarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FileUploadModule,
    NgxGalleryModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-2651262364281330',
      adSlot: 4461430600,
    }),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
