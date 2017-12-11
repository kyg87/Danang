import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board } from '../model/board';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board = new  Board();

  constructor(
    private boardService : BoardService,
    private route : ActivatedRoute,
    private location : Location,
    private router : Router
  ) {


    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }
   
    this.router.events.subscribe((evt) => {

      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);

    });
   }

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

  deleteBoard(){
    const id = this.route.snapshot.paramMap.get('id');
    this.boardService.deleteBoard(id).subscribe(data=>{
      console.log(data);
      this.location.back();
    })
  }

  goBack(){
    this.location.back();
  }
}
