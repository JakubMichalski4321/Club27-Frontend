import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeptAccount } from 'src/app/models/IDeptAccount';
import { IDeptStatement } from 'src/app/models/IDeptStatement';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-statement',
  templateUrl: './add-statement.component.html',
  styleUrls: ['./add-statement.component.css'],
})
export class AddStatementComponent implements OnInit {
  @Input()
  deptAccountId: string;
  @Input()
  deptAccountUsers: IDeptAccount[];

  accountStatement: IDeptStatement;
  iAmDept = true;

  constructor(
    private httpService: HttpService,
    public activeModal: NgbActiveModal
    ) {}

  ngOnInit(): void {
    this.accountStatement = this.initData();
  }

  initData(): IDeptStatement {
    return this.accountStatement = {
      amount: 10.00,
      title: '',
      description: ''
    }
  }

  show(){
    console.log(this.deptAccountUsers);
  }

  everythingIsOk(): boolean {
    if (
      this.accountStatement.amount == null ||
      this.accountStatement.amount === 0.0 ||
      this.accountStatement.title == null ||
      this.accountStatement.title == ''
    ) {
      return false;
    }
    return true;
  }

  addNewStatement(): void {
    this.httpService.addDeptStatement(this.accountStatement, this.deptAccountId, 'xD');
  }
}
