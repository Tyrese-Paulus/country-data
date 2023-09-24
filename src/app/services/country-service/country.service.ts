import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apiURLCountries = "https://restcountries.com/v3.1/all"

  apiURLCountry = "https://restcountries.com/v3.1/alpha/"

  apiURLRegion = "https://restcountries.com/v3.1/region/"

  apiURLName = "https://restcountries.com/v3.1/name/"

  apiURLFifa = "https://restcountries.com/v3.1/alpha/"

  constructor(private http:HttpClient) { }

  getCountries(): Observable<Object>{
    return this.http.get<Object>(this.apiURLCountries)
  }

  getCountry(countryCode: any): Observable<Object>{
    return this.http.get<Object>(this.apiURLCountry + countryCode)
  }

  getCountryRegion(region: any): Observable<Object>{
    return this.http.get<Object>(this.apiURLRegion + region)
  }

  getCountryName(name: any): Observable<Object>{
    return this.http.get<Object>(this.apiURLName + name)
  }

  getCountryFifa(fifa: any): Observable<Object>{
    return this.http.get<Object>(this.apiURLFifa + fifa)
  }

}
