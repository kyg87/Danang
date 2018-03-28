import { Component, OnInit, Input } from '@angular/core';
import { HumorService } from '../services/humor.service'

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { parse } from 'url';
import { Parser } from '@angular/compiler/src/ml_parser/parser';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
@Component({
  selector: 'app-instarboard',
  templateUrl: './instarboard.component.html',
  styleUrls: ['./instarboard.component.css']
})
export class InstarboardComponent implements OnInit {

  id : any;
  selectMenu: any;
  data : any;

  page : number;
  totalPage : number;

  startPageNo : number;
  endPageNo : number;

  pages : number[] = [];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  //https://github.com/lukasz-galka/ngx-gallery
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

    this.humorService.getInstars(page,12).subscribe(data=>{
      this.totalPage = data.page;
      
      this.onComplete(data);
      console.log(this.data);
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
    this.galleryOptions = [
      { "imageDescription": true,"previewCloseOnClick": true, "previewCloseOnEsc": true  },
      { "breakpoint": 500, "width": "100%"}

      ]
    //   this.galleryImages = [
    //     {
    //         small: 'https://scontent-icn1-1.cdninstagram.com/vp/084bafdbbd9f2591e39372759fe0a460/5B4FF46E/t51.2885-15/sh0.08/e35/p640x640/29094334_354967638332123_4529684247954325504_n.jpg',
    //         medium: 'https://scontent-icn1-1.cdninstagram.com/vp/084bafdbbd9f2591e39372759fe0a460/5B4FF46E/t51.2885-15/sh0.08/e35/p640x640/29094334_354967638332123_4529684247954325504_n.jpg',
    //         big: 'https://scontent-icn1-1.cdninstagram.com/vp/084bafdbbd9f2591e39372759fe0a460/5B4FF46E/t51.2885-15/sh0.08/e35/p640x640/29094334_354967638332123_4529684247954325504_n.jpg'
    //     },
    //     {
    //         small: 'https://scontent-icn1-1.cdninstagram.com/vp/63c82a316f7c4b77ba424a73b6713fcc/5B521961/t51.2885-15/s640x640/sh0.08/e35/29094367_949385745221181_3291562248736079872_n.jpg',
    //         medium: 'https://scontent-icn1-1.cdninstagram.com/vp/63c82a316f7c4b77ba424a73b6713fcc/5B521961/t51.2885-15/s640x640/sh0.08/e35/29094367_949385745221181_3291562248736079872_n.jpg',
    //         big: 'https://scontent-icn1-1.cdninstagram.com/vp/63c82a316f7c4b77ba424a73b6713fcc/5B521961/t51.2885-15/s640x640/sh0.08/e35/29094367_949385745221181_3291562248736079872_n.jpg'
    //     }
    // ];

    
  }
  onComplete(data){
    
    console.log('data',this.data);
    for(var i = 0 ; i < data.value.length;i++){
      if(data.value[i].mp4 == ''){
        var galleryImages =[];
        for(var k = 0; k < data.value[i].imgs.length;k++){
          var temp = {
            small: data.value[i].imgs[k].src,
            medium: data.value[i].imgs[k].src,
            big: data.value[i].imgs[k].src,
          }
          galleryImages.push(temp);

        }
        data.value[i].galleryImages = galleryImages;
      }
      
    }
    this.data = data;
    console.log(this.data)
  }

  getCurrentPageGroup(){

    let pageGroupCount = 10;
    let currentPageGroup;

    if(this.page % pageGroupCount!=0){
      currentPageGroup = (this.page/pageGroupCount) + 1;
    }else{
      currentPageGroup = this.page/pageGroupCount;
    }


    return parseInt( currentPageGroup);
  }

  getStartPageNo(){

    let startPageNo = 10 * (this.getCurrentPageGroup()-1) + 1

    return startPageNo;

  }

  getEndPageNo(){
    let endPageNo = 10 * this.getCurrentPageGroup();

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
