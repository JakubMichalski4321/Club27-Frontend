import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UploadMem} from '../../../../models/uploadModels/UploadMem';

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
  file: any;
  warmingMessage = '';
  showFileInput = true;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  everythingIsOk(): boolean {
    let temp = true;
    if(this.title == '' || this.title == null) temp = false;
    if(this.author == '' || this.author == null) temp = false;
    if(this.imagePathUrl == '' || this.imagePathUrl == null) temp = false;
    return temp;
  }

  private createMemeObject(): UploadMem {
    let memeToUpload = new UploadMem();
    memeToUpload.title = this.title;
    memeToUpload.author = this.author;
    memeToUpload.imagePath = this.imagePathUrl;
    return memeToUpload;
  }

  submitMeme() {
    let memeToUpload = this.createMemeObject();
  }
}
