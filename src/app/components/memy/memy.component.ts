import { Component, OnInit } from '@angular/core';
import { IMeme } from '../../models/components/meme/IMeme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMemeComponent } from './add-meme/add-meme.component';
import { UploadMemeComment } from '../../models/components/meme/UploadMemeComment';
import { Like } from '../../models/components/meme/Like';
import { PageRequest } from 'src/app/models/common/PageRequest';
import { IMemesWithCounter } from 'src/app/models/components/meme/IMemesWithCounter';
import { MemeService } from 'src/app/services/comp/meme.service';


@Component({
  selector: 'app-memy',
  templateUrl: './memy.component.html',
  styleUrls: ['./memy.component.css']
})
export class MemyComponent implements OnInit {

  pathToDir = 'assets/memeImages/';
  memesListWithCounter?: IMemesWithCounter;
  memyList?: Array<IMeme> = [];
  memesNumber?: number;
  currentPageDisplay = 1;
  memeCommentAuthor: any;
  memeCommentContent: any;
  displaySend = false;
  memeLikesGiven?: Array<Like> = [];
  pageRequest = new PageRequest();
  allMemesCounter = 0;
  mobileSize: boolean = false;


  constructor(
    private memeService: MemeService,
    private modal: NgbModal) {
    this.pageRequest.pageNumber = 1;
    this.pageRequest.numberPerPage = 10;
  }

  ngOnInit(): void {
    this.mobileSize = window.innerWidth <= 500;
    this.getAllMemy(1);
  }

  getMemeLikesGivenFromSession() {
    for(let meme of this.memyList){
      if(localStorage.getItem(meme.id) != null){
        this.memeLikesGiven.push(new Like(meme.id, true));
      }else {
        this.memeLikesGiven.push(new Like(meme.id, false));
      }
    }
  }

  onClick() {
    const modalRef = this.modal.open(AddMemeComponent);
    (<AddMemeComponent>modalRef.componentInstance).memeUploaded.subscribe((uploaded) => {
      if (uploaded) {
        modalRef.close();
        this.ngOnInit();
      }
    });
  }

  makeArrayOfNumbers(iterations: number) {
    return Array(iterations.valueOf());
  }

  allFieldsNotEmpty(): boolean {
    return ((this.memeCommentAuthor != '' && this.memeCommentAuthor != null) && (this.memeCommentContent != '' && this.memeCommentContent != null));
  }

  checkIfUrl(imagePath: string): string {
    if (imagePath) {
      if (imagePath.slice(0, 4) === 'http') {
        return imagePath;
      } else {
        return this.pathToDir + imagePath;
      }
    }
    return '';
  }

  likeGiven(id: string):boolean {
    return localStorage.getItem(id) != null;
  }


  //Services

  getAllMemy(pageNumber: number) {
    this.pageRequest.pageNumber = pageNumber - 1;
    this.memeService.getAllMemesList(this.pageRequest).subscribe(data => {
      this.memesListWithCounter = data;
      this.memyList = this.memesListWithCounter.memes;
      this.allMemesCounter = this.memesListWithCounter.counter;
      this.getMemeLikesGivenFromSession();
    }, error => {
      console.log(error);
    });
  }

  giveLikeToMeme(id: string) {
    this.memeService.addLikeToMeme(id);
    localStorage.setItem(id, "");
    this.getMemeLikesGivenFromSession();
  }

  submitComment(mem: IMeme) {
    let commentToSubmit: UploadMemeComment = new UploadMemeComment(this.memeCommentContent, this.memeCommentAuthor, mem.id);
    this.memeService.submitMemeComment(commentToSubmit);
    this.displaySend = true;
  }
}
