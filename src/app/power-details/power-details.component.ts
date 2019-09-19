import { Component, OnInit, Input } from '@angular/core';
import { Power } from '../power';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PowerService} from '../power.service'
import {HeroService} from '../hero.service'
import {Hero} from '../hero'

@Component({
  selector: 'app-power-details',
  templateUrl: './power-details.component.html',
  styleUrls: ['./power-details.component.css']
})
export class PowerDetailsComponent implements OnInit {
  @Input() power:Power
  assignedHeroIds:any[]=[]
  heroes:Hero[]=[]
  assignedHeroes:Hero[]=[]

  getHeroes():void{
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }


  getPower(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.powerService.getPower(id)
      .subscribe(power => {
        this.power = power[0];
        console.log('Power Fetched');
        this.getHeroes()
        this.getAssignedHeroes()
      })
  }


  getAssignedHeroes():void{
    this.powerService.assignedHeroes(this.power.id)
    .subscribe(heroId => {
      this.assignedHeroIds=heroId;
      console.log("Assigned Hero Ids ",this.assignedHeroIds);
      this.assignedHeroIds.forEach(hero => {
        let hId=hero.heroId;
        console.log("Hero id",hId); 
        this.heroes.forEach(hero => {
          if(hero.id===hId){
            this.assignedHeroes.push(hero)
          }
        });
      });
      console.log("Assigned Heroes ",this.assignedHeroes)
    })
  }
  fetchAssignedHeroes():void{
    
  }


  save(): void {
    this.powerService.updatePower(this.power)
      .subscribe(() => this.goBack());
  }

  constructor(
    private powerService:PowerService,
    private heroService:HeroService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
    this.getPower();
  }
  goBack(): void {
    this.location.back();
  }
}
