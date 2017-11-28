import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board } from '../model/board';
@Component({
  selector: 'app-freeboard',
  templateUrl: './freeboard.component.html',
  styleUrls: ['./freeboard.component.css']
})
export class FreeboardComponent implements OnInit {

  boards : Board[];
  
  constructor(
    private boardService : BoardService ) { 
    this.boardService.getBoards()
    .subscribe(
      boards =>{
        console.log(boards);
        this.boards = boards;
      }
    )
  }

  showBoard(event){
    console.log(event);
  }
  ngOnInit() {
  }

}
