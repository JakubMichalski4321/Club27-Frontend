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
    this.soundboardListOfLists.push(
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'seba'), 'Seba'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'jackob'), 'Jackob'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'wojtek'), 'Wojtuś'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'mlody'), 'Młody'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'pajac'), 'Pajac'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'niemmir'), 'Niemmir'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'debata'), 'Debata'),
      new SoundboardListObject(this.soundboardList.filter((soundboard: ISoundboard) => soundboard.whoIs == 'inni' || soundboard.whoIs == 'qbolid'), 'Inni')
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
    let audio = new Audio();
    audio.src = this.pathToDir + soundboard.pathToFile;
    let soundboardTrack = {title: soundboard.title, link: this.pathToDir + soundboard.pathToFile, artist: soundboard.whoIs, duration: audio.duration}
    this.msaapPlaylist.pop();
    this.msaapPlaylist.push(soundboardTrack);
  }
}
