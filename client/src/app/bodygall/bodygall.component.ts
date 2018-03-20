import { Component, OnInit } from '@angular/core';
import { HumorService } from '../services/humor.service'

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bodygall',
  templateUrl: './bodygall.component.html',
  styleUrls: ['./bodygall.component.css']
})
export class BodygallComponent implements OnInit {

  data : any;

  page : number;
  totalPage : number;

  startPageNo : number;
  endPageNo : number;

  pages : number[] = [];
  constructor(
    private humorService : HumorService,
    private route : ActivatedRoute,
    private location : Location,
    private router : Router
  ) { 
    const page = this.route.snapshot.paramMap.get('page');

    this.page = parseInt(page);

    this.humorService.getBodyGalls(page,10).subscribe(data=>{

      console.log(data);
      this.totalPage = data.page;
      this.data = data;

      console.log(this.getCurrentPageGroup());
      console.log(this.getStartPageNo());
      console.log(this.getEndPageNo());

      this.startPageNo = this.getStartPageNo();
      this.endPageNo = this.getEndPageNo();
      for(var i = this.startPageNo; i <= this.endPageNo;i++){
        this.pages.push(i);
      }


  
    })

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
    this.router.navigateByUrl('/humorboard/'+page);

  }

}

