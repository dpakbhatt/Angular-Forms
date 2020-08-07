import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  topicHasError = true;
  submitted = false;
  errorMsg = '';
  topics = ["Angular", "React", "Vue"];
  userModel = new User("Deepak", "drt@gmail.com", 1234567892, "default", "morning", true);

  constructor(private _enrollmentService: EnrollmentService) {}

  hasError(value){
    if(value === "default"){
      this.topicHasError = true;
    }else {
      this.topicHasError = false;
    }
  }

  onSubmit(userForm){
    //console.log(userForm);
    this.submitted = true;
    this._enrollmentService.enroll(this.userModel)
      .subscribe(
        data => console.log("Success!", data),
        error => this.errorMsg = error.statusText
      )
  }
}
