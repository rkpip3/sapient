import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fullData: any;
  listOfYears = [] as any;
  listOfYear = [] as any;
  SuccessfullLaunchStatus = true;
  SuccessfullLandingStatus = true;
  isClicked = [];

  launch_success = true;
  land_success = true;
  launch_year: any;
  launch_data: any;
  launch_data_availability: any;
  loading = false;

  LaunchButtonStatus = true;
  LandingButtonStatus = true;

  launchYearsButtonStatus: any;

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.list_of_years();
    this.getinitData();
  }

  // tslint:disable-next-line:typedef
  getinitData() {
    this.loading = true;
    this.apiService
      .initData()
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.launch_data = data;
          this.launch_data_availability = data.length;
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' data');
        }
      );
  }



  // tslint:disable-next-line:typedef
  getFullList() {
    this.apiService
      .getAllData(
        this.launch_success,
        this.land_success,
        this.launch_year
      )
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.launch_data = data;
          this.launch_data_availability = data.length;
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' data');
        }
      );
  }

  // tslint:disable-next-line:typedef
  setLaunchYear(e: any) {
    this.loading = true;
    this.launch_year = e;
    this.launchYearsButtonStatus = e;
    this.getFullList();
  }

  // tslint:disable-next-line:typedef
  setSuccessfullLaunch(e: any) {
    this.launch_success = e;
    this.LaunchButtonStatus = e;
    this.getFullList();
  }

  // tslint:disable-next-line:typedef
  setSuccessfullLanding(e: any) {
    this.land_success = e;
    this.LandingButtonStatus = e;
    this.getFullList();
  }


  // tslint:disable-next-line:typedef
  list_of_years() {
    this.apiService
      .getYears()
      .subscribe(
        (data: any) => {
          for (const char of data) {
            this.listOfYears.push(char.launch_year);
          }
          this.listOfYear = [...new Set(this.listOfYears)];
          this.launch_year = this.listOfYear[0];
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' data');
        }
      );
  }



}
