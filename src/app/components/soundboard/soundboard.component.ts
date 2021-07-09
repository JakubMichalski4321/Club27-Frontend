import { Component, OnInit } from '@angular/core';
import {ISoundboard} from '../../models/ISoundboard';
import {HttpService} from '../../services/http.service';
import {AddMemeComponent} from '../memy/add-meme/add-meme.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddSoundboardComponent} from './add-soundboard/add-soundboard.component';
import {Track} from 'ngx-audio-player';
import {SoundboardListObject} from '../../models/SoundboardListObject';

@Component({
  selector: 'app-soundboard',
  templateUrl: './soundboard.component.html',
  styleUrls: ['./soundboard.component.css']
})
export class SoundboardComponent implements OnInit {

  pathToDir = 'assets/soundboardSounds/';

  soundboardList?: Array<ISoundboard> = [];
  soundboardListOfLists?: Array<SoundboardListObject> = [];
  audio = new Audio();

  constructor(private httpService: HttpService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.getAllSoundboardList();
  }

  filterLists(){
    this.soundboardListOfLists.push(
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs.toLowerCase() == 'seba'), 'Seba'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs.toLowerCase() == 'jackob'), 'Jackob'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs.toLowerCase() == 'wojtek'), 'Wojtuś'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs.toLowerCase() == 'mlody'), 'Młody'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs.toLowerCase() == 'pajac'), 'Pajac'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs.toLowerCase() == 'niemmir'), 'Niemmir'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs.toLowerCase() == 'debata'), 'Debata'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs.toLowerCase() == 'inni' || soundboard.whoIs == 'qbolid'), 'Inni')
    );
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
    this.audio.pause();
    this.audio.src = this.pathToDir + soundboard.pathToFile;
    this.audio.play();
  }

}

