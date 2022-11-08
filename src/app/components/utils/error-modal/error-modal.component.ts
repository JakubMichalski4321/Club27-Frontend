import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalService } from 'src/app/services/error-modal.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {

  constructor(private modalService: NgbModal, private errors: ErrorModalService) { }

  @ViewChild('content') modal: TemplateRef<any>;

  message: string;

  ngOnInit(): void {
    this.errors.getErrorUpdates()
      .subscribe(message => {
        this.message = message;
        this.open();
      });
  }

  open() {
    this.modalService.open(this.modal, {ariaLabelledBy: 'modal-basic-title'});
  }

}
