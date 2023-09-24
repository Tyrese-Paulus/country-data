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

  constructor(private countryService: CountryService) { }

  ngOnInit(): void{
    this.countryService.getCountries().pipe(takeUntil(this.endsubs$)).subscribe((country) => {
      this.countries = country
    })
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

      console.log(this.selectedCountry[0].timezones);

      this.currentTime = new Date(this.selectedCountry[0].timezones)
      console.log(this.currentTime);



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


}
