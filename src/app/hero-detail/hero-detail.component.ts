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
  heroPowers:Power[]=[]

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero =>{ 
        this.hero = hero[0]
        //console.log(hero)
        this.fetchHeroPowers();

      })
  }
  onSelectPower(power):void{
    let index=this.heroPowers.findIndex((obj)=>{
      return obj.id===power.id
    })
    console.log(index)
    if(index===-1){
      this.selectedPowers.push(power);
      this.powers=this.powers.filter(p=>{
        return p.id!==power.id
      })
    }
    else{
      alert("This Power is Already Added To The Hero")
    }
  
  }
  onDeletePower(power):void{
    this.selectedPowers=this.selectedPowers.filter(p=>{
      return p.id!==power.id
    });
    this.powers.push(power) 
  }
  onPowerAdd(powerId,heroId):void{
    const heroPower={
      powerId,
      heroId
    }
    this.selectedPowers=this.selectedPowers.filter(p=>{
      return p.id!==powerId
    })
    
    this.heroService.addHeroPower(heroPower)
    .subscribe(result=>{
      console.log(result);
      this.fetchHeroPowers();
    })
    ;
  }
  getPowers(): void {
    this.powerService.getPowers()
      .subscribe(powers =>{ 
        this.powers = powers;
      });    
  }
  
  
  fetchHeroPowers():void{
    console.log("In Fetch Hero Power")
    console.log("Selected Powers",this.selectedPowers);
    console.log("Hero's Powers",this.heroPowers);

    let powerIdsArray:any=[]
    this.heroService.getHeroPowers(this.hero.id)
    .subscribe(ids=>{
      console.log(ids);
      
      powerIdsArray=ids;
      powerIdsArray.forEach(powerId => {
        let pId=powerId.powerId;
        console.log("power id",pId); 
        this.powers.forEach(power => {
          if(power.id==pId){
            this.heroPowers.push(power);
          }
        });
      });

    })
  }
  onDeleteHeroPower(powerId):void{
    this.heroService.deleteHeroPowers(this.hero.id,powerId)
      .subscribe(result =>{ 
        console.log(result);
        this.heroPowers=[]
        this.fetchHeroPowers();
      });
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private powerService:PowerService
  ) { }

  ngOnInit(){
      this.getHero();
      this.getPowers();
      this.fetchHeroPowers();
  }

  goBack(): void {
    this.location.back();
  }

}