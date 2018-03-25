import { Component, OnInit } from '@angular/core';
import { HumorService } from '../services/humor.service';
import { BoardService } from '../services/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Reply } from '../model/board';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-humor',
  templateUrl: './humor.component.html',
  styleUrls: ['./humor.component.css']
})
export class HumorComponent implements OnInit {

  reply = new Reply();
  replys : any;
  data : any;
 
  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private boardService : BoardService,
    private humorService : HumorService,
    private route : ActivatedRoute,
    private location : Location,
    private router : Router
  ) { 
    const id = this.route.snapshot.paramMap.get('id');
    const page = this.route.snapshot.paramMap.get('page');
   
    this.reply.type = 0;
    this.reply.id = id;
    this.reply.name ='';
    this.reply.password = '';
    this.reply.content = '';
    this.humorService.getHumor(id).subscribe(data=>{
      console.log(data);

      this.data = data;
    })

    this.onRelyList(id);
  }

  ngOnInit() {

  }

  goBack(){
    this.location.back();
  }

  onAdd(){
    if(this.validate()){
      this.reply.regData = new Date();
      this.spinnerService.show();
      this.boardService.addReply(this.reply).subscribe(board => {


        this.onCompleteaddReply(board);
      })
    }

  }

  onCompleteaddReply(data){
    console.log(data);

    this.onRelyList(data.id);
    this.spinnerService.hide();

    this.reply.name ='';
    this.reply.password = '';
    this.reply.content = '';
    //this.router.navigateByUrl('/board/'+data._id);
  }

  onRelyList(id){
    console.log(id);
    this.boardService.getReplys(id).subscribe(replys => {
      this.onCompleteRelyList(replys);
    })
  }

  onCompleteRelyList(replys){
    console.log('replys',replys);

    this.replys = replys.value;
  }

  validate(){
    if(this.reply.name == '' ) {
      alert('이름을 입력해주세요');
      return false;
    }
    if(this.reply.password == '' ) {
      alert('비밀번호를 입력해주세요');
      return false;
    }

    if(this.reply.content == '' ) {
      alert('내용을 입력해주세요');
      return false;
    }


    return true;
  }
  

}
