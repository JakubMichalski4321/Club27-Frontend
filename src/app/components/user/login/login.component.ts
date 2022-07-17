import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/LoginUser';
import { BearerTokenService } from 'src/app/services/bearer-token.service';
import { IJwtToken } from 'src/app/components/user/login/IJwtToken';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel = new LoginUser();
  showLoading = false;
  captchaTrue = true;

  protected aFormGroup: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: BearerTokenService,
    private navBarService: NavBarService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.aFormGroup = this.formBuilder.group({
    //   recaptcha: ['', Validators.required]
    // });
  }

  login(): void{
    this.showLoading = true;
    this.http.post<IJwtToken>("user/login", this.userModel, {observe: 'response'})
    .subscribe(resp => {
      this.tokenService.saveToken(resp.body.jwt);
      this.router.navigateByUrl("pajacyzmy");
      this.showLoading = false;
    },
    err => {
      this.showLoading = false;
    })
  }

  goToRagister(): void{
    this.router.navigate(['register']);
  }

}
