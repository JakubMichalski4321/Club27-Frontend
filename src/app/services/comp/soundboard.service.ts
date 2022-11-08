import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ISoundboard } from "src/app/models/components/soundboard/ISoundboard";
import { UploadSoundboard } from "src/app/models/components/soundboard/UploadSoundboard";
import { ControllUrl } from "../control.enum";


@Injectable()
export class SoundboardService {

  constructor(private http: HttpClient) {}

  private baseUrl = ControllUrl.SOUNDBOARD;

  public getAllSoundboardList(): Observable<ISoundboard[]>{
    return this.http.get<ISoundboard[]>(this.baseUrl + 'soundboards');
  }

  public submitSoundboard(data: UploadSoundboard){
    this.http.post(this.baseUrl + 'soundboard-submit', data).toPromise().then((data: UploadSoundboard) => {
    });
  }

  public submitSoundboardSound(file: File, pathToFile: any){
    let formData: FormData = new FormData();
    formData.append('file', file, pathToFile);
    return this.http.post(this.baseUrl + 'soundboard-sound-submit', formData).toPromise().then((data: FormData) => {
    });
  }

}
