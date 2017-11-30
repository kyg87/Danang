import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board } from '../model/board';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  board  = new Board();

  constructor(
    private boardService: BoardService,
    private route : ActivatedRoute,
    private location : Location,
    private router : Router) {

    this.board.type = 'free';
    this.board.date = new Date();

    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);
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

    this.router.navigateByUrl('/board/'+data._id);
  }

  goBack(){
    this.location.back();
  }
}
