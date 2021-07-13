import { Component, OnInit } from '@angular/core';
import {IJugo} from '../../models/IJugo';
import {HttpService} from '../../services/http.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {IJugoSafeUrl} from "../../models/IJugoSafeUrl";

@Component({
  selector: 'app-jugo',
  templateUrl: './jugo.component.html',
  styleUrls: ['./jugo.component.css']
})
export class JugoComponent implements OnInit {

  allJugos?: Array<IJugoSafeUrl> = [];
  currentPageDisplay = 1;

  constructor(private httpService: HttpService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getJugoList();
  }

  createJugoList(jugoList: IJugo[]){
    let sanitizer = this.sanitizer;
    for(let i =0; i<jugoList.length; i++){
      this.allJugos.push(new class implements IJugoSafeUrl {
        createdDate = jugoList[i].createdDate;
        title = jugoList[i].title;
        videoComment = jugoList[i].videoComment;
        videoLikes = jugoList[i].videoLikes;
        videoURL = sanitizer.bypassSecurityTrustResourceUrl(jugoList[i].videoURL);
      });
    }
    console.log(this.allJugos)
  }

  makeArrayOfNumbers(iterations: number){
    return Array(iterations.valueOf());
  }

  getJugoList(){
    this.httpService.getAllJugoList().subscribe(data => {
      console.log(data);
      this.createJugoList(data);
    }, error => {
      console.log(error);
    });
  }

}
