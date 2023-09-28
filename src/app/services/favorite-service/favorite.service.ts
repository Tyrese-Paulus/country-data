import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favoriteList$: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(localStorage.getItem('favorites') || '{}'))
  commentSection$: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(localStorage.getItem('comments') || '{}'))

  constructor(private messageService: MessageService) { }

  initFavoriteStorage(){

    const favoriteList = JSON.parse(localStorage.getItem('favorites') || '{}');


    if(Object.keys(favoriteList).length === 0){
      const initFav = {
        favorites: []
      };
      const initialFavorites = JSON.stringify(initFav)
      localStorage.setItem('favorites', initialFavorites)
    }

  }

  initCommentSection(){
    const commentSection = JSON.parse(localStorage.getItem('comments') || '{}')

    if(Object.keys(commentSection).length === 0){
      const initComment = {
        comments: []
      }

      const initialComments = JSON.stringify(initComment)
      localStorage.setItem('comments', initialComments)
    }

  }

  setFav(country: any){
    const favoriteList = JSON.parse(localStorage.getItem('favorites') || '{}');
    const favoriteExist = favoriteList.favorites.find((favorite: any) => favorite.countryId === country.countryId)
    if(favoriteExist){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Country already in favorites'
      })
    }else{
      favoriteList.favorites.push(country)
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Country added to Favorites'
      }), () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Country not added to Favorites!'
        })
      }
    }
    const favJson = JSON.stringify(favoriteList)
    localStorage.setItem('favorites', favJson)
    this.favoriteList$.next(favoriteList);

  }

  getComments(){
    const commentSection = JSON.parse(localStorage.getItem('comments') || '{}')
    return commentSection.comments
  }

  postComment(comment: any){
    const commentSection = JSON.parse(localStorage.getItem('comments') || '{}');
    commentSection.comments.push(comment)

    const commentJSON = JSON.stringify(commentSection)
    localStorage.setItem('comments', commentJSON)

    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'Comment posted'
    })

    this.commentSection$.next(commentSection)
  }

  deleteFav(countryId: any){
    const favoriteList = JSON.parse(localStorage.getItem('favorites') || '{}');
    const newFav = favoriteList.favorites.filter((favorite: { countryId: any; }) => favorite.countryId !== countryId)

    favoriteList.favorites = newFav;

    const favJsonString = JSON.stringify(favoriteList);
    localStorage.setItem('favorites', favJsonString)

    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'Country removed from Favorites'
    })

    this.favoriteList$.next(favoriteList)
  }
}
