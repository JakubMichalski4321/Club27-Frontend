import { Component, OnInit } from '@angular/core';
import { IJugo } from '../../models/components/jugo/IJugo';
import { DomSanitizer } from '@angular/platform-browser';
import { Like } from "../../models/components/meme/Like";
import { IJugoSafeUrl } from 'src/app/models/components/jugo/IJugoSafeUrl';
import { JugoService } from 'src/app/services/comp/jugo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddJugoComponent } from './add-jugo/add-jugo.component';
import { PageRequest } from 'src/app/models/common/PageRequest';
import { IJugoWithCounter } from 'src/app/models/components/jugo/IJugosWithCounter';

@Component({
  selector: 'app-jugo',
  templateUrl: './jugo.component.html',
  styleUrls: ['./jugo.component.css']
})
export class JugoComponent implements OnInit {

  allJugos?: Array<IJugoSafeUrl> = [];
  currentPageDisplay = 1;
  jugoLikesGiven?: Array<Like> = [];
  jugosWithCounter?: IJugoWithCounter;
  allJugosCounter?: number = 0;

  constructor(
    private jugoService: JugoService,
    private sanitizer: DomSanitizer,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getJugoList(1);
  }

  createJugoList(jugoList: IJugo[]) {
    let sanitizer = this.sanitizer;
    for (let i = 0; i < jugoList.length; i++) {
      this.allJugos.push(new class implements IJugoSafeUrl {
        id = jugoList[i].id;
        createdDate = jugoList[i].createdDate;
        title = jugoList[i].title;
        videoComment = jugoList[i].videoComment;
        videoLikes = jugoList[i].videoLikes;
        videoURL = sanitizer.bypassSecurityTrustResourceUrl(jugoList[i].videoURL);
      });
    }
  }

  makeArrayOfNumbers(iterations: number) {
    return Array(iterations.valueOf());
  }

  likeGiven(id: string): boolean {
    return localStorage.getItem(id) != null;
  }

  getJugoLikesGivenFromSession() {
    for (let jugo of this.allJugos) {
      if (localStorage.getItem(jugo.id) != null) {
        this.jugoLikesGiven.push(new Like(jugo.id, true));
      } else {
        this.jugoLikesGiven.push(new Like(jugo.id, false));
      }
    }
  }

  openAddJugo() {
    this.modal.open(AddJugoComponent);
  }


  //Services

  giveLikeToMeme(id: any) {
    this.jugoService.addLikeToJugo(id);
    localStorage.setItem(id, "");
    this.getJugoLikesGivenFromSession();
  }

  getJugoList(pageNumber: number) {
    const pageRequest: PageRequest = {
      pageNumber: pageNumber - 1,
      numberPerPage: 6,
    }
    this.jugoService.getAllJugoList(pageRequest).subscribe((data) => {
      this.allJugosCounter = data.counter;
      this.createJugoList(data.jugos);
    }, error => {
      console.log(error);
    });
  }

}
