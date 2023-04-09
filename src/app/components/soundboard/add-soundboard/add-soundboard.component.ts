import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingDialogComponent } from 'src/app/models/dialogs/loading-dialog/loading-dialog.component';
import { SoundboardService } from 'src/app/services/comp/soundboard.service';
import { UploadSoundboard } from '../../../models/components/soundboard/UploadSoundboard';

@Component({
  selector: 'app-add-soundboard',
  templateUrl: './add-soundboard.component.html',
  styleUrls: ['./add-soundboard.component.css']
})
export class AddSoundboardComponent implements OnInit {

  file: File = null;
  title: any;
  whoIs: any;
  tempName: any;


  constructor(
    public activeModal: NgbActiveModal,
    private soundboardService: SoundboardService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  everythingIsOk(): boolean {
    if(this.file == null) return false;
    return this.whoIs != null;
  }

  onFileSelected(event: any): void {
    this.file = <File>event.target.files[0];
    if (this.title == '' || this.title == null) {
      this.title = this.file.name.split('.')[0];
    }
  }

  //services
  sendSoundboardAndFile(): void {
    const modalRef = this.modal.open(LoadingDialogComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    let soundboardToUpload = this.makeSoundboard()
    this.soundboardService.submitSoundboard(soundboardToUpload).subscribe(() => {
      this.soundboardService.submitSoundboardSound(this.file, soundboardToUpload.pathToFile).subscribe(() => {
        modalRef.close();
        window.location.reload()
      });
    });
  }

  private makeSoundboard(): UploadSoundboard {
    let currentDate = new Date();
    let currentTimeNumber = currentDate.getTime();
    if (this.title == '' || this.title == null) {
      this.title = this.file.name.split('.')[0];
    }
    let pathToFile = currentTimeNumber + '_' + this.file.name;
    return new UploadSoundboard(this.title, pathToFile, this.whoIs);
  }

}
