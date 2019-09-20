import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {PowersComponent} from './powers/powers.component'
import {PowerDetailsComponent} from './power-details/power-details.component'
import {CityComponent} from './city/city.component'
import {CityDetailsComponent} from './city-details/city-details.component'
import {CostumeComponent} from './costume/costume.component'
import {CostumeDetailsComponent} from './costume-details/costume-details.component'


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard' , component: DashboardComponent },
  { path : 'details/:id' , component : HeroDetailComponent },
  { path : 'powers' , component : PowersComponent },
  { path : 'power/detail/:id' , component : PowerDetailsComponent },
  { path : 'city' , component : CityComponent },
  { path : 'city/details/:id' , component : CityDetailsComponent },
  { path : 'costume' , component : CostumeComponent },
  { path : 'costume/details/:id' , component : CostumeDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
