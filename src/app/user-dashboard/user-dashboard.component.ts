import { Component } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { UserModel } from './user-dashboard.model';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  formValue !: FormGroup;
  userModelObj : UserModel = new UserModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  userData !: any;
  options_role = [
    { name: "Admin", value: 1 },
    { name: "User", value: 2 }
  ];
  constructor(private formBuilder: FormBuilder, private api : ApiService) {}

  ngOnInit(): void {
     this.formValue = this.formBuilder.group({
        fullName : [''],
        email : [''],
        phoneNumber: [''],
        role: [1],
     })
     this.getAllUser();
  }

  clickAdd() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postUserDetails() {
    this.userModelObj.fullName = this.formValue.value.fullName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.userModelObj.role = this.formValue.value.role;

    this.api.postUser(this.userModelObj).subscribe(res => {
      console.log(res);
      alert("User added Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    },
    err => {
      alert("Something went wrong");
    })
  }

  getAllUser() {
    this.api.getUser().subscribe(res => {
      this.userData = res;
    })
  }
  deleteUser(id : number) {
    this.api.deleteUser(id).subscribe (res => {
      alert('Deleted successfully');
      this.getAllUser();
    })
  }

  onEdit(row : any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;
    this.formValue.controls['fullName'].setValue(row.fullName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
    this.formValue.controls['role'].setValue(row.role);
  }

  editUserDetails() {
    this.userModelObj.fullName = this.formValue.value.fullName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.userModelObj.role = this.formValue.value.role;

    this.api.updateUser(this.userModelObj,this.userModelObj.id).subscribe(res => {
      console.log(res);
      alert("Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    },
    err => {
      alert("Something went wrong");
    })
  }
}
