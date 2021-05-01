import { Component, OnInit } from '@angular/core';
import { IMem } from '../../models/IMem';
import { HttpService } from '../../services/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddMemeComponent} from './add-meme/add-meme.component';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {UploadMem} from '../../models/uploadModels/UploadMem';
import {IMemeComment} from '../../models/IMemeComment';
import {UploadMemeComment} from '../../models/uploadModels/UploadMemeComment';

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

  constructor(private httpService: HttpService, private sanitizer: DomSanitizer, private modal: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllMemy();
    this.memyList.sort((mem1, mem2) =>
      (mem1.createdDate > mem2.createdDate) ? 1 : ((mem2.createdDate > mem1.createdDate) ? -1 : 0
      ));
  }

  getAllMemy() {
    this.httpService.getAllMemyList().subscribe(data => {
      console.log(data);
      this.memyList = data;
      this.getMemesComments();
    }, error => {
      console.log(error);
    });
  }

  onClick() {
    this.modal.open(AddMemeComponent);
  }

  makeArrayOfNumbers(iterations: string) {
    return Array(iterations.valueOf());
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

  submitComment(id: string) {
    let commentToSubmit: UploadMemeComment = new UploadMemeComment(this.memeCommentContent, this.memeCommentAuthor, id);
    this.httpService.submitMemeComment(commentToSubmit);
  }
}
