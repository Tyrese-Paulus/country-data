import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apiURLCountries = "https://restcountries.com/v3.1/all"

  constructor(private http:HttpClient) { }

  getCountries(): Observable<Object>{
    return this.http.get<Object>(this.apiURLCountries)
  }
}
