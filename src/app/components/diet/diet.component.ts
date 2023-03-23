import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDiet } from 'src/app/models/components/diet/IDiet';
import { IDietStatement } from 'src/app/models/components/diet/IDietStatement';
import { DietService } from 'src/app/services/comp/diet.service';
import { BearerTokenService } from 'src/app/services/user/bearer-token.service';
import { AddDietComponent } from './add-diet/add-diet.component';
import { DietDetailsComponent } from './diet-details/diet-details.component';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {

  showLogin = false;
  isExistUserDiet = false;
  myDiet: IDiet;
  dietsList: IDiet[];
  private FIRST_CALL: boolean = true;

  constructor(
    private tokenService: BearerTokenService,
    private modal: NgbModal,
    private dietService: DietService,
  ) {}

  ngOnInit(): void {
    if (!this.isLoggedIn()) {
      this.delay(2700);
    } else {
      this.dietService.getDiets().subscribe((diets) => {
        this.myDiet = diets.find(d => d.userAccount.id === this.tokenService.getUserId());
          if(!this.myDiet) {
            this.isExistUserDiet = false;
            this.dietsList = diets;
          } else {
            this.isExistUserDiet = true;
            this.dietsList = diets.filter(diet => diet.id !== this.myDiet.id);
          }
          this.dietsList.forEach(diet => {
            if (diet.statements) {
              diet.statements = diet.statements.sort((dS1, dS2) => (dS1.createdDate < dS2.createdDate) ? 1 : ((dS2.createdDate < dS1.createdDate) ? -1 : 0));
            }
          })
      });
    }
  }

  afterLogin() {
    if(this.FIRST_CALL) {
      this.FIRST_CALL = false;
      this.ngOnInit();
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.showLogin = true;
      }, ms)
    );
  }

  public isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  openCreatDiet(): void {
    const modalRef = this.modal.open(AddDietComponent);
    (<AddDietComponent>modalRef.componentInstance).outData.subscribe(
      (added) => {
        if (added) {
          this.dietService.getUserDiet(this.tokenService.getUserId()).subscribe((resp) => {
            this.myDiet = resp;
            this.isExistUserDiet = true;
          });
        }
      }
    );
  }

  public getLastStatement(diet: IDiet): string {
    return diet.statements[0] ? diet.statements[0].createdDate.substr(0, 10) + ' ' + diet.statements[0].createdDate.substr(11, 5) : '';
  }

  public isDownWeight(diet: IDiet): boolean {
    if (diet.statements[0] && diet.statements[1]) {
      return diet.statements[0].weight <= diet.statements[1].weight;
    } else {
      return true;
    }
  }

  public lastestBalance(diet: IDiet): string {
    if (diet.statements[0] && diet.statements[1]) {
      if (diet.statements[0].weight <= diet.statements[1].weight) {
        return '-' + (this.getRounded(diet.statements[1].weight - diet.statements[0].weight)) 
      } else {
        return '+' + (this.getRounded(diet.statements[0].weight - diet.statements[1].weight)) 
      }
    } else {
      return '0';
    }
  }

  public getRounded(balnce: number): number {
    return Math.round(balnce * 1000) / 1000;
  }

  public openDetails(diet: IDiet): void {
    const modalRef = this.modal.open(DietDetailsComponent, {
      size: 'lg',
    });
    (<DietDetailsComponent>modalRef.componentInstance).diet = diet;
    (<DietDetailsComponent>modalRef.componentInstance).allowAdd = false;
  }

}
