import { Component, OnInit } from '@angular/core';
import {ISoundboard} from '../../../models/ISoundboard';
import {HttpService} from '../../../services/http.service';
import {AddMemeComponent} from '../memy/add-meme/add-meme.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddSoundboardComponent} from './add-soundboard/add-soundboard.component';
import {Track} from 'ngx-audio-player';

@Component({
  selector: 'app-soundboard',
  templateUrl: './soundboard.component.html',
  styleUrls: ['./soundboard.component.css']
})
export class SoundboardComponent implements OnInit {

  pathToDir = 'assets/soundboardSounds/';

  soundboardList?: Array<ISoundboard> = [];
  sebaList?: Array<ISoundboard> = [];
  jackobList?: Array<ISoundboard> = [];
  wojtusList?: Array<ISoundboard> = [];
  mlodyList?: Array<ISoundboard> = [];
  pajacList?: Array<ISoundboard> = [];
  niemmirList?: Array<ISoundboard> = [];
  debataList?: Array<ISoundboard> = [];
  inniList?: Array<ISoundboard> = [];

  msaapPlaylist: Track[];
  msaapDisplayTitle = true;
  msaapDisplayArtist = true;

  //https://www.npmjs.com/package/ngx-audio-player

  constructor(private httpService: HttpService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.getAllSoundboardList();
    this.msaapPlaylist = [{
      title: 'XD',
      link: this.pathToDir + 'pajacyzm.mp3',
      artist: 'Somebody',
      duration: new Audio(this.pathToDir + 'pajacyzm.mp3').duration
    }]
  }

  filterLists(){
    this.sebaList = this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'seba');
    this.jackobList = this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'jackob');
    this.wojtusList = this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'wojtek');
    this.mlodyList = this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'mlody');
    this.pajacList = this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'pajac');
    this.niemmirList = this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'niemmir');
    this.debataList = this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'debata');
    this.inniList = this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'inni' || soundboard.whoIs == 'qbolid');
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
    let soundboardTrack = {title: soundboard.title, link: this.pathToDir + soundboard.pathToFile, artist: soundboard.whoIs, duration: audio.duration}
    this.msaapPlaylist.pop();
    this.msaapPlaylist.push(soundboardTrack);
  }
}
