import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output
}
from "@angular/core";
import {
  FsdDonorResourceService
}
from "../../../services/fsd-donor-resource.service";
@Component({
  providers: [FsdDonorResourceService],
  selector: "fsd-donor-form",
  template: `
    <form #donorForm="ngForm" *ngIf="active" role="form" (ngSubmit)="onSubmit()" class="container-fluid">
      <div *ngIf="error" class="error-msg alert alert-danger">
        <span>Saving failed!</span>
      </div>
      <div class="form-group">
        <label class="col-lg-6 col-md-6 col-sm-12 col-xs-12 control-label">
          Firstname
          <input ngControl="firstName" [(ngModel)]="donor.firstName.model" required class="form-control" 
          #firstName="ngForm">
          <div [hidden]="firstName.valid || firstName.pristine" class="error-msg alert alert-danger">
             {{donor.firstName.getErrorMsg()}}
          </div>
        </label>
        <label class="col-lg-6 col-md-6 col-sm-12 col-xs-12 control-label">
          Lastname
          <input ngControl="lastname" [(ngModel)]="donor.lastname.model" required class="form-control"
          #lastname="ngForm">
          <div [hidden]="lastName.valid || lastName.pristine" class="error-msg alert alert-danger">
             {{donor.lastName.getErrorMsg()}}
          </div>
        </label>
      </div>
      <div class="form-group">
         <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label">
          Address
          <textarea ngControl="address" [(ngModel)]="donor.address.model" required class="form-control"
          #address="ngForm"></textarea>
          <div [hidden]="address.valid || address.pristine" class="error-msg alert alert-danger">
             {{donor.address.getErrorMsg()}}
          </div>
        </label>
      </div>
      <div class="form-group">
         <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label">
          Contact number
          <input (ngModelChange)="donor.contactNumber.validate()"  ngControl="contactNumber" required [(ngModel)]="donor.contactNumber.model" 
          class="{{donor.contactNumber.isValid()?'valid':'invalid'}} form-control" #contactNumber="ngForm">
          <div [hidden]="contactNumber.valid || contactNumber.pristine" class="error-msg alert alert-danger">
             {{!!donor.contactNumber.model ?donor.contactNumber.getValidationMsg() :donor.contactNumber.getErrorMsg()}}
          </div>
          <div [hidden]="contactNumber.pristine" *ngIf="!donor.contactNumber.isValid()" class="error-msg alert alert-danger">
             {{donor.contactNumber.getValidationMsg()}}
          </div> 
        </label>
      </div>
      <div class="form-group">
         <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label">
          Email address
          <input (ngModelChange)="donor.emailAddress.validate()" ngControl="emailAddress" #emailAddress="ngForm" [(ngModel)]="donor.emailAddress.model" required 
          class="{{donor.emailAddress.isValid()?'valid':'invalid'}} form-control">
          <div [hidden]="emailAddress.valid || emailAddress.pristine" class="error-msg alert alert-danger">
             {{donor.emailAddress.getErrorMsg()}}
          </div>
          <div [hidden]="emailAddress.pristine" *ngIf="!donor.emailAddress.isValid()" class="error-msg alert alert-danger">
             {{donor.emailAddress.getValidationMsg()}}
          </div> 
        </label>
      </div>
      <div class="form-group">
         <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label">
          Blood group
          <select ngControl="bloodGroup" #bloodGroup="ngForm" [(ngModel)]="donor.bloodGroup.model" required class="form-control">
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="ab">AB</option>
              <option value="o">O</option>
              <option value="bM">B-</option>
              <option value="aM">A-</option>
          </select>
          <div [hidden]="bloodGroup.valid || bloodGroup.pristine" class="error-msg alert alert-danger">
             {{donor.bloodGroup.getErrorMsg()}}
          </div>
        </label>
      </div>
      <div class="form-group">
        <div class="btn btn-group">
          <button class="btn btn-primary" type="submit">Register</button>
        </div>
      </div>
    </form>
  `
})
export class FsdDonorFormComponent implements OnInit {
  @Output() onSaved: EventEmitter<any> = new EventEmitter();
  @Input() pointer: any;
  donor: FsdDonor = new FsdDonorImpl();
  error: any;
  private donorLocation: FsdDonorLocation;
  active: Boolean = false;
  constructor(private fsdDonorResource: FsdDonorResourceService) { }
  ngOnInit() {
    setTimeout(() => {
      this.active = true;
    }, 0);
  }
  onSubmit() {
    this.convertPoiterToDonorLocation();
    this.fsdDonorResource.register(this.createRegisterDonorInput(), (err, response) => {
      if (err) {
        this.error = err;
      } else {
         onSaved.emit(response);
      }
    });
  }
  private convertPoiterToDonorLocation() {
    let donorLocation = new FsdDonorLocation();
    let mapPoint = this.pointer.mapPoint;
    donorLocation.x = mapPoint.x;
    donorLocation.y = mapPoint.y;
    donorLocation.z = mapPoint.z;
    donorLocation.hasM = mapPoint.hasM;
    donorLocation.hasZ = mapPoint.hasZ;
    donorLocation.latitude = mapPoint.latitude;
    donorLocation.longitude = mapPoint.longitude;
    donorLocation.m = mapPoint.m;
    donorLocation.sr_isWebMercator = mapPoint.spatialReference.isWebMercator;
    donorLocation.sr_isWGS84 = mapPoint.spatialReference.isWGS84;
    donorLocation.sr_isWrappable = mapPoint.spatialReference.isWrappable;
    donorLocation.sr_latestWkid = mapPoint.spatialReference.latestWkid;
    donorLocation.sr_wkid = mapPoint.spatialReference.wkid;
  }
  private createRegisterDonorInput(): {
    donor: FsdDonor,
    donorLocation: FsdDonorLocation
  } {
    return {
      donor: this.donor,
      donorLocation: this.donorLocation
    };
  }
}
export class FsdDonorImpl implements FsdDonor {
  private regex: Regex = new Regex();
  firstName: FormModel = new FormModel(true, "First name is required");
  lastName: FormModel = new FormModel(true, "Last name is required");
  address: FormModel = new FormModel(true, "Address is required");
  emailAddress: FormModel = new FormModel(true, "Email is required", "Invalid email address", (model) => {
    return !!this.regex.email.test(model);
  });
  contactNumber: FormModel = new FormModel(true, "Contact number is required", "Invalid contact number", (model) => {
    return !!this.regex.contact.test(model);
  });
  bloodGroup: FormModel = new FormModel(true, "Blood group is required");
  get(): FsdDonor {
    return {
      firstName: this.firstName.model,
      lastName: this.lastName.model,
      address: this.address.model,
      emailAddress: this.emailAddress.model,
      contactNumber: this.contactNumber.model,
      bloodGroup: this.bloodGroup.model
    };
  }
}
export class FsdDonorLocation {
  x: Number;
  y: Number;
  z: Number;
  latitude: Number;
  longitude: Number;
  hasM: Boolean;
  hasZ: Boolean;
  m: Number;
  sr_isWGS84: Boolean;
  sr_isWebMercator: Boolean;
  sr_isWrappable: Boolean;
  sr_latestWkid: Number;
  sr_wkid: Number;
}
export interface FsdDonor {
  firstName: any;
  lastName: any;
  address: any;
  emailAddress: any;
  contactNumber: any;
  bloodGroup: any;
}
export class FormModel {
  public model: any;
  private valid: Boolean = true;
  constructor(private required?: Boolean, private errorMsg?: string, private validationMsg?: string, private validator?: (model: any) => Boolean) {}
  getErrorMsg() {
    return this.errorMsg;
  }
  isRequired() {
    return !!this.required;
  }
  isValid(): Boolean {
    return this.valid;
  }
  validate() {
    if (this.model && this.validator) {
      this.valid = this.validator(this.model);
    }
    else {
      this.valid = true;
    }
  }
  getValidationMsg() {
    return this.validationMsg;
  }

}
export class Regex {
  public email: RegExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  public contact: RegExp = /\+\d\d \d\d\d \d\d\d\d \d\d\d|00\d\d \d\d\d \d\d\d\d \d\d\d/;
}