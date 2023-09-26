import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favoriteList$: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(localStorage.getItem('favorites') || '{}'))

  constructor() { }

  initFavoriteStorage(){
    const favoriteList = JSON.parse(localStorage.getItem('favorites') || '{}');
    console.log(favoriteList);

    if(Object.keys(favoriteList).length === 0){
      const initFav = {
        favorites: []
      };
      const initialFavorites = JSON.stringify(initFav)
      localStorage.setItem('favorites', initialFavorites)
    }

  }

  setFav(country: any){
    const favoriteList = JSON.parse(localStorage.getItem('favorites') || '{}');
    const favoriteExist = favoriteList.favorites.find((favorite: any) => favorite.countryId === country.countryId)
    if(favoriteExist){
      alert('already favorite')
    }else{
      favoriteList.favorites.push(country)
    }
    const favJson = JSON.stringify(favoriteList)
    localStorage.setItem('favorites', favJson)
    this.favoriteList$.next(favoriteList);
  }

  deleteFav(countryId: any){
    const favoriteList = JSON.parse(localStorage.getItem('favorites') || '{}');
    const newFav = favoriteList.favorites.filter((favorite: { countryId: any; }) => favorite.countryId !== countryId)

    favoriteList.favorites = newFav;

    const favJsonString = JSON.stringify(favoriteList);
    localStorage.setItem('favorites', favJsonString)

    this.favoriteList$.next(favoriteList)
  }
}
