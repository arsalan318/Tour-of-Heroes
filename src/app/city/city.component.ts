import { Component, OnInit } from '@angular/core';
import {City} from '../city';
import {CityService} from '../city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities:City[]

  getCities(): void {
    this.cityService.getCities()
      .subscribe(cities =>{ 
        this.cities = cities;
      });    
  }
  add(name: string):void{
    name = name.trim();
    if (!name) { return; }
    this.cityService.addCity({ name } as City)
      .subscribe(hero => {
        this.cities.push(hero);
        this.getCities();
      });
  }

  delete(city: City): void {
    this.cities = this.cities.filter(h => h !== city);
    this.cityService.deleteCity(city).subscribe();
  }


   constructor(private cityService:CityService) { }

  ngOnInit() {
    this.getCities()
  }

}
