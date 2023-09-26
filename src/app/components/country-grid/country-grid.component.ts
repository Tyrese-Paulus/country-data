import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { CountryService } from './../../services/country-service/country.service';
import { FavoriteService } from './../../services/favorite-service/favorite.service';

@Component({
  selector: 'app-country-grid',
  templateUrl: './country-grid.component.html',
  styleUrls: ['./country-grid.component.css']
})
export class CountryGridComponent implements OnInit {

  endsubs$: Subject<any> = new Subject();
  countries: any = [] ;

  p: number = 1;
  visible: boolean = false;

  selectedCountry: any;
  selectedLanguages: any;
  selectedCurrencies: any;
  countryCurrencies: any = [];

  fifa: boolean = false;
  nameValue:any;
  fifaValue: any;

  regions: any = [
    {name: 'Africa', code: 'africa'},
    {name: 'Americas', code: 'americas'},
    {name: 'Europe', code: 'europe'},
    {name: 'Oceania', code: 'oceania'},
    {name: 'Asia', code: 'asia'},
    {name: 'Antarctic', code: 'antarctic'},
    ];

  constructor(private countryService: CountryService, private favoriteService: FavoriteService) {
    favoriteService.initFavoriteStorage();
   }

  ngOnInit(): void{
    this.getCountries()
  }

  showDialogue(){
    this.visible = true;
  }

  selectCountry(countryCode: any){

    this.countryService.getCountry(countryCode).pipe(takeUntil(this.endsubs$)).subscribe((country) => {

      this.selectedCountry = country
      this.getLanguages(this.selectedCountry[0].languages)
      this.getCurrencies(this.selectedCountry[0].currencies)

      if(this.selectedCountry[0].fifa){
        this.fifa = true
      } else{
        this.fifa = false
      }

    })

  }

  getLanguages(languageObj: any){
    this.selectedLanguages = Object.values(languageObj)
  }

  getCurrencies(currencyObj: any){

    this.selectedCurrencies = Object.values(currencyObj)

    this.countryCurrencies = [];

    this.selectedCurrencies.forEach((currency: any) => {
      for (const property in currency){
        if( property === 'name'){
          this.countryCurrencies.push(currency[property])
        }
      }
    })

  }

  getCountries(){

    this.countryService.getCountries().pipe(takeUntil(this.endsubs$)).subscribe((country) => {
      this.countries = country
    })

  }

  getRegion(selectedRegion: any){

    this.countryService.getCountryRegion(selectedRegion.value.code).pipe(takeUntil(this.endsubs$)).subscribe((regionalCountries) =>{
      this.countries = regionalCountries;
    })

  }

  getName(){

    this.countryService.getCountryName(this.nameValue).pipe(takeUntil(this.endsubs$)).subscribe((countryByName) => {
      this.countries = countryByName;
    })

  }

  getFifa(){

    this.countryService.getCountryFifa(this.fifaValue).pipe(takeUntil(this.endsubs$)).subscribe((countryByCode: any) => {
      this.countries = countryByCode
    })

  }

  addCountryToFavorites(favoriteCountryId: any){
    const selectedFavorite= {
      countryId: favoriteCountryId
    }
    this.favoriteService.setFav(selectedFavorite)
  }
}

