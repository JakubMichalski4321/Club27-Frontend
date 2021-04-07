import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-meme',
  templateUrl: './add-meme.component.html',
  styleUrls: ['./add-meme.component.css']
})
export class AddMemeComponent implements OnInit {

  title: string;
  author: string;
  imagePath: string;
  memeLikes: string;
  file: any;
  warmingMessage = '';
  displayReason = false;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  submitMeme() {

  }

  everythingIsOk() {
    let temp = true;
    if(this.title == '' || this.title == null) temp = false;
    if(this.author == '' || this.author == null) temp = false;
    if(this.imagePath == '' || this.imagePath == null) temp = false;
    return temp;
  }

}
