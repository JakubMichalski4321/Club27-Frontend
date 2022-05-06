import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/LoginUser';
import { BearerTokenService } from 'src/app/services/bearer-token.service';
import { IJwtToken } from 'src/app/components/login/IJwtToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel = new LoginUser();
  showLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: BearerTokenService,
  ) { }

  ngOnInit(): void {
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

}
