import { Component, OnInit } from '@angular/core';
import {DonationsService} from "../donations.service";
import {Donation} from "../model/Donation";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private donations : Donation[];

  constructor(private service : DonationsService) {

  }

  ngOnInit() {
    this.service.getDonations().subscribe(donations => this.donations = donations);
  }

}
