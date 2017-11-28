import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board } from '../model/board';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  board  = new Board();

  constructor(
    private boardService: BoardService) {

    this.board.type = 'free';
    this.board.date = new Date();
  }

  ngOnInit() {
  }

  addBoard(){
    console.log(this.board);
    this.boardService.addBoard(this.board).subscribe(board=>{

      this.onCompleteAddBoard(board);
    })
  }
  onCompleteAddBoard(data){
    console.log(data);
  }

}
