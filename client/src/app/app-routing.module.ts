import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component'
import { FreeboardComponent } from './freeboard/freeboard.component'
import { WriteComponent } from './write/write.component';
import { BoardComponent } from './board/board.component';
import { EditComponent } from './edit/edit.component';
import { HumorComponent } from './humor/humor.component';
import { HumorboardComponent } from './humorboard/humorboard.component';
import { BodygallComponent } from './bodygall/bodygall.component';
import { BodyComponent } from './body/body.component';
import { InstarboardComponent } from './instarboard/instarboard.component';
const routes : Routes = [
  { path: '', redirectTo: '/main',pathMatch: 'full'},
  { path: 'main', component : MainComponent},
  { path: 'freeboard/:page', component : FreeboardComponent},
  { path: 'write', component : WriteComponent},
  { path: 'board/:id', component : BoardComponent},
  { path: 'humorboard/:page', component : HumorboardComponent},
  { path: 'humor/:page/:id', component : HumorComponent},
  { path: 'edit/:id', component : EditComponent},
  { path: 'bodygall/:page', component : BodygallComponent},
  { path: 'body/:id', component : BodyComponent},
  { path: 'instargall/:page', component : InstarboardComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
