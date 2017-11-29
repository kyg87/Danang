import { Component, OnInit } from '@angular/core';
import { HumorService } from '../services/humor.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-humor',
  templateUrl: './humor.component.html',
  styleUrls: ['./humor.component.css']
})
export class HumorComponent implements OnInit {

  data : any;
  constructor(
    private humorService : HumorService,
    private route : ActivatedRoute,
    private location : Location,
    private router : Router
  ) { 

    const id = this.route.snapshot.paramMap.get('id');

    this.humorService.getHumor(id).subscribe(data=>{

      console.log(data);

      this.data = data;
    })
  }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

}
