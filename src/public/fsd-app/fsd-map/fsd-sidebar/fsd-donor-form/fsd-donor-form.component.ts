import {Component, Input, OnInit} from "@angular/core";
import {Point} from "esri";
@Component({
  selector: "fsd-donor-form",
  template: `
    <form role="form" class="container-fluid">
      <div class="form-group">
        <label class="col-lg-6 col-md-6 col-sm-12 col-xs-12 control-label">
          Firstname
          <input [(ngModel)]="donor.firstname" required class="form-control">
        </label>
        <label class="col-lg-6 col-md-6 col-sm-12 col-xs-12 control-label">
          Lastname
          <input [(ngModel)]="donor.lastname"  required class="form-control">
        </label>
      </div>
      <div class="form-group">
         <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label">
          Address
          <textarea required class="form-control"></textarea>
        </label>
      </div>
      <div class="form-group">
         <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label">
          Contact number
          <input required class="form-control">
        </label>
      </div>
      <div class="form-group">
         <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label">
          Email address
          <input required class="form-control">
        </label>
      </div>
      <div class="form-group">
         <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label">
          Blood group
          <select required class="form-control">
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="ab">AB</option>
              <option value="o">O</option>
              <option value="bM">B-</option>
              <option value="aM">A-</option>
          </select>
        </label>
      </div>
      <div class="btn btn-group">
         <button class="btn btn-primary" type="submit">Register</button>
      </div>
    </form>
  `})
export class FsdDonorFormComponent implements OnInit {
  @Input() pointer: Point;
  donor: FsdDonor = new FsdDonorImpl();
  ngOnInit() {
    console.log("pointer", this.pointer);
  }
}
export interface FsdDonor {
  firstname: string;
  lastname: string;
  emailAddress: string;
  contactNumber: string;
  bloodGroup: string;
}
export class FsdDonorImpl implements FsdDonor {
  firstname: string;
  lastname: string;
  emailAddress: string;
  contactNumber: string;
  bloodGroup: string;
}