import { Component, OnInit } from '@angular/core';
import { HumorService  } from '../services/humor.service';
import { BoardService } from '../services/board.service';
import { Main } from '../model/board';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit {

  humors : any;
  boards : any;


  main : Main[] = [];

 
  constructor(
    private humorService : HumorService,
    private boardService : BoardService
  ) { 
    this.humorService.getInstars(1,6).subscribe(data=>{

      this.onCompleteGetHumors(data)
    })

    // this.boardService.getBoards(1,6).subscribe(data={

    // })
    
  }

  onCompleteGetHumors(data){
    this.humors = data.value;
    console.log(this.humors);
    console.log(this.humors.length);


    for(var i = 0; i < 3;i++){

      var mainview = new Main();
      mainview.title = this.humors[i].title;
      mainview.img = this.humors[i].imgs[0].src;
      this.main.push(mainview);
    }
    console.log(this.main);
  }

  ngOnInit() {
  }

}
