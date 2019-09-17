import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import {PowerService} from "../power.service";
import {Power} from '../power'
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  powers:Power[]
  selectedPowers:Power[]=[]

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero =>{ 
        this.hero = hero
        console.log(hero)
      })
  }
  onSelectPower(power):void{
    this.selectedPowers.push(power);
    this.powers=this.powers.filter(p=>{
      return p.id!==power.id
    })
  }
  getPowers(): void {
    this.powerService.getPowers()
      .subscribe(powers =>{ 
        this.powers = powers;
      });    
  }


  save(): void {
    this.heroService.updateHero(this.hero[0])
      .subscribe(() => this.goBack());
  }

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private powerService:PowerService
  ) { }

  async ngOnInit(){
    await this.getHero();
    await this.getPowers();
  }

  goBack(): void {
    this.location.back();
  }

}