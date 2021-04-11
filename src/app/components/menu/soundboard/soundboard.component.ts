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

  soundboardList?: Array<ISoundboard> = [];

  constructor(private httpService: HttpService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.getAllSoundboardList();
  }

  getAllSoundboardList(){
    this.httpService.getAllSoundboardList().subscribe(data => {
      console.log(data);
      this.soundboardList = data;
    }, error => {
      console.log(error);
    });
  }

  onClick() {
    this.modal.open(AddSoundboardComponent);
  }
}
