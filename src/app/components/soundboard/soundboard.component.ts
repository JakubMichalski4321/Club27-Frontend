import { Component, OnInit } from '@angular/core';
import { ISoundboard } from '../../models/components/soundboard/ISoundboard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSoundboardComponent } from './add-soundboard/add-soundboard.component';
import { SoundboardListObject } from '../../models/components/soundboard/SoundboardListObject';
import { SoundboardService } from 'src/app/services/comp/soundboard.service';


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
  currentAudioSrc?: any;

  constructor(
    private soundboardService: SoundboardService,
    private modal: NgbModal
  ) { }

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
    this.soundboardService.getAllSoundboardList().subscribe(data => {
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
    this.currentAudioSrc = this.audio.src;
    this.audio.play();
  }

  copyMessage(currentAudioSrc: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = currentAudioSrc;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

