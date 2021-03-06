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
        this.getHeroCity(this.hero.cityId);                  
      });    
  }

  getHero(flag): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero =>{ 
        this.hero = hero[0]
        if(flag==='none'){
          this.fetchHeroPowers();
          this.getCities();
          this.getCostumes();
        
        if(this.hero.costumeId!==null){
          this.getHeroCostume(this.hero.costumeId)
        }
        }
        if(flag==='city'){
          this.getCities();
        }
        if(flag==='costume'){
          this.getHeroCostume(this.hero.costumeId)
          this.getCostumes();
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
        if(this.hero.cityId!==null){
          this.costumes=this.costumes.filter(costume=>{
            return  costume.costumeId!==this.heroCostume.costumeId
          })
        }
        
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
    this.cityService.addHeroCity(this.hero.id,cid,this.hero.cityId)
    .subscribe(result=>{
      this.getHero('none');
    })
    ;
  }
  getHeroCity(cid){
    this.heroService.heroCity(cid)
    .subscribe(city=>{
      this.heroCity=city[0];
    })
  }
  onCityRemove():void{
    this.cityService.removeHeroCity(this.hero.id,this.hero.cityId)
    .subscribe(result=>{
      this.getHero('city');
      this.heroCity=null;
    })
    ;
  }
  addHeroCostume(cid){
    this.costumeService.addHeroCostume(cid,this.hero.id)
    .subscribe(result=>{
      this.getHero('costume');
    })
  }
  getHeroCostume(cid): void {
    this.costumeService.getCostume(cid)
      .subscribe(costume =>{ 
        this.heroCostume = costume[0]
      })
  }
  removeHeroCostume(){
    this.costumeService.removeHeroCostume(this.hero.id)
    .subscribe(result=>{
      this.heroCostume=null
      this.getHero('none');
    })
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