import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAddDietStatement } from 'src/app/models/components/diet/IAddDietStatementRequest';
import { IDietStatement } from 'src/app/models/components/diet/IDietStatement';
import { DietService } from 'src/app/services/comp/diet.service';

@Component({
  selector: 'app-add-diet-statement',
  templateUrl: './add-diet-statement.component.html',
  styleUrls: ['./add-diet-statement.component.css']
})
export class AddDietStatementComponent implements OnInit {

  dietId: string;
  description: string;
  weight: number;
  warmingMessage: string;
  lastStatement: IDietStatement;

  @Output()
  outData: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private dietService: DietService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    if (this.lastStatement) {
      this.weight = this.lastStatement.weight;
    }
  }

  public addDietStatement(): void {
    const newStatement: IAddDietStatement = {
      weight: this.weight,
      description: this.description,
      dietId: this.dietId,
    }
    this.dietService.addDietStatement(newStatement).subscribe(() => {
      this.outData.emit(true);
      this.activeModal.close();
    });
  }

  public everythingIsOk(): boolean {
    return true;
  }

}
