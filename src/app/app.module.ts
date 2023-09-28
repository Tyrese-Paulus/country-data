import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CountryGridComponent } from './components/country-grid/country-grid.component';
import { FavoriteGridComponent } from './components/favorite-grid/favorite-grid/favorite-grid.component';
import { FavoriteDetailsComponent } from './components/favorite-details/favorite-details/favorite-details.component';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule} from 'primeng/toast'
import { MessageService } from 'primeng/api';

import {NgxPaginationModule} from 'ngx-pagination';




@NgModule({
  declarations: [
    AppComponent,
    CountryGridComponent,
    FavoriteGridComponent,
    FavoriteDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    BrowserAnimationsModule,
    CardModule,
    HttpClientModule,
    NgxPaginationModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
  ,
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
