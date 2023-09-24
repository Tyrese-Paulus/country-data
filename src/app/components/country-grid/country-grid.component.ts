import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { CountryService } from './../../services/country-service/country.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-country-grid',
  templateUrl: './country-grid.component.html',
  styleUrls: ['./country-grid.component.css']
})
export class CountryGridComponent implements OnInit {

  cities: any = [];
  selectedCity: any;

  p: number = 1;
  countries: any = [] ;
  endsubs$: Subject<any> = new Subject();
  visible: boolean = false;
  countryCode: any;
  selectedCountry: any;
  languages: any;
  selectedLanguages: any;
  selectedCurrencies: any;
  notDraggable: boolean = false;
  countryCurrencies: any = [];
  fifa: boolean = false;
  currentTime: any;
  options: any;
  nameValue:any;
  fifaValue: any;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void{
    this.getCountries()

    this.cities = [
      {name: 'Africa', code: 'africa'},
      {name: 'Americas', code: 'americas'},
      {name: 'Europe', code: 'europe'},
      {name: 'Oceania', code: 'oceania'},
      {name: 'Asia', code: 'asia'},
      {name: 'Antarctic', code: 'antarctic'},
    ]
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

      console.log(this.selectedCountry[0]);



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
    console.log(selectedRegion.value.code);
    this.countryService.getCountryRegion(selectedRegion.value.code).pipe(takeUntil(this.endsubs$)).subscribe((regionalCountries) =>{
      this.countries = regionalCountries;
    })
  }

  getName(){
    console.log(this.nameValue);
    this.countryService.getCountryName(this.nameValue).pipe(takeUntil(this.endsubs$)).subscribe((countryByName) => {
      this.countries = countryByName;
    })
  }

  getFifa(){
    console.log(this.fifaValue);
    this.countryService.getCountryFifa(this.fifaValue).pipe(takeUntil(this.endsubs$)).subscribe((countryByCode: any) => {
      this.countries = countryByCode
    })

  }
}

