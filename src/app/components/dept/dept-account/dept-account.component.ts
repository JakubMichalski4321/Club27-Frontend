import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from 'src/app/models/dialogs/confirm-dialog/confirm-dialog.component';
import { IDeptAccount } from 'src/app/models/IDeptAccount';
import { BearerTokenService } from 'src/app/services/bearer-token.service';
import { HttpService } from 'src/app/services/http.service';
import { AddStatementComponent } from './add-statement/add-statement.component';

@Component({
  selector: 'app-dept-account',
  templateUrl: './dept-account.component.html',
  styleUrls: ['./dept-account.component.css'],
})
export class DeptAccountComponent implements OnInit {
  private sub: any;
  accountId: string;
  accountData?: IDeptAccount;
  accountUsersNames: string[];
  thisUserId: string;
  thisUserBalance: number;
  deleteMessage: string;
  zero = 0.00;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private bearerTokenService: BearerTokenService
  ) {}

  ngOnInit(): void {
    this.initData();
    this.sub = this.route.params.subscribe((params) => {
      this.accountId = params['accountId'];
    });
    this.getAccountData();
    this.thisUserId = this.bearerTokenService.getUserId();
  }

  private initData() {
    this.accountData = {
      id: '',
      createdDate: '',
      balance: 0,
      deptAccountName: '',
      userAccounts: [
        { id: '', name: '' },
        { id: '', name: '' },
      ],
      statements: [],
    };
  }

  openAddStatement(): void {
    const modalRef = this.modal.open(AddStatementComponent);
    (<AddStatementComponent>modalRef.componentInstance).deptAccountId =
      this.accountId;
    (<AddStatementComponent>modalRef.componentInstance).deptAccountUsers =
      this.accountData.userAccounts;
  }

  calculateThisUserBalance(): number {
    let sum = 0.0;
    this.accountData.statements.forEach((s) => {
      if (s.deptUserId !== this.thisUserId) {
        sum += s.amount;
      } else {
        sum -= s.amount;
      }
    });
    return sum;
  }

  toTwoDecimalNumber(number: number): string {
    return (Math.round(number * 100) / 100).toFixed(2);
  }

  openConfirmDeleteModal(): void {
    const ngbModalRef: NgbModalRef = this.modal.open(ConfirmDialogComponent, {
      size: 'lg'
    });
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).headerText = 'Uwaga! :oo';
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).contentText = 'Ta opcja jeszcze nic nie robi XDDDD';
    //(<ConfirmDialogComponent>ngbModalRef.componentInstance).contentText = 'Czy jesteś pewien, że chcesz usunąć to konto?';
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).confirmYes = 'hahcha, niszczarka robi brrbrr xD';
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).confirmNo = 'O Jezusie nie :0';
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).outData.subscribe(
      (confirm) => {
        if (confirm) {
          //this.deleteThisAccount();
        }
      }
    );
  }

  openInformationModal(message: string): void {
    const ngbModalRef: NgbModalRef = this.modal.open(ConfirmDialogComponent, {
      size: 'lg'
    });
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).headerText = 'Info';
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).contentText = '';
  }

  private deleteThisAccount(): void {
    this.httpService.deleteDeptAccount(this.accountId).subscribe((response) => {
      this.deleteMessage = response;
      this.openInformationModal(response);
    });
  }

  private getAccountData(): void {
    this.httpService
      .getDeptAccountDetailsById(this.accountId)
      .subscribe((response) => {
        this.accountData = response;
      });
  }
}
