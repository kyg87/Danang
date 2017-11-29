import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board } from '../model/board';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board = new  Board();

  constructor(
    private route : ActivatedRoute,
    private boardService : BoardService,
    private location : Location
  ) { }

  ngOnInit() {
    this.getBoard();
  }

  getBoard(){
    const id = this.route.snapshot.paramMap.get('id');
    this.boardService.getBoard(id).subscribe(data=>{
      console.log(data);
      this.board = data;
    })
  }

  goBack(){
    this.location.back();
  }
}
