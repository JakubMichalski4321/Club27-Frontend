import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  headerText: string;
  contentText: string;

  constructor(
    public activeModal: NgbActiveModal
    ) {
  }

  ngOnInit() {
  }

  closeModal() {
      this.activeModal.close();
  }

  deleteItem() {
      this.activeModal.close();
  }

}
