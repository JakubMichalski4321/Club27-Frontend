import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UploadMem } from 'src/app/models/components/meme/UploadMem';
import { MemeService } from 'src/app/services/comp/meme.service';

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

  constructor(
    public activeModal: NgbActiveModal,
    private memeService: MemeService,
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.file = <File>event.target.files[0];
  }

  everythingIsOk(): boolean {
    if(this.title == '' || this.title == null) return false;
    if(this.author == '' || this.author == null) return false;
    if((this.imagePathUrl == '' || this.imagePathUrl == null) && (!this.showFileInput)) return false;
    if((this.file == null) && (this.showFileInput)) return false;
    return true;
  }

  decideAndSubmitMemeImageOrUrl() {
    let currentDate = new Date();
    let currentTime = currentDate.getTime();
    if(this.showFileInput == true){
      this.submitMemeImage(this.file, currentTime);
      this.submitMeme(this.createMemeObjectOwnImage(currentTime));
    }else {
      this.submitMeme(this.createMemeObjectUrl());
    }
  }

  private createMemeObjectUrl(): UploadMem {
    let memeToUpload = new UploadMem();
    memeToUpload.title = this.title;
    memeToUpload.author = this.author;
    memeToUpload.imagePath = this.imagePathUrl;
    return memeToUpload;
  }

  private createMemeObjectOwnImage(currentTime: number): UploadMem {
    let memeToUpload = new UploadMem();
    memeToUpload.title = this.title;
    memeToUpload.author = this.author;
    memeToUpload.imagePath = currentTime + '_' + this.file.name;
    return memeToUpload;
  }


  //Services

  private submitMeme(data: UploadMem) {
    this.memeService.submitMeme(data);
  }

  private submitMemeImage(file: File, currentTime: number) {
    this.memeService.submitMemeImage(file, currentTime);
  }
}
