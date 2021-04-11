import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../../../services/http.service';

@Component({
  selector: 'app-add-soundboard',
  templateUrl: './add-soundboard.component.html',
  styleUrls: ['./add-soundboard.component.css']
})
export class AddSoundboardComponent implements OnInit {

  file: File = null;
  title: any;
  typeOfWhoIsArray: any;


  constructor(public activeModal: NgbActiveModal, private httpService: HttpService) { }

  ngOnInit(): void {
    this.typeOfWhoIsArray = this.getTypeOfWhoIsArray();
  }

  everythingIsOk() {
    return this.file != null;
  }

  onFileSelected(event) {
    this.file = <File>event.target.files[0];
  }


  //services

  private getTypeOfWhoIsArray() {
    return this.httpService.getSoundboardWhoIsList();
  }

  sendSoundboardFile() {

  }

  sendSoundboard() {

  }
}
