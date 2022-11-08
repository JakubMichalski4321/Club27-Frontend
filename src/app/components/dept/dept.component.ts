import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeptDto } from 'src/app/models/components/dept/IDeptDto';
import { BearerTokenService } from 'src/app/services/bearer-token.service';
import { HttpService } from 'src/app/services/http.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { AddDeptComponent } from './add-dept/add-dept.component';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css'],
})
export class DeptComponent implements OnInit {
  showLogin = false;
  userDeptAccounts?: Array<IDeptDto> = [];

  constructor(
    private navBarService: NavBarService,
    private modal: NgbModal,
    private httpService: HttpService,
    private bearerTokenService: BearerTokenService
  ) {}

  ngOnInit(): void {
    if(!this.isLoggedIn()) {
      this.delay(2700);
    } else {
      this.getUserDeptAccountsList();
    }
  }

  isLoggedIn(): boolean {
    return this.navBarService.isLoggedIn();
  }

  openCreatAccount(): void {
    const modalRef = this.modal.open(AddDeptComponent);
    (<AddDeptComponent>modalRef.componentInstance).outData.subscribe(
      (added) => {
        if (added) {
          this.getUserDeptAccountsList();
        }
      }
    );
  }

  private delay(ms: number) {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.showLogin = true;
      }, ms)
    );
  }

  private getUserDeptAccountsList() {
    if(!this.isLoggedIn()) {
      return;
    }
      this.httpService.getDeptAccountByUserId(
        this.bearerTokenService.getUserId()
      ).subscribe(
        (data) => {
          this.userDeptAccounts = data;
        },
        (error) => {
          console.log(error);
        }
      );

  }
}
