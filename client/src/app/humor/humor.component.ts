import { Component, OnInit } from '@angular/core';
import { HumorService } from '../services/humor.service';
import { BoardService } from '../services/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Reply } from '../model/board';

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
    private boardService : BoardService,
    private humorService : HumorService,
    private route : ActivatedRoute,
    private location : Location,
    private router : Router
  ) { 
    this.reply.regData = new Date();
    this.reply.type = 0;

    const id = this.route.snapshot.paramMap.get('id');
    const page = this.route.snapshot.paramMap.get('page');
    console.log('page',page);
    this.humorService.getHumor(id).subscribe(data=>{

      console.log(data);

      this.data = data;
    })

    this.onRelyList();
  }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

  onAdd(){
    this.boardService.addReply(this.reply).subscribe(board => {

      this.onCompleteaddReply(board);
    })
  }

  onCompleteaddReply(data){
    console.log(data);

    //this.router.navigateByUrl('/board/'+data._id);
  }

  onRelyList(){
    this.boardService.getReplys().subscribe(replys => {
      this.onCompleteRelyList(replys);
    })
  }

  onCompleteRelyList(replys){
    console.log('replys',replys);

    this.replys = replys.value;
  }
  

}
