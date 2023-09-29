import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common'

import { takeUntil, Subject } from 'rxjs';

import { FavoriteService } from './../../../services/favorite-service/favorite.service';
import { CountryService } from '../../../services/country-service/country.service';

@Component({
  selector: 'app-favorite-details',
  templateUrl: './favorite-details.component.html',
  styleUrls: ['./favorite-details.component.css']
})
export class FavoriteDetailsComponent implements OnInit, OnDestroy {

  endsubs$: Subject<any> = new Subject();
  form: FormGroup = new FormGroup({});
  selectedFavId: any;
  selectedFav: any;

  comments: any[] = [];

  selectedLanguages: any;
  selectedCurrencies: any;
  countryCurrencies: any = [];

  fifa: boolean = false;

  constructor(private route: ActivatedRoute, private location: Location, private countryService: CountryService, private formBuilder: FormBuilder, private favoriteService: FavoriteService ) {}

  ngOnInit(): void {
    this.favoriteService.initCommentSection();

    this.form = this.formBuilder.group({
      comment: [''],
      image: ['']
    })

    this.selectedFavId = this.route.snapshot.paramMap.get("id")
    this.getSelectedFav(this.selectedFavId)
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  back(): void {
    this.location.back()
  }

  getSelectedFav(favId: any){
    this.countryService.getCountry(favId).pipe(takeUntil(this.endsubs$)).subscribe((fav) => {
      this.selectedFav = fav;
      this.getLanguages(this.selectedFav[0].languages)
      this.getCurrencies(this.selectedFav[0].currencies)

      if(this.selectedFav[0].fifa){
        this.fifa = true
      } else{
        this.fifa = false
      }

    })
  }


  getComments(){
    this.favoriteService.commentSection$.pipe().subscribe((respCom: any) => {
      this.comments = []

      for(let i =0; i < respCom.comments.length; i ++){
        const value = respCom.comments[i]
        if(value.id ===  this.selectedFavId){
          this.comments.push(value)
        }
      }
    })

  }

  favComments(){
    this.favoriteService.getComments().pipe(takeUntil(this.endsubs$)).subscribe((favComment: any) => {
      this.comments = []
    })

  }

  addComment(commentForm: any){
    this.favoriteService.postComment(commentForm)
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

  onSubmit(){
    const newComment = this.form.value
    newComment.id = this.selectedFavId

    const newCommentWDate = this.getTime()
    newComment.day = newCommentWDate.day;
    newComment.calDate = newCommentWDate.calDate;
    newComment.month = newCommentWDate.month;
    newComment.year = newCommentWDate.year;
    newComment.time = newCommentWDate.time;

    this.addComment(newComment)
    this.getComments()
  }

  getTime(){
    const date = new Date();

    let dateObj:any = {};

    let day = date.getDay();
    let calDate = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})

    let dayOfWeek = '';

    switch(day){
      case 0:
        dayOfWeek = 'Sunday';
        break;
      case 1:
        dayOfWeek = 'Monday';
        break;
      case 2:
        dayOfWeek = 'Tuesday';
        break;
      case 3:
        dayOfWeek = 'Wednesday';
        break;
      case 4:
        dayOfWeek = 'Thursday';
        break;
      case 5:
        dayOfWeek = 'Friday';
        break;
      case 6:
        dayOfWeek = 'Saturday';
        break;

    }

    let monthOfYear = '';

    switch(month){
      case 0:
        monthOfYear = 'January';
        break;
      case 1:
        monthOfYear = 'February';
        break;
      case 2:
        monthOfYear = 'March';
        break;
      case 3:
        monthOfYear = 'April';
        break;
      case 4:
        monthOfYear = 'May';
        break;
      case 5:
        monthOfYear = 'June';
        break;
      case 6:
        monthOfYear = 'July';
        break;
      case 7:
        monthOfYear = 'August';
        break;
      case 8:
        monthOfYear = 'September';
        break;
      case 9:
        monthOfYear = 'October';
        break;
      case 10:
        monthOfYear = 'November';
        break;
      case 11:
        monthOfYear = 'December';
        break;
    }

    dateObj.day = dayOfWeek;
    dateObj.calDate = calDate;
    dateObj.month = monthOfYear;
    dateObj.year = year;
    dateObj.time = time;

    return dateObj
  }

  get favForm(){
    return this.form.controls
  }
}
