import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingDialogComponent } from 'src/app/models/dialogs/loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-add-meme',
  templateUrl: './add-meme.component.html',
  styleUrls: ['./add-meme.component.css']
})
export class AddMemeComponent implements OnInit {

  title: string;
  author: string;
  imagePathUrl: string;
  memeLikes: string;
  file: File = null;
  warmingMessage = '';
  showFileInput = true;
  @Output() memeUploaded: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.file = <File>event.target.files[0];
  }

  everythingIsOk(): boolean {
    if (this.title == '' || this.title == null) return false;
    if (this.author == '' || this.author == null) return false;
    if ((this.imagePathUrl == '' || this.imagePathUrl == null) && (!this.showFileInput)) return false;
    if ((this.file == null) && (this.showFileInput)) return false;
    return true;
  }

  decideAndSubmitMemeImageOrUrl() {
    const modalRef = this.modal.open(LoadingDialogComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    (<LoadingDialogComponent>modalRef.componentInstance).showFileInput = this.showFileInput;
    (<LoadingDialogComponent>modalRef.componentInstance).file = this.file;
    (<LoadingDialogComponent>modalRef.componentInstance).title = this.title;
    (<LoadingDialogComponent>modalRef.componentInstance).author = this.author;
    (<LoadingDialogComponent>modalRef.componentInstance).imagePathUrl = this.imagePathUrl;
    (<LoadingDialogComponent>modalRef.componentInstance).fileUploadFinish.subscribe(
      (uploaded) => {
        if (uploaded) {
          this.memeUploaded.emit(true);
          modalRef.close();
        }
      }
    );
  }

}
