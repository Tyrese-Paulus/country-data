import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { CountryService } from '../../../services/country-service/country.service';
import { FavoriteService } from '../../../services/favorite-service/favorite.service';

@Component({
  selector: 'app-favorite-grid',
  templateUrl: './favorite-grid.component.html',
  styleUrls: ['./favorite-grid.component.css']
})
export class FavoriteGridComponent implements OnInit, OnDestroy {

  favCountryDetailed: any[] = [];
  p: number = 1;
  endsubs$: Subject<any> = new Subject();

  constructor(private countryService: CountryService, private favoriteService: FavoriteService, private router: Router){}

  ngOnInit(): void {
    this.getFavDetails();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  getFavDetails(){
    this.favoriteService.favoriteList$.pipe().subscribe((respFav: any) => {
      this.favCountryDetailed = []
      respFav.favorites.forEach((favItem: any) => {
        this.countryService.getCountry(favItem.countryId).subscribe((fav) => {
          this.favCountryDetailed.push(fav)
        })
      })
    })
  }

  deleteFavCountry(country: any){
    this.favoriteService.deleteFav(country)
  }

  favDetails(favId: any){
    this.router.navigateByUrl(`favorite-details/${favId}`)
  }
}
