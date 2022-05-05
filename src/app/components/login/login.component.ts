import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/LoginUser';
import { BearerTokenService } from 'src/app/services/bearer-token.service';

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

  login(username: string, password: string): void{
    this.showLoading = true;
    this.http.post<HttpResponse<any>>("/user/login", this.userModel, {observe: 'response'})
    .subscribe(resp => {
      let headers = resp.headers;
      let token = headers.get("Authorization");
      this.tokenService.saveToken(token);
      // this.idService.fetchId();
      this.router.navigateByUrl("pajacyzmy");
      this.showLoading = false;
    },
    err => {
      this.showLoading = false;
    })
  }

}
