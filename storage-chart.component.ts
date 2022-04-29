import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HighchartsService } from "../../highcharts.service";
import { CommonService } from "src/app/service/common.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Subscription } from "rxjs";

@Component({
  selector: "app-storage-chart",
  templateUrl: "./storage-chart.component.html",
  styleUrls: ["./storage-chart.component.scss"],
})
export class StorageChartComponent implements OnInit {
  @ViewChild("charts", { static: true }) public chartEl: ElementRef;
  donutChart: any;
  storageResult: any = [];
  totalSpace: any;
  usedSpaceInBytes: any;
  usedSpaceInPercentage: any;
  units: string[];
  freeSpace: any;
  dashboardResult: any = [];
  usedSpaceChart: any = [];
  subscriptionStorageinfo: Subscription;
  readableTotalSpace : any;
  readableUsedSpace : any;
  // charts: any;

  constructor(
    private highcharts: HighchartsService,
    private commonService: CommonService,
    private ngxService: NgxUiLoaderService
  ) {
    
  }

  ngOnInit() {
    setTimeout(() => this.initDonut(), 1500);    
    // this.initDonut();
    this.getStorageInfo();
    this.subscriptionStorageinfo = this.commonService.getDonutStorageinfo().subscribe(() => {
      this.getStorageInfo();
      setTimeout(() => this.initDonut(), 1500);
      // console.log("donut storage")
    });
  }

   // Get  Storage info
   getStorageInfo() {
    //this.ngxService.start();
    this.commonService.getStorageInfos().subscribe((result: any) => {
      this.ngxService.stop();
      this.storageResult = result;
      this.readableTotalSpace = result.readableTotalSpace;
      this.readableUsedSpace = result.readableUsedSpace;
      this.freeSpace =
        this.storageResult.totalSpace - this.storageResult.usedSpaceInBytes;
      this.freeSpace = this.getReadableFileSizeString(this.freeSpace);
      localStorage.setItem("freeSpace", this.freeSpace);
      this.totalSpace = this.getConvertGb(this.storageResult.totalSpace);
      this.storageResult.totalSpace = this.totalSpace;
      localStorage.setItem("totalSpace", this.totalSpace);
      
      this.usedSpaceInBytes = this.getReadableFileSizeString(
        this.storageResult.usedSpaceInBytes
      );
      this.storageResult.usedSpaceInBytes = this.usedSpaceInBytes;
      localStorage.setItem("usedSpaceInBytes", this.usedSpaceInBytes);

      var totalSpace1 = this.totalSpace;
      var trimTotalSpace = totalSpace1.match(/\d/g).join("");

      this.usedSpaceInPercentage = Math.round(
        this.storageResult.usedSpaceInPercentage
      );
      this.storageResult.usedSpaceInPercentage = this.usedSpaceInPercentage;
      localStorage.setItem("usedSpaceInPercentage", this.usedSpaceInPercentage);
    });
  }

  getConvertGb(bytes, decimals = 2) {
    if (bytes === 0) return "0 KB";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) / k + " GB";
  }

  getReadableFileSizeString(bytes, decimals = 2) {
    if (bytes === 0) return "0 KB";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  initDonut() {
    var usedSpace = parseInt(localStorage.getItem("usedSpaceInPercentage"));
    if (usedSpace == 0) {
      usedSpace = 1;
    }
    var freeSpace = 100 - usedSpace;
    var perShapeGradient = {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 0,
    };
    this.donutChart = {
      chart: {
        type: "line",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        labels: {
          enabled: false,
        },
        // categories: ['Number Of Users' + " " + 8, 'Inactive Users' + " " + 9, 'Active Users' + " " + 7, 'Never Log Users' + " " + 8]
      },
      colors: [
        {
          linearGradient: perShapeGradient,
          stops: [
            [0, "#fa4b53"],
            [1, "#fa4b53"],
          ],
        },

        {
          linearGradient: perShapeGradient,
          stops: [
            [0, "rgb(126, 144, 230)"],
            [1, "rgb(126, 144, 230)"],
          ],
        },
      ],
      yAxis: {
        min: 0,
        tickInterval: 50,
        zoomEnabled: false,
        title: {
          text: "Value",
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: "bold",
              color: "black",
            },
          },
          startAngle: -90,
          endAngle: -180,
          center: ["10%", "15%"],
          size: "40%",
          showInLegend: true,
        },
      },
      tooltip: {
        formatter: function () {
          return this.x;
        },
      },
      series: [
        {
          data: [
            {
              name: this.readableUsedSpace,
              y: usedSpace,
            },
            {
              name: this.readableTotalSpace,
              y: freeSpace,
            },
          ],
          type: "pie",
          innerSize: "50%",
        },
      ],
    };

    this.highcharts.createChart(this.chartEl.nativeElement, this.donutChart);    
  }

}
