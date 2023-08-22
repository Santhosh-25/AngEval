import { Component, OnInit } from '@angular/core';

import UserData from '../../assets/data.json';

import {
  ActiveElement,
  BubbleDataPoint,
  Chart,
  ChartEvent,
  ChartTypeRegistry,
  Point,
  elements,
  registerables,
} from 'node_modules/chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-details',

  templateUrl: './details.component.html',

  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'itemno',
    'item-desc',
    'loc-id',
    'loc-desc',
    'snapshot-id',
    'Timestamp',
    'Quantity',
  ];

  chartvalue: any[] = UserData;

  label_quantity: any[] = [];

  lable_date: any[] = [];

  label_itemno: any[] = [];

  myChart!: any;

  startDate!: string;

  endDate!: string;

  filteredData: any[] = [];

  value: any;

  dataLoop: any;

  ngOnInit(): void {
    // this.displayGraph();
  }

  displayGraph() {
    // console.log(typeof this.startDate);
    // console.log(this.startDate);

    const dateParts = this.startDate.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);

    const startObject = new Date(year, month, day);

    const dateParts1 = this.endDate.split('-');
    const year1 = parseInt(dateParts1[0]);
    const month1 = parseInt(dateParts1[1]) - 1;
    const day1 = parseInt(dateParts1[2]);

    const endObject = new Date(year1, month1, day1);

    this.filteredData = UserData.filter((item) => {
      const itemDateParts = item.Timestamp.split(', ').map(Number);

      const itemDate = new Date(
        itemDateParts[0],

        itemDateParts[1] - 1,

        itemDateParts[2]
      );

      return itemDate >= startObject && itemDate <= endObject;
    });

    console.log(this.filteredData);

    if (this.chartvalue != null) {
      for (let i = 0; i < this.filteredData.length; i++) {
        this.label_quantity.push(this.filteredData[i].Quantity);

        this.lable_date.push(this.filteredData[i].itemno);

        this.label_itemno.push(this.filteredData[i].itemno);
      }

      //  console.log(this.label_quantity);

      //  console.log(this.lable_date);

      //  console.log(this.label_itemno)
    }

    this.myChart = new Chart('myChart', {
      type: 'bar',

      data: {
        labels: this.lable_date,

        datasets: [
          {
            label: '# Quantity',

            data: this.label_quantity,

            borderWidth: 1,
          },
        ],
      },

      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },

        onClick: this.handleClick,
      },
    });
  }

  handleClick(
    event: ChartEvent,
    elements: ActiveElement[],
    chart: Chart<keyof ChartTypeRegistry>
  ) {
    // console.log(chart);

    // console.log(elements[0].index)

    // console.log(chart.data.labels);

    this.value = chart.data.labels;

    var temp = [];

    var index = elements[0].index;

    for (let i = 0; i < this.value!.length; i++) {
      for (let j = 0; j < UserData.length; j++) {
        if (this.value[i] == UserData[j].itemno) {
          temp.push(UserData[j]);
        }
      }
    }

    //  console.log(temp[index])

    this.dataLoop = temp[index];

    console.log(this.dataLoop);

    // let service=new ServiceService();

    // console.log(service);

    //  service.shareData(this.dataLoop);
  }
}
