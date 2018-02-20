import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Donation} from "../model/Donation";
import {DonationsService} from "../donations.service";
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  donations : Donation[];
  newDonation = new Donation();

  constructor(private service : DonationsService) {
  }

  displayedColumns = ['id', 'vorname', 'nachname', 'firma', 'betrag', 'bearbeiten', 'loeschen'];
  dataSource = new MatTableDataSource(this.donations);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addDonation(){
    this.newDonation.id = 0;
    this.service.addDonation(this.newDonation).subscribe(
      result => {
        // Handle result
        console.log(result)
      },
      error => {

      },
    );
  }

  getDonations(){
    this.service.getDonations().subscribe(
      result => {
        // Handle result
        console.log(result)
        this.donations = result;
        this.dataSource.data = result;
      },
      error => {
      },
    );
  }

  updateDonation(donation: Donation){
    this.service.updateDonation(donation).subscribe(
      result => {
        // Handle result
        console.log(result)
        this.getDonations();
      },
      error => {
      },
    )
  }

  deleteDonation(donation: Donation){
      this.service.deleteDonation(donation).subscribe(
        result => {
          // Handle result
          console.log(result)
          this.getDonations();
        },
        error => {
        },
      )
  }

  ngOnInit() {
    this.getDonations();
  }

}
