import { Component, Inject, OnInit } from '@angular/core';
import { IPajacyzm } from '../../models/components/pajacyzm/IPajacyzm';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageRequest } from 'src/app/models/common/PageRequest';
import { IPajacyzmyWithCounter } from 'src/app/models/components/pajacyzm/IPajacyzmyWithCounter';
import { PajacyzmService } from 'src/app/services/comp/pajacyzm.service';

@Component({
  selector: 'app-pajacyzmy',
  templateUrl: './pajacyzmy.component.html',
  styleUrls: ['./pajacyzmy.component.css']
})
export class PajacyzmyComponent implements OnInit {
  pajacyzmyList: IPajacyzm[] = [];
  pajacyzmContent: string = '';
  pajacyzmAuthor: string = '';
  displaySend: boolean = false;
  currentPageDisplay: number = 1;
  itemsPerPage: number = 10;
  pajacyzmyListWithCounter?: IPajacyzmyWithCounter;
  allPajacyzmy: number = 0;
  siteKey: string = '6LcSeL0aAAAAAD6JHiwL-qd89Fmhymt9fXFHdpia';

  pageRequest = new PageRequest();

  protected aFormGroup: FormGroup;

  constructor(private pajacyzmService: PajacyzmService,
              @Inject(DOCUMENT)
              private _document: Document,
              private formBuilder: FormBuilder
              ) {
                this.pageRequest.pageNumber = 1;
                this.pageRequest.numberPerPage = 10;
  }

  ngOnInit(): void {
    this.getAllPajacyzmy(0);
    this.pajacyzmyList.sort((pajacyzm1, pajacyzm2) =>
      pajacyzm1.createdDate > pajacyzm2.createdDate ? 1 : pajacyzm2.createdDate > pajacyzm1.createdDate ? -1 : 0
    );
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  refreshPage(): void {
    this._document.defaultView.location.reload();
  }

  getAllPajacyzmy(pageNumber: number): void {
    this.pageRequest.pageNumber = pageNumber;
    this.pajacyzmService.getAllPajacyzmyList(this.pageRequest).subscribe(
      (data: IPajacyzmyWithCounter) => {
        this.pajacyzmyListWithCounter = data;
        this.allPajacyzmy = this.pajacyzmyListWithCounter.counter;
        this.pajacyzmyList = this.pajacyzmyListWithCounter.pajacyzmy;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  areAllFillIn(): boolean {
    return this.pajacyzmContent !== null && this.pajacyzmContent !== '' && this.pajacyzmAuthor !== null && this.pajacyzmAuthor !== '';
  }

  sendPajacyzm(): void {
    this.pajacyzmService.submitPajacyzm({
      content: this.pajacyzmContent,
      author: this.pajacyzmAuthor,
    }).subscribe(() => {
      this.getAllPajacyzmy(0);
      this.displaySend = true;
    });
  }

}
