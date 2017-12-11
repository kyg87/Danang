import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board } from '../model/board';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-freeboard',
  templateUrl: './freeboard.component.html',
  styleUrls: ['./freeboard.component.css']
})
export class FreeboardComponent implements OnInit {

  data: any;

  page: number;
  totalPage: number;

  startPageNo: number;
  endPageNo: number;

  pages: number[] = [];
  
  constructor(
    private boardService : BoardService ,
    private route : ActivatedRoute,
    private location : Location,
    private router : Router) { 
    const page = this.route.snapshot.paramMap.get('page');

    this.page = parseInt(page);
    this.boardService.getBoards(page,10).subscribe(data=>{
      console.log(data);
      this.totalPage = data.page;
      this.data = data;

      this.startPageNo = this.getStartPageNo();
      this.endPageNo = this.getEndPageNo();
      for(var i = this.startPageNo; i <= this.endPageNo;i++){
        this.pages.push(i);
      }
    })
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
  }
}


  ngOnInit() {
  }

  showBoard(event){
    console.log(event);
  }

  getCurrentPageGroup(){
    
        let pageGroupCount = 5;
        let currentPageGroup;
    
        if(this.page % pageGroupCount!=0){
          currentPageGroup = (this.page/pageGroupCount) + 1;
        }else{
          currentPageGroup = this.page/pageGroupCount;
        }
    
    
        return parseInt( currentPageGroup);
      }
    
      getStartPageNo(){
    
        let startPageNo = 5 * (this.getCurrentPageGroup()-1) + 1
    
        return startPageNo;
    
      }
    
      getEndPageNo(){
        let endPageNo = 5 * this.getCurrentPageGroup();
    
        if(endPageNo > this.totalPage){
          endPageNo = this.totalPage;
        }
    
        return endPageNo;
      }
    
      changeRoute(page){
        this.router.navigateByUrl('/freeboard/'+page);
    
      }
}



