import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeptUser } from 'src/app/models/IDeptUser';
import { BearerTokenService } from 'src/app/services/bearer-token.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-add-dept',
  templateUrl: './add-dept.component.html',
  styleUrls: ['./add-dept.component.css'],
})
export class AddDeptComponent implements OnInit {
  deptUsers?: Array<IDeptUser> = [];
  choosenUsersIdList: string[] = [];
  secoundUserId: string;
  warmingMessage = '';
  accountName = '';

  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HttpService,
    private bearerTokenService: BearerTokenService
  ) {}

  ngOnInit(): void {
    this.getDeptUsersList();
  }

  everythingIsOk(): boolean {
    if (this.accountName != '' && this.secoundUserId) {
      return true;
    }
    return false;
  }

  createNewAccount() {
    this.choosenUsersIdList.push(this.secoundUserId);
    return this.httpService.createNewAccount(
      this.accountName,
      this.bearerTokenService.getUserId(),
      this.choosenUsersIdList
    );
  }

  getDeptUsersList() {
    this.httpService.getDeptUsersList().subscribe(
      (data) => {
        this.deptUsers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
