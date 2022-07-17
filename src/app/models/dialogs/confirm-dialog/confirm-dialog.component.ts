import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  headerText: string;
  contentText: string;
  item: any;
  confirmYes: string;
  confirmNo: string;
  @Output() outData: EventEmitter<any> = new EventEmitter();

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
      this.outData.emit(true);
      this.activeModal.close();
  }

}
