import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component'
import { FreeboardComponent } from './freeboard/freeboard.component'
import { WriteComponent } from './write/write.component';
import { BoardComponent } from './board/board.component';
const routes : Routes = [
  { path: '', redirectTo: '/main',pathMatch: 'full'},
  { path: 'main', component : MainComponent},
  { path: 'freeboard', component : FreeboardComponent},
  { path: 'write', component : WriteComponent},
  { path: 'board/:id', component : BoardComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
