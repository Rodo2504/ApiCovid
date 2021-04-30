import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  paises = ['Argentina','Australia','Austria','Belgium','Belize','Bolivia','Brazil','Canada','Chile','China','Costa Rica','Croatia','Cuba','Denmark','Ecuador','Egypt',
    'El Salvador','Estonia','Finland','France','Germany','Ghana','Greece','Guatemala','Haiti','Iceland','India','Ireland','Italy','Japan','Mexico','Nepal','Nicaragua','Panama',
    'Paraguay','Peru','Poland','Portugal','Qatar','Russia','Spain','South Africa','Switzerland','US','United Kingdom','Uruguay','Venezuela']
    /*{Pais: 'Mexico', Cod: 'MEX'}, {Pais: 'Spain', Cod: 'MEX'}, {Pais: 'Mexico', Cod: 'MEX'}, {Pais: 'Mexico', Cod: 'MEX'}, {Pais: 'Mexico', Cod: 'MEX'},*/
  

  info_covid(pais){
    return this.http.get(`https://covid-api.mmediagroup.fr/v1/cases/?country=${pais}`)
  }
  info_pais(pais){
    return this.http.get(`https://restcountries.eu/rest/v2/name/${pais}`)
  }
  info_historic(pais){
    return this.http.get(`https://covid-api.mmediagroup.fr/v1/history?country=${pais}&status=confirmed`)
  }

}
