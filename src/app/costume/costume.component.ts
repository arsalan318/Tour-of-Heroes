import { Component, OnInit } from '@angular/core';
import {Costume} from '../costume';
import {CostumeService} from '../costume.service';

@Component({
  selector: 'app-costume',
  templateUrl: './costume.component.html',
  styleUrls: ['./costume.component.css']
})
export class CostumeComponent implements OnInit {

  costumes:Costume[]

  getCostumes(): void {
    this.costumeService.getCostumes()
      .subscribe(costumes =>{ 
        this.costumes = costumes;
      });    
  }
  add(name: string):void{
    name = name.trim();
    if (!name) { return; }
    this.costumeService.addCostume({ name } as Costume)
      .subscribe(hero => {
        this.costumes.push(hero);
        this.getCostumes();
      });
  }

  delete(costume: Costume): void {
    this.costumes = this.costumes.filter(h => h !== costume);
    this.costumeService.deleteCostume(costume).subscribe();
  }

  constructor(
    private costumeService:CostumeService
  ) { }

  ngOnInit() {
    this.getCostumes();
  }

}
