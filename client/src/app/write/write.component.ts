import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board } from '../model/board';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  board  = new Board();

  filePath : any;
  public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/upload'});

  constructor(
    private boardService: BoardService,
    private route : ActivatedRoute,
    private location : Location,
    private router : Router) {

    this.board.type = 'free';
    this.board.date = new Date();

    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);

    this.uploader.onSuccessItem = ((item: any, response: any, status: any, headers: any) =>{
      var responePath = JSON.parse(response);
      console.log(response, responePath);
      this.filePath = responePath.filePath;
    })
  }

  ngOnInit() {
  }

  addBoard(){
    


    var file = this.uploader.getNotUploadedItems();

    console.log(file);

    
    if(this.filePath != undefined){
      this.board.filePath = "http://localhost:3000/users/"+ this.filePath;
    }
    

    console.log(this.board);
    
    // this.boardService.addBoard(this.board).subscribe(board=>{

    //   this.onCompleteAddBoard(board);
    // })



  }
  onCompleteAddBoard(data){
    console.log(data);

    this.router.navigateByUrl('/board/'+data._id);
  }

  goBack(){
    this.location.back();
  }
}
