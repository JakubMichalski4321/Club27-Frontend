import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../../services/http.service';
import {UploadSoundboard} from '../../../models/uploadModels/UploadSoundboard';

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


  constructor(public activeModal: NgbActiveModal, private httpService: HttpService) { }

  ngOnInit(): void {
  }

  everythingIsOk() {
    if(this.file == null) return false;
    return this.whoIs != null;
  }

  onFileSelected(event) {
    this.file = <File>event.target.files[0];
  }

  private makeSoundboard(){
    let currentDate = new Date();
    let currentTimeNumber = currentDate.getTime();
    if(this.title == '' || this.title == null) {
      this.title = this.file.name.split('.')[0];
    }
    let pathToFile = currentTimeNumber + '_' + this.file.name;
    return new UploadSoundboard(this.title, pathToFile ,this.whoIs);
  }

  sendSoundboardAndFile() {
    let soundboardToUpload = this.makeSoundboard()
    this.tempName = soundboardToUpload.pathToFile;
    this.sendSoundboard(soundboardToUpload);
    this.sendSoundboardFile(soundboardToUpload.pathToFile);
  }

  //services

  sendSoundboardFile(pathToFile: any) {
    this.httpService.submitSoundboardSound(this.file, pathToFile);
  }

  sendSoundboard(soundboardToUpload: UploadSoundboard) {
    this.httpService.submitSoundboard(soundboardToUpload);
  }

}
