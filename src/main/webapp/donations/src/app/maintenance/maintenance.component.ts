import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Donation} from "../model/Donation";
import {DonationsService} from "../donations.service";

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  donations : Donation[];
  newDonation = new Donation();

  constructor(private service : DonationsService, public dialog: MatDialog) {
  }

  displayedColumns = ['id', 'name', 'betrag', 'bearbeiten', 'loeschen'];
  dataSource = new MatTableDataSource(this.donations);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(selectedDonation: Donation): void {
    var copy = Object.assign({}, selectedDonation)
    let dialogRef = this.dialog.open(MaintenanceComponentDialog, {
      height: '350px',
      width: '600px',
      data: { donation: copy }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.getDonations();
    });
  }

  addDonation(){
    this.newDonation.id = 0;
    this.service.addDonation(this.newDonation).subscribe(
      result => {
        // Handle result
        this.newDonation = new Donation();
        this.getDonations();
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

@Component({
  selector: 'app-maintenance-dialog',
  templateUrl: './maintenance.component-dialog.html',
})
export class MaintenanceComponentDialog {

  constructor(
    public dialogRef: MatDialogRef<MaintenanceComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service : DonationsService) { }

  cancel(): void {
    this.dialogRef.close();
  }

  save(){
    this.service.updateDonation(this.data.donation).subscribe(
      result => {
        // Handle result
        this.dialogRef.close();
        console.log(result)
      },
      error => {
      },
    )
  }

}
