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

  constructor(private countryService: CountryService) { }

  ngOnInit(): void{
    this.countryService.getCountries().pipe(takeUntil(this.endsubs$)).subscribe((country) => {
      this.countries = country
      console.log(this.countries);

    })
  }

  images = [
    {url: '../../../assets/p-1.jpg'},
    {url: '../../../assets/p-2.jpg'},
    {url: '../../../assets/p-3.jpg'},
    {url: '../../../assets/p-4.jpg'},
    // more images...
  ];
}
