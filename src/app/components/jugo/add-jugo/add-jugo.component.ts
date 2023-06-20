import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubmitJugo } from 'src/app/models/components/jugo/UploadJugo';
import { LoadingDialogComponent } from 'src/app/models/dialogs/loading-dialog/loading-dialog.component';
import { JugoService } from 'src/app/services/comp/jugo.service';

@Component({
  selector: 'app-add-jugo',
  templateUrl: './add-jugo.component.html',
  styleUrls: ['./add-jugo.component.css']
})
export class AddJugoComponent implements OnInit {

  title: string;
  videoUrl: string;

  constructor(
    public activeModal: NgbActiveModal,
    private jugoService: JugoService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  everythingIsOk(): boolean {
    if (this.title && this.videoUrl) {
      return true;
    }
    return false;
  }

  //services
  submitJugo(): void {
    const modalRef = this.modal.open(LoadingDialogComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    this.jugoService.submitJugo(this.makeJugo()).subscribe(() => {
        modalRef.close();
        window.location.reload()
    });
  }

  private makeJugo(): SubmitJugo {
    let jugo: SubmitJugo = {
      title: this.title,
      videoURL: this.videoUrl,
    };
    console.log(jugo);
    return jugo;
  }
}
