import { Component, OnInit } from '@angular/core';
import {DonationsService} from "../donations.service";
import {Donation} from "../model/Donation";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  donations : Donation[];
  donationValue = new Number();

  constructor(private service : DonationsService) {
    IntervalObservable.create(10000)
      .subscribe(() => {
        this.service.getDonationLimit(10)
          .subscribe(result => {
            this.donations = result;
          });
      });
    IntervalObservable.create(10000)
      .subscribe(() => {
        this.service.getDonationValue()
          .subscribe(result => {
            this.donationValue = result;
          });
      });
  }

  ngOnInit() {
    this.getDonations();
    this.getDonationValue();
  }

  getDonations(){
    this.service.getDonationLimit(10).subscribe(
      result => {
        // Handle result
        console.log(result)
        this.donations = result;
      },
      error => {
      },
    );
  }

  getDonationValue(){
    this.service.getDonationValue().subscribe(
      result => {
        // Handle result
        console.log(result)
        this.donationValue = result;
      },
      error => {
      },
    );
  }

}
