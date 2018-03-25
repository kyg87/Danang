import { Component, OnInit, Input } from '@angular/core';
import { HumorService } from '../services/humor.service'

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { parse } from 'url';
import { Parser } from '@angular/compiler/src/ml_parser/parser';

@Component({
  inputs: ['page','id'],
  selector: 'app-humorboard',
  templateUrl: './humorboard.component.html',
  styleUrls: ['./humorboard.component.css']
})
export class HumorboardComponent implements OnInit {

  id : any;
  selectMenu: any;
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
    
  }
  ngOnInit() {
    var page = this.route.snapshot.paramMap.get('page');

    if(page != null) {
      this.page = parseInt(page);
    }

    this.humorService.getHumors(page,10).subscribe(data=>{
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
   
    this.router.events.subscribe((evt) => {

      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);

    });
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

  onSelect(menu){
    this.selectMenu = menu;
    console.log(this.selectMenu);
  }

}
