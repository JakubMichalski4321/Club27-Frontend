import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from 'src/app/models/dialogs/confirm-dialog/confirm-dialog.component';
import { NavBarService } from 'src/app/services/comp/nav-bar.service';
import { BearerTokenService } from 'src/app/services/user/bearer-token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  showMobileNevBar = false;
  christmasMode = false;
  fireworksMode = false;

  constructor(
    private tokenService: BearerTokenService,
    private navBarService: NavBarService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  getUsername(): string{
    return this.tokenService.getUsername();
  }

  logOut(): void {
    const ngbModalRef: NgbModalRef = this.modal.open(ConfirmDialogComponent, {
      size: 'lg'
    });
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).headerText = 'Uwaga! :oo';
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).contentText = 'Czy na pewno chcesz się wylogować?';
    //(<ConfirmDialogComponent>ngbModalRef.componentInstance).contentText = 'Czy jesteś pewien, że chcesz usunąć to konto?';
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).confirmYes = 'Znajdźcie sobie dziewczyne';
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).confirmNo = 'Nie chcę';
    (<ConfirmDialogComponent>ngbModalRef.componentInstance).outData.subscribe(
      (confirm) => {
        if (confirm) {
          this.tokenService.logOut();
          this.navBarService.hide();
          window.location.reload();
        }
      }
    );
  }

}
