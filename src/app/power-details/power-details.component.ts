import { Component, OnInit, Input } from '@angular/core';
import { Power } from '../power';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PowerService} from '../power.service'


@Component({
  selector: 'app-power-details',
  templateUrl: './power-details.component.html',
  styleUrls: ['./power-details.component.css']
})
export class PowerDetailsComponent implements OnInit {
  @Input() power:Power

  getPower(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.powerService.getPower(id)
      .subscribe(power => {
        this.power = power[0];
        console.log('Power Fetched')
      })
  }
  
  save(): void {
    this.powerService.updatePower(this.power)
      .subscribe(() => this.goBack());
  }

  constructor(
    private powerService:PowerService,
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
