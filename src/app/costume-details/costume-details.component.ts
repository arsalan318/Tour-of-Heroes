import { Component, OnInit } from '@angular/core';
import {Costume} from '../costume'; 
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {CostumeService} from '../costume.service';
import { Hero } from '../hero';


@Component({
  selector: 'app-costume-details',
  templateUrl: './costume-details.component.html',
  styleUrls: ['./costume-details.component.css']
})
export class CostumeDetailsComponent implements OnInit {
  costume:Costume;
  assignedHeroes:Hero[]
  getCostume(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.costumeService.getCostume(id)
      .subscribe(costume =>{ 
        this.costume = costume[0]
        this.getAssignedHeroes();
      })
  }

  getAssignedHeroes(){
    this.costumeService.assignedHeroes(this.costume.costumeId)
    .subscribe(heroes=>{
      this.assignedHeroes=heroes
    })
  }

  save(): void {
    this.costumeService.updateCostume(this.costume)
      .subscribe(() => this.goBack());
  }
  constructor(
    private route: ActivatedRoute,
    private costumeService: CostumeService,
    private location: Location,
  ) { }
  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getCostume();
  }

}
