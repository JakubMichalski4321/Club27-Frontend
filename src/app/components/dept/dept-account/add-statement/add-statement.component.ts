import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeptStatement } from 'src/app/models/components/dept/IDeptStatement';
import { IDeptUser } from 'src/app/models/components/dept/IDeptUser';
import { DeptService } from 'src/app/services/comp/dept.service';
import { BearerTokenService } from 'src/app/services/user/bearer-token.service';

@Component({
  selector: 'app-add-statement',
  templateUrl: './add-statement.component.html',
  styleUrls: ['./add-statement.component.css'],
})
export class AddStatementComponent implements OnInit {

  @Input() deptAccountId: string;
  @Input() deptAccountUsers: IDeptUser[];
  @Output() outData: EventEmitter<any> = new EventEmitter();

  accountStatement: IDeptStatement;
  iAmDept = true;

  title: string;
  amount: number;
  description: string;

  constructor(
    private deptService: DeptService,
    public activeModal: NgbActiveModal,
    private bearerTokenService: BearerTokenService
    ) {}

  ngOnInit(): void {
    this.accountStatement = this.initData();
  }

  initData(): IDeptStatement {
    return this.accountStatement = {
      amount: 10.00,
      title: '',
      description: '',
      createdDate: '',
      deptUserId: ''
    }
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

  private otherUserId(): string {
    return this.deptAccountUsers.map(user => user.id).filter(id => id !== this.getThisUserId())[0];
  }

  private getThisUserId(): string {
    return this.bearerTokenService.getUserId();
  }

  addNewStatement(): void {
    if(this.iAmDept) {
      this.deptService.addDeptStatement(this.accountStatement, this.deptAccountId, this.getThisUserId());
    } else {
      this.deptService.addDeptStatement(this.accountStatement, this.deptAccountId, this.otherUserId());
    }
    this.outData.emit(true);
  }
}
