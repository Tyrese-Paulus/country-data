import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryGridComponent } from './components/country-grid/country-grid.component';
import { FavoriteGridComponent } from './components/favorite-grid/favorite-grid/favorite-grid.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: CountryGridComponent},
  {path: 'favorites', component: FavoriteGridComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
