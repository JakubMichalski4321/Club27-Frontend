import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DietService } from 'src/app/services/comp/diet.service';
import { BearerTokenService } from 'src/app/services/user/bearer-token.service';

@Component({
  selector: 'app-add-diet',
  templateUrl: './add-diet.component.html',
  styleUrls: ['./add-diet.component.css']
})
export class AddDietComponent implements OnInit {

  @Output()
  outData: EventEmitter<any> = new EventEmitter();
  dietName: string;
  currentWeight: number = 100;
  warmingMessage: string;

  constructor(
    public activeModal: NgbActiveModal,
    private dietService: DietService,
    private tokenService: BearerTokenService,
  ) { }

  ngOnInit(): void {
  }

  public everythingIsOk(): boolean {
    return true;
  }

  public createNewDiet(): void {
    const newDiet = {
      dietName: this.dietName,
      currentWeight: this.currentWeight,
      userAccountId: this.tokenService.getUserId()
    }
    this.dietService.addDiet(newDiet).subscribe(() => {
      this.activeModal.close();
      this.outData.emit(true);
    });
  }

}
