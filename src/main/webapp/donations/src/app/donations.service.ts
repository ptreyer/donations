import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {Donation} from "./model/Donation";

@Injectable()
export class DonationsService {

  private url = 'donation/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(this.url)
  }

  getDonation(id: number): Observable<Donation>  {
    const url = `${this.url}/${id}`;
    return this.http.get<Donation>(url)
  }

  updateDonation(donation: Donation): Observable<any> {
    return this.http.put(this.url, donation, this.httpOptions);
  }

  addDonation(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(this.url, donation, this.httpOptions);
  }

  deleteDonation(donation: Donation | number): Observable<Donation> {
    const id = typeof donation === 'number' ? donation : donation.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Donation>(url, this.httpOptions);
  }

}
