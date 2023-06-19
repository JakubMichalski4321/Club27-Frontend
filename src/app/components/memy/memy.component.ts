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
    this.memyList.sort((mem1, mem2) =>
      (mem1.createdDate > mem2.createdDate) ? 1 : ((mem2.createdDate > mem1.createdDate) ? -1 : 0
      ));
    this.getMemeLikesGivenFromSession();
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

  makeArrayOfNumbers(iterations: string) {
    return Array(iterations.valueOf());
  }

  allFieldsNotEmpty(): boolean {
    return ((this.memeCommentAuthor != '' && this.memeCommentAuthor != null) && (this.memeCommentContent != '' && this.memeCommentContent != null));
  }

  checkIfUrl(imagePath: string) {
    if(isNaN(Number(imagePath.substr(0, 4)))) {
      return imagePath;
    }else {
      return this.pathToDir + imagePath;
    }
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
      this.getMemesComments();
    }, error => {
      console.log(error);
    });
  }

  private getMemesComments() {
    for (let mem of this.memyList) {
      this.memeService.getMemeComments(mem.id).subscribe(data => {
        mem.commentsList = data;
        mem.commentsList.sort((comment1, comment2) =>
          (comment1.createdDate > comment2.createdDate) ? 1 : ((comment2.createdDate > comment1.createdDate) ? -1 : 0)
        );
      }, error => {
        console.log(error);
      });
    }
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
