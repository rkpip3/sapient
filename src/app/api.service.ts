import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_SERVER = 'https://api.spaceXdata.com/v3/launches?limit=100';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  initData() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(this.REST_API_SERVER,
      { headers: reqHeader });
  }




  getAllData(
    launch_success: any,
    land_success: any,
    launch_year: any) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // tslint:disable-next-line:max-line-length
    return this.http.get(this.REST_API_SERVER + '&launch_success=' + launch_success + '&land_success=' + land_success + '&launch_year=' + launch_year,
      { headers: reqHeader });
  }

  // tslint:disable-next-line:typedef
  getYears() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(this.REST_API_SERVER,
      { headers: reqHeader });
  }

}
