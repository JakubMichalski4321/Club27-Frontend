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
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userModel = new LoginUser();
  showLoading = false;
  captchaTrue = true;
  badLogin: any;
  badLoginMessage = '';

  protected aFormGroup: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: BearerTokenService,
    private navBarService: NavBarService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.aFormGroup = this.formBuilder.group({
    //   recaptcha: ['', Validators.required]
    // });
  }

  login(): void {
    this.showLoading = true;
    this.http.post<IJwtToken>('user/login', this.userModel).subscribe(
        (resp) => {
          console.log(resp);
          this.tokenService.saveToken(resp.jwt);
          this.router.navigateByUrl('pajacyzmy');
          this.showLoading = false;
        },
        (err) => {
          console.log(err);
          this.showLoading = false;
          this.someFun();
        }
      );
  }

  goToRagister(): void {
    this.router.navigate(['register']);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(() => {}, ms) );
  }

  someFun(): void {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1000;
    canvas.style.left = "-25%";
    canvas.style.top = "-150px";
    canvas.style.position = "absolute";

    // Setting up the letters
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
    let lettersArray = letters.split('');

    // Setting up the columns
    var fontSize = 10,
      columns = canvas.width / fontSize;

    // Setting up the drops
    var drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Setting up the draw function
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < drops.length; i++) {
        var text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
        ctx.fillStyle = '#0f0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }

    // Loop the animation
    setInterval(draw, 33);
  }

  removeCanvas(){
    this.badLogin = false;
    this.badLoginMessage = 'No złe hasło typie';
    const element = document.querySelector('canvas');
    element.remove();
  }
}
