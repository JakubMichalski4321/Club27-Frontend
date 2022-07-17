import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeptAccount } from 'src/app/models/IDeptAccount';
import { BearerTokenService } from 'src/app/services/bearer-token.service';
import { HttpService } from 'src/app/services/http.service';
import { AddStatementComponent } from './add-statement/add-statement.component';

@Component({
  selector: 'app-dept-account',
  templateUrl: './dept-account.component.html',
  styleUrls: ['./dept-account.component.css']
})
export class DeptAccountComponent implements OnInit {

  private sub: any;
  accountId: string;
  accountData?: IDeptAccount;
  accountUsersNames: string[];
  thisUserId: string;
  thisUserBalance: number;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private bearerTokenService: BearerTokenService,
  ) { }

  ngOnInit(): void {
    this.initData();
    this.sub = this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });
    this.getAccountData();
    this.thisUserId = this.bearerTokenService.getUserId();
    this.thisUserBalance = this.calculateThisUserBalance();
  }

  private initData() {
    this.accountData = {
      id: '',
      createdDate: '',
      balance: 0,
      deptAccountName: '',
      userAccounts: [{id: '', name: ''}, {id: '', name: ''}],
      statements: []
    }
  }

  openAddStatement(): void {
    const modalRef = this.modal.open(AddStatementComponent);
    (<AddStatementComponent>modalRef.componentInstance).deptAccountId = this.accountId;
    (<AddStatementComponent>modalRef.componentInstance).deptAccountUsers = this.accountData.userAccounts;
  }

  calculateThisUserBalance(): number {
    let sum = 0.00;
    this.accountData.statements.forEach(s => {
      if(s.deptUserId !== this.thisUserId) {
        sum+=s.amount;
      } else {
        sum-=s.amount;
      }
    });
    return sum;
  }

  toTwoDecimalNumber(number: number): string {
    return (Math.round(number * 100) / 100).toFixed(2);
  }

  private getAccountData(): void {
    this.httpService.getDeptAccountDetailsById(this.accountId).subscribe( response => {
      this.accountData = response;
    })
  }

}
