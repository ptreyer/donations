export class Donation {
  private _id: number;
  betrag: number;
  vorname: string;
  nachname: string;
  firma: string;
  createdAt: Date;
  updatedAt: Date;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
