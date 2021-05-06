import { Component, OnInit } from '@angular/core';
import { IMem } from '../../models/IMem';
import { HttpService } from '../../services/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddMemeComponent} from './add-meme/add-meme.component';
import {UploadMemeComment} from '../../models/uploadModels/UploadMemeComment';
import {Like} from '../../models/Like';


@Component({
  selector: 'app-memy',
  templateUrl: './memy.component.html',
  styleUrls: ['./memy.component.css']
})
export class MemyComponent implements OnInit {

  pathToDir = 'assets/memeImages/';
  memyList?: Array<IMem> = [];
  currentPageDisplay = 1;
  memeCommentAuthor: any;
  memeCommentContent: any;
  displaySend = false;
  memeLikesGiven?: Array<Like> = [];


  constructor(private httpService: HttpService, private sanitizer: DomSanitizer, private modal: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllMemy();
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
    this.modal.open(AddMemeComponent);
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

  private getAllMemy() {
    this.httpService.getAllMemyList().subscribe(data => {
      console.log(data);
      this.memyList = data;
      this.getMemesComments();
    }, error => {
      console.log(error);
    });
  }

  private getMemesComments() {
    for (let mem of this.memyList) {
      this.httpService.getMemeComments(mem.id).subscribe(data => {
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
    this.httpService.addLikeToMeme(id);
    localStorage.setItem(id, "");
    this.getMemeLikesGivenFromSession();
  }

  submitComment(mem: IMem) {
    let commentToSubmit: UploadMemeComment = new UploadMemeComment(this.memeCommentContent, this.memeCommentAuthor, mem.id);
    this.httpService.submitMemeComment(commentToSubmit);
    this.displaySend = true;
  }
}
