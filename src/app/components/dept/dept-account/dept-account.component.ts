import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeptAccount } from 'src/app/models/IDeptAccount';
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

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });
    this.accountData = this.initData();
    this.getAccountData();
    this.openAddStatement();
  }

  initData() {
    return this.accountData = {
      id: '',
      balance: 0,
      deptAccountName: '',
      userAccounts: [],
      statements: []
    }
  }

  openAddStatement(): void {
    const modalRef = this.modal.open(AddStatementComponent);
    (<AddStatementComponent>modalRef.componentInstance).deptAccountId = this.accountId;
    (<AddStatementComponent>modalRef.componentInstance).deptAccountUsers = this.accountData.userAccounts;
    (<AddStatementComponent>modalRef.componentInstance).deptAccountId = this.accountId;
  }

  private getAccountData() {
    this.httpService.getDeptAccountDetailsById(this.accountId).subscribe( response => {
      this.accountData = response;
    })
  }

}
