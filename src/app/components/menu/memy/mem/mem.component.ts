import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../../services/http.service';
import {IMem} from '../../../../models/IMem';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mem',
  templateUrl: './mem.component.html',
  styleUrls: ['./mem.component.css']
})
export class MemComponent implements OnInit, OnDestroy {

  mem: IMem;
  memId: any;
  private sub: any;


  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.memId = params['memId'];
    });
    this.getMem()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getMem(){
    this.httpService.getMem(this.memId).subscribe(data => {
      console.log(data);
      this.mem = data;
    }, error => {
      console.log(error);
    });
  }

  makeArrayOfNumbers(iterations: string){
    return Array(iterations.valueOf());
  }

}
