import { Component, OnInit } from '@angular/core';
import {City} from '../city'; 
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {CityService} from '../city.service';
import {Hero} from '../hero'
@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent implements OnInit {
  
  city:City;
  assignedHeroes:Hero[]=[];
  
  getCity(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cityService.getCity(id)
      .subscribe(city =>{ 
        this.city = city[0]
        this.getAssignedHeroes()
      })
  }
  getAssignedHeroes(){
    this.cityService.assignedHeroes(this.city.cityId)
    .subscribe(heroes=>{
      this.assignedHeroes=heroes
    })
  }
  save(): void {
    this.cityService.updateCity(this.city)
      .subscribe(() => this.goBack());
  }
  constructor(
    private route: ActivatedRoute,
    private cityService: CityService,
    private location: Location,
  ) { }
  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getCity()
  }

}
