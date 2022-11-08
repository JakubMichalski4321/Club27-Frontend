import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeptUser } from 'src/app/models/components/dept/IDeptUser';
import { DeptService } from 'src/app/services/comp/dept.service';
import { BearerTokenService } from 'src/app/services/user/bearer-token.service';


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
  @Output()
  outData: EventEmitter<any> = new EventEmitter();


  constructor(
    public activeModal: NgbActiveModal,
    private deptService: DeptService,
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
    this.deptService.createNewAccount(
      this.accountName,
      this.bearerTokenService.getUserId(),
      this.choosenUsersIdList
    );
    this.outData.emit(true);
  }

  private getDeptUsersList() {
    this.deptService.getDeptUsersList().subscribe(
      (data) => {
        this.deptUsers = data;
        this.deptUsers = this.deptUsers.filter(user => user.id !== this.bearerTokenService.getUserId());
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
