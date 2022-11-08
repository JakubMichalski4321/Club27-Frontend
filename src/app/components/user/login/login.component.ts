import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/common/login/LoginUser';
import { BearerTokenService } from 'src/app/services/bearer-token.service';
import { IJwtToken } from 'src/app/components/user/login/IJwtToken';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  @Input() routeSite: string;

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
          this.tokenService.saveToken(resp.jwt);
          this.router.navigateByUrl(this.routeSite);
          this.showLoading = false;
        },
        (err) => {
          this.showLoading = false;
          this.someFun();
        }
      );
  }


  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 13) {
        this.login();
    }
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
      let letters = 'BCDEFGHIJAKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZBCDEFGHIJKLMNOPQRSTUVXYZBCDEFGHIJKLMNOPQRSTUVXYZBCDEFGHIJKLMNOPQRSTUVXYZBCDEFGHIJKLMNOPQRSTUVXYZ';
      // letters = 'xxxxK';
      let lettersArray = letters.split('');

      // Setting up the columns
      var fontSize = 10,
        columns = canvas.width / fontSize;

      //   columns = 1;

      // Setting up the drops
      var drops = [];
      for (var i = 0; i < columns; i++) {
        drops[i] = 1;
      }

      let fancyString = 'A   KAMIL ŻADZI   ';
      let fancyStringArray = fancyString.split('');

      var memory = [];
      for (var i = 0; i < columns; i++) {
          memory[i] = 0;
      }

      // Setting up the draw function
      function draw() {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          for (var i = 0; i < drops.length; i++) {
              ctx.fillStyle = '#0f0';
              if (memory[i] > 0) {
                  var text = fancyStringArray[memory[i]];
                  memory[i]++;
                  ctx.fillStyle = '#f00';
              } else {
                  var text = lettersArray[Math.floor(Math.random() * lettersArray.length)]; //losowa litera
              }

              if (text == fancyStringArray[0] && memory[i] == 0) {
                  memory[i]++;
                  ctx.fillStyle = '#f00';
              }
              if (memory[i] == fancyStringArray.length) {
                  memory[i] = 0;
              }

              // ctx.fillStyle = '#0f0';
              ctx.fillText(text, i * fontSize, drops[i] * fontSize);
              drops[i]++;

              if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                  drops[i] = 1;
              }
          }
      }

      // Loop the animation
      setInterval(draw, 33);


    //someFun();
  }

  removeCanvas(){
    this.badLogin = false;
    this.badLoginMessage = 'No złe hasło typie';
    const element = document.querySelector('canvas');
    element.remove();
  }
}
