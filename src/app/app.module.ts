import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountryGridComponent } from './components/country-grid/country-grid.component';

import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CountryGridComponent
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
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
  ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
