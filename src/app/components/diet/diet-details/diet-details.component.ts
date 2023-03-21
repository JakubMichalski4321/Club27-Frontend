import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDiet } from 'src/app/models/components/diet/IDiet';
import { IDietStatement } from 'src/app/models/components/diet/IDietStatement';
import { DietService } from 'src/app/services/comp/diet.service';
import { AddDietStatementComponent } from '../add-diet-statement/add-diet-statement.component';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-diet-details',
  templateUrl: './diet-details.component.html',
  styleUrls: ['./diet-details.component.css']
})
export class DietDetailsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input()
  diet: IDiet;
  dietStatements: IDietStatement[];
  isAddedToday: boolean = true;
  weight: number;
  statementsExist: boolean = false;
  allowAdd: boolean = true;
  options: any;
  firstElement: number = 0;
  toElement: number = 5;

  constructor(
    private dietService: DietService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.dietService.getDietStatements(this.diet.id).subscribe(resp => {
      const currentDate: Date = new Date();
      this.dietStatements = resp.sort((dS1, dS2) =>
        (dS1.createdDate > dS2.createdDate) ? 1 : ((dS2.createdDate > dS1.createdDate) ? -1 : 0));
      let lastDiet: IDietStatement = this.dietStatements[0];
      this.initChart();
      if (lastDiet) {
        const lastDate = new Date(lastDiet.createdDate);
        if (lastDate.getDay() === currentDate.getDay() &&
        lastDate.getMonth() === currentDate.getMonth() &&
        lastDate.getFullYear() === currentDate.getFullYear()) {
          this.isAddedToday = true;
        } else {
          this.isAddedToday = false;
        }
      } else {
        this.isAddedToday = false;
      }
      this.isAddedToday = !this.allowAdd;
    });
  }

  private initChart(): void {
    this.chartOptions = {
      series: [
        {
          name: "Kg",
          data: this.dietStatements.map(dS => dS.weight),
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Wykres tluszczu użytkownika " + this.diet.userAccount.name,
        align: "center"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.dietStatements.map(dS => dS.createdDate.substr(0, 10)),
      }
    };
    this.statementsExist = true;
  }

  public openAddDietStatement(): void {
    const modalRef = this.modal.open(AddDietStatementComponent);
    (<AddDietStatementComponent>modalRef.componentInstance).lastStatement = this.dietStatements[0];
    (<AddDietStatementComponent>modalRef.componentInstance).dietId = this.diet.id;
    (<AddDietStatementComponent>modalRef.componentInstance).outData.subscribe(
      (added: boolean) => {
        if (added) {
          this.dietService.getDietStatements(this.diet.id).subscribe(resp => {
            this.dietStatements = resp.sort((dS1, dS2) => new Date(dS1.createdDate).getTime() - new Date(dS2.createdDate).getTime());
            this.isAddedToday = true;
          })
        }
      }
    );
  }

}
