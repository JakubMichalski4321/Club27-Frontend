import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UploadMem} from '../../../../models/uploadModels/UploadMem';
import {HttpService} from '../../../../services/http.service';

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

  constructor(public activeModal: NgbActiveModal, private httpService: HttpService) { }

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

  decideAndSubmitMemeImageOrUrl() {
    if(this.showFileInput == true){
      this.submitMemeWithImage(this.createMemeObjectWithImage())
    }else {
      this.submitMemeWithUrl(this.createMemeObjectWithUrl())
    }
  }

  private createMemeObjectWithImage(): UploadMem {
    let memeToUpload = new UploadMem();
    memeToUpload.title = this.title;
    memeToUpload.author = this.author;
    memeToUpload.imagePath = this.file;
    return memeToUpload;
  }

  private createMemeObjectWithUrl(): UploadMem {
    let memeToUpload = new UploadMem();
    memeToUpload.title = this.title;
    memeToUpload.author = this.author;
    memeToUpload.imagePath = this.imagePathUrl;
    return memeToUpload;
  }

  //Services

  private submitMemeWithImage(data: UploadMem) {
    this.httpService.submitMemeWithImage(data)
  }

  private submitMemeWithUrl(data: UploadMem) {
    this.httpService.submitMemeWithUrl(data)
  }
}
