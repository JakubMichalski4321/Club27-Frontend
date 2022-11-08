import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMeme} from '../../../models/components/meme/IMeme';
import {ActivatedRoute} from '@angular/router';
import {UploadMemeComment} from '../../../models/components/meme/UploadMemeComment';
import { MemeService } from 'src/app/services/comp/meme.service';

@Component({
  selector: 'app-mem',
  templateUrl: './mem.component.html',
  styleUrls: ['./mem.component.css']
})
export class MemComponent implements OnInit, OnDestroy {

  mem: IMeme;
  memId: any;
  private sub: any;
  pathToDir = 'assets/memeImages/';
  displaySend = false;
  memeCommentContent: any;
  memeCommentAuthor: any;

  constructor(
    private route: ActivatedRoute,
    private memeService: MemeService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.memId = params['memId'];
    });
    this.getMem()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getMem(){
    this.memeService.getMeme(this.memId).subscribe(data => {
      this.mem = data;
      this.getMemeComments();
    }, error => {
      console.log(error);
    });
  }

  makeArrayOfNumbers(iterations: string){
    return Array(iterations.valueOf());
  }

  allFieldsNotEmpty() {
    return ((this.memeCommentAuthor != '' && this.memeCommentAuthor != null) && (this.memeCommentContent != '' && this.memeCommentContent != null));
  }

  submitComment(mem: IMeme) {
    let commentToSubmit: UploadMemeComment = new UploadMemeComment(this.memeCommentContent, this.memeCommentAuthor, mem.id);
    this.memeService.submitMemeComment(commentToSubmit);
    this.displaySend = true;
  }

  private getMemeComments() {
    this.memeService.getMemeComments(this.mem.id).subscribe(data => {
      this.mem.commentsList = data;
      this.mem.commentsList.sort((comment1, comment2) =>
        (comment1.createdDate > comment2.createdDate) ? 1 : ((comment2.createdDate > comment1.createdDate) ? -1 : 0)
      );
    }, error => {
      console.log(error);
    });
  }

  likeGiven(id: string):boolean {
    return localStorage.getItem(id) != null;
  }

  giveLikeToMeme(id: string) {
    this.memeService.addLikeToMeme(id);
    localStorage.setItem(id, "");
  }
}
