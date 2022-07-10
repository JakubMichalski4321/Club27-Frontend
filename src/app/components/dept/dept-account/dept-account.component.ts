import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dept-account',
  templateUrl: './dept-account.component.html',
  styleUrls: ['./dept-account.component.css']
})
export class DeptAccountComponent implements OnInit {

  private sub: any;
  accountId: string;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });
    console.log(this.accountId);
  }

}
