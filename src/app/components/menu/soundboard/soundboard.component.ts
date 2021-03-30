import { Component, OnInit } from '@angular/core';
import {ISoundboard} from '../../../models/ISoundboard';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-soundboard',
  templateUrl: './soundboard.component.html',
  styleUrls: ['./soundboard.component.css']
})
export class SoundboardComponent implements OnInit {

  soundboardList?: Array<ISoundboard> = [];

  constructor(private httpService: HttpService) { }

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

}
