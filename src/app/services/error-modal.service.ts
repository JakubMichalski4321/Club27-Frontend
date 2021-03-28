import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  constructor() { }

  private errorSubject = new Subject<string>();

  getErrorUpdates(){
    return this.errorSubject.asObservable();
  }

  pushError(message: string){
    this.errorSubject.next(message);
  }
}
