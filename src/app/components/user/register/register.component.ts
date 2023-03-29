import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/common/login/LoginUser';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModel = new LoginUser();
  showLoading = false;
  showFirstPassRepeat = false;
  showSecoundPassRepeat = false;

  firstPassRepeat = null;
  secoundPassReapat = null;

  showPass1And2NotEqual = false;
  showPass2And3NotEqual = false;
  errorMessage: string;

  mobileSize: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.mobileSize = window.innerWidth <= 500;
  }

  checkEverything(): boolean{
    if(this.firstPassRepeat !== this.userModel.password)
    this.showPass1And2NotEqual = true;
    else this.showPass1And2NotEqual = false;
    if(this.secoundPassReapat !== this.firstPassRepeat)
    this.showPass2And3NotEqual = true;
    else this.showPass2And3NotEqual = false;

    if(
      this.userModel.username != null
      && this.userModel.username !== ''
      && this.userModel.password != null
      && this.userModel.password !== ''
      && !this.showPass1And2NotEqual
      && !this.showPass2And3NotEqual)
        return true;
      return false;
  }

  register(): void{
    this.showLoading = true;
    this.http.post<HttpResponse<any>>("user/register-user", this.userModel, {observe: 'response'})
    .subscribe(resp => {
      this.showLoading = false;
      this.router.navigate(['dept']);
    },
    error => {
      console.log(error);
      this.showLoading = false;
      this.errorMessage = 'Nazwa zajęta... albo jakiś inny bład nw nie chciało mi się już xD';
    })
  }

}
