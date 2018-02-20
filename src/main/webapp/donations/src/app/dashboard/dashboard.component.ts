import { Component, OnInit } from '@angular/core';
import {DonationsService} from "../donations.service";
import {Donation} from "../model/Donation";
import * as http from "http";
import {Observable} from "rxjs/Observable";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private donations : Donation[];
  private spendenbetrag = new Number();

  constructor(private service : DonationsService) {
    IntervalObservable.create(10000)
      .subscribe(() => {
        this.service.getDonations()
          .subscribe(result => {
            this.donations = result;
          });
      });
  }

  ngOnInit() {
    this.getDonations();
  }

  getDonations(){
    this.service.getDonations().subscribe(
      result => {
        // Handle result
        console.log(result)
        this.donations = result;
      },
      error => {
      },
    );
  }

}
