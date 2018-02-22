import {Component, OnInit} from '@angular/core';
import {DonationsService} from "../donations.service";
import {Donation} from "../model/Donation";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  donations: Donation[] = new Array();
  donationValue = new Number();

  constructor(private service: DonationsService) {
    IntervalObservable.create(10000)
      .subscribe(() => {
       this.getDonationsLimit(false);
      });
    IntervalObservable.create(10000)
      .subscribe(() => {
        this.getDonationValue();
      });
  }

  ngOnInit() {
    this.getDonationsLimit(true);
    this.getDonationValue();
  }

  getDonationsLimit(reset: boolean) {
    this.service.getDonationLimit(6, reset).subscribe(
      result => {
        // Handle result
        console.log(result)
        this.donations = result;
      },
      error => {
      },
    );
  }

  getDonations() {
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

  getDonationValue() {
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
