import { FavoriteService } from './../../../services/favorite-service/favorite.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../../services/country-service/country.service';
import { take, takeUntil, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { __values } from 'tslib';


@Component({
  selector: 'app-favorite-details',
  templateUrl: './favorite-details.component.html',
  styleUrls: ['./favorite-details.component.css']
})
export class FavoriteDetailsComponent {
  endsubs$: Subject<any> = new Subject();
  form: FormGroup = new FormGroup({});
  selectedFavId: any;
  selectedFav: any;

  comments: any[] = [];

  selectedLanguages: any;
  selectedCurrencies: any;
  countryCurrencies: any = [];

  fifa: boolean = false;

  constructor(private route: ActivatedRoute, private countryService: CountryService, private formBuilder: FormBuilder, private favoriteService: FavoriteService ) {}

  ngOnInit(): void {



    this.favoriteService.initCommentSection();

    this.form = this.formBuilder.group({
      comment: [''],
      image: ['']
    })

    this.selectedFavId = this.route.snapshot.paramMap.get("id")
    this.getSelectedFav(this.selectedFavId)
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

    console.log(this.comments);

  }

  // getComments(){
  //   this.favoriteService.commentSection$.pipe().subscribe((respCom: any) => {
  //     this.comments = []
  //     respCom.comments.forEach((comment: any) => {
  //       for(let i=0;i < respCom.comments.length; i++){
  //         const value = respCom.comments[i]
  //         if(value.id === comment.id){
  //           this.comments.push(value)
  //         }
  //       }
  //     })
  //   })

  //   console.log(this.comments);

  // }

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
    // const UET = Date.now()
    const date = new Date();
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


    newComment.day = dayOfWeek;
    newComment.calDate = calDate;
    newComment.month = monthOfYear;
    newComment.year = year;
    newComment.time = time;




    // newComment.date = date;

    // const options = {timeZone: 'Africa/Johannesburg'}

    // const localDateString = date.toLocaleString('en-US', options)
    // console.log(localDateString);

    this.addComment(newComment)
    this.getComments()
  }

  get favForm(){
    return this.form.controls
  }
}
