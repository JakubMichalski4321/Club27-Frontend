import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { AddDeptComponent } from './add-dept/add-dept.component';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css'],
})
export class DeptComponent implements OnInit {
  showLogin = false;

  constructor(
    private navBarService: NavBarService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.openCreatAccount();
    if(!this.isLoggedIn) {
      this.delay(2700);
    }
  }

  isLoggedIn(): boolean {
    return this.navBarService.isLoggedIn();
  }

  openCreatAccount(): void {
    this.modal.open(AddDeptComponent);
  }

  private delay(ms: number) {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.showLogin = true;
      }, ms)
    );
  }
}
