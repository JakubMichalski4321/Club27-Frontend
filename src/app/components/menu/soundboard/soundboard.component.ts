import { Component, OnInit } from '@angular/core';
import {ISoundboard} from '../../../models/ISoundboard';
import {HttpService} from '../../../services/http.service';
import {AddMemeComponent} from '../memy/add-meme/add-meme.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddSoundboardComponent} from './add-soundboard/add-soundboard.component';

@Component({
  selector: 'app-soundboard',
  templateUrl: './soundboard.component.html',
  styleUrls: ['./soundboard.component.css']
})
export class SoundboardComponent implements OnInit {

  pathToDir = '../../../../../assets/';

  soundboardList?: Array<ISoundboard> = [];
  sebaList?: Array<ISoundboard> = [];
  jackobList?: Array<ISoundboard> = [];
  wojtusList?: Array<ISoundboard> = [];
  mlodyList?: Array<ISoundboard> = [];
  pajacList?: Array<ISoundboard> = [];
  niemmirList?: Array<ISoundboard> = [];
  inniList?: Array<ISoundboard> = [];

  constructor(private httpService: HttpService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.getAllSoundboardList();
    console.log('All soundboards' + this.soundboardList);
  }

  filterLists(){
    this.sebaList = this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'Pajac');
    console.log('List of Pajac' + this.sebaList + 'xDDDDD');
  }

  getAllSoundboardList(){
    this.httpService.getAllSoundboardList().subscribe(data => {
      console.log(data);
      this.soundboardList = data;
      this.filterLists();
    }, error => {
      console.log(error);
    });
  }

  onClick() {
    this.modal.open(AddSoundboardComponent);
  }

  playThisSoundboard(soundboard: ISoundboard) {
    let audio = new Audio();
    audio.src = this.pathToDir + soundboard.pathToFile;
    audio.load();
    audio.play();
  }
}
