import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board } from '../model/board';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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

    editBoard(){

      this.boardService.updateBoard(this.board).subscribe(
        data=>{
          this.onCompleteAddBoard(data);
        }
      )
    }

    onCompleteAddBoard(data){
      console.log(data);
  
      this.router.navigateByUrl('/board/'+this.board._id);
    }

}
