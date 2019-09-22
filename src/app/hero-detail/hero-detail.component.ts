import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import {PowerService} from "../power.service";
import {Power} from '../power'
import {CityService} from '../city.service'
import {City} from '../city'
import { Costume } from '../costume';
import {CostumeService} from '../costume.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  updateOption:String="Power"
  powers:Power[]
  selectedPowers:Power[]=[]
  heroPowers:Power[]=[]
  obj:Power[]=[]
  cities:City[];
  heroCity:City;
  costumes:Costume[]
  heroCostume:Costume;

  onOptionSelect(option):void{
    this.updateOption=option
  }

  getCities(): void {
    this.cityService.fetchUnAssignedCities()
      .subscribe(cities =>{ 
        this.cities = cities;
        console.log(cities);
      });    
  }

  getHero(flag): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero =>{ 
        this.hero = hero[0]
        console.log(this.hero.cityId)
        if(flag==='none'){
          this.fetchHeroPowers();
          this.getCities();
          this.getCostumes();
        
        if(this.hero.cityId!==null){
          this.getHeroCity(this.hero.cityId)
        }
        }
        if(flag==='city'){
          this.getCities();
          this.getHeroCity(this.hero.cityId);          
        }
      })
  }

  onSelectPower(power):void{
    let index=this.heroPowers.findIndex((obj)=>{
      return obj.id===power.id
    })
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
    
      this.obj=this.selectedPowers.filter(p=>{
      return p.id===powerId
    })
    this.selectedPowers=this.selectedPowers.filter(p=>{
      return p.id!==powerId
    })
    this.powers.push(this.obj[0]);
    this.heroService.addHeroPower(heroPower)
    .subscribe(result=>{
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
    this.heroPowers=[];
    let powerIdsArray:any=[]

    this.heroService.getHeroPowers(this.hero.id)
    .subscribe(ids=>{
      
      powerIdsArray=ids;
      powerIdsArray.forEach(powerId => {
        let pId=powerId.powerId;
        this.powers.forEach(power => {
          if(power.id==pId){
            this.heroPowers.push(power);
          }
        });
      });

    })
  }

  getCostumes(): void {
    this.costumeService.getCostumes()
      .subscribe(costumes =>{ 
        this.costumes = costumes;
      });    
  }
  onDeleteHeroPower(powerId):void{
    this.heroService.deleteHeroPowers(this.hero.id,powerId)
      .subscribe(result =>{ 
        this.heroPowers=[]
        this.fetchHeroPowers();
      });
  }

  onCityAdd(cid):void{ 
    console.log("Current City Id ",cid);
    console.log("Previous City Id ",this.hero.cityId);
    this.cityService.addHeroCity(this.hero.id,cid,this.hero.cityId)
    .subscribe(result=>{
      console.log(result);
      this.getHeroCity(cid);
      this.getHero('city');
    })
    ;
  }
  getHeroCity(cid){
    this.heroService.heroCity(cid)
    .subscribe(city=>{
      this.heroCity=city[0];
      console.log(this.heroCity)
    })
  }
  onCityRemove():void{
    this.cityService.removeHeroCity(this.hero.id,this.hero.cityId)
    .subscribe(result=>{
      console.log(result);
      this.heroCity=null;
      this.getHero('city');
    })
    ;
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private powerService:PowerService,
    private cityService:CityService,
    private costumeService:CostumeService
  ) { }

  ngOnInit(){
      this.getHero('none');
      this.getPowers();
      this.fetchHeroPowers();
        }

  goBack(): void {
    this.location.back();
  }

}