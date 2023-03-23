import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MemeService } from 'src/app/services/comp/meme.service';
import { UploadMem } from '../../components/meme/UploadMem';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.css']
})
export class LoadingDialogComponent implements OnInit {

  file: any;
  showFileInput: boolean = false;
  title: string;
  author: string;
  imagePathUrl: string;
  @Output() fileUploadFinish: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private memeService: MemeService,
  ) { }

  ngOnInit(): void {
    this.uploadFile();
  }

  uploadFile(): void {
    let currentTime = new Date().getTime();;
    if (this.showFileInput) {
      this.memeService.submitMemeWithImage(this.createMemeObjectOwnImage(currentTime), this.file, currentTime).subscribe((resp: any) => {
        if (resp.value) {
          this.fileUploadFinish.emit(true);
        }
      });
    } else {
      this.memeService.submitMeme(this.createMemeObjectUrl()).subscribe((resp: any) => {
        if (resp.value) {
          this.fileUploadFinish.emit(true);
        }
      });
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

}
