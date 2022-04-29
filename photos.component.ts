import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
} from "@angular/core";

import { NgxUiLoaderService } from "ngx-ui-loader";
import { CommonService } from "../../service/common.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from "@angular/common/http";
import * as moment from "moment";
import { FilesService } from "src/app/service/files.service";
import { PhotosService } from "src/app/service/photos.service";
import { ToastController, PopoverController } from "@ionic/angular";
import { ToastrService } from "ngx-toastr";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { PhotoViewerComponent } from "../modalpage/photo-viewer/photo-viewer.component";
import { MoreDetailsComponent } from "../modalpage/more-details/more-details.component";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

//taiga changes
import { Inject, TemplateRef } from "@angular/core";

import { PreviewDialogService } from "@taiga-ui/addon-preview";
import { clamp, TuiSwipe } from "@taiga-ui/cdk";
import { TuiDialogContext, TuiNotificationsService } from "@taiga-ui/core";
import { PolymorpheusContent } from "@tinkoff/ng-polymorpheus";
import { saveAs } from "file-saver";
import { environment } from "src/environments/environment.prod";
const API_URL = environment.apiUrl;
@Component({
  selector: "app-photos",
  templateUrl: "./photos.component.html",
  styleUrls: ["./photos.component.scss"],
})
export class PhotosComponent implements OnInit {
  @ViewChild("preview")
  readonly preview?: TemplateRef<TuiDialogContext<void>>;

  @ViewChild("AllselectCheckbox") AllselectCheckbox: ElementRef;

  SharedFileID: number = -1;
  length = 1;
  index = 0;
  // id: any;
  // length;
  photo: any = [];
  uploadedPhoto: any;
  photosLength: number;
  forceShowNavButton: boolean = true;
  transitionDurations: number = 500;
  page: number = 1;
  filesCount: any;
  sortList: any = "Modified At";
  sortValue = "modifiedAt";
  removable: boolean = true;
  pageEvent: PageEvent;
  pageSize: number = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  favoriteFile: any = [];
  fileId: any = [];
  deleteFileId: any = [];
  popover: any;
  createdTime: boolean = false;
  dashboardResult: any = [];
  extention: any;
  selectedOption: boolean = false;
  HighlightRow: number;
  selectedRows: any = [];
  pDetails: any;
  @HostListener("window:mouseup", ["$event"])
  @HostListener("window:keyup", ["$event"])
  ClickedRow: any;
  multiSelect: boolean = false;
  selectedFiles: any;
  sortOrder: boolean = false;
  currentIndex: any = -1;
  showFlag: any = false;
  fileid: any;
  sharedType: any = "files";
  filesType: any = "";
  parentId: any;
  // title: any = [];
  // photos: string;
  // currentObject: any = [];
  pics: any;
  // image: any;
  fullImage: any = [];
  //DOWNLOAD
  downloadID: any = [];
  downloadFilesId: any = [];
  ParentID = localStorage.getItem("parentId");
  fileStatus = { status: "", requestType: "", percent: 0 };
  filenames: string[] = [];
  allSelected: boolean = false;
  image_id: any;
  photo_id: any;
  pic_title: any;
  uploadedPhto: string;
  newIndex: any;
  newarr: any;
  photo_title: any;
  // click: boolean = false;
  dblclick: boolean = true;
  selectedpic: string;

  mouseUp() {
    if (this.selectedOption == false) {
      this.multiSelect = false;
      this.HighlightRow = null;
    }
  }

  constructor(
    private ngxService: NgxUiLoaderService,
    private commonService: CommonService,
    private filesService: FilesService,
    private photosService: PhotosService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastController: ToastController,
    private toastr: ToastrService,
    private popoverController: PopoverController,
    @Inject(PreviewDialogService)
    private readonly previewService: PreviewDialogService,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService
  ) {
    route.params.subscribe((val) => {
      this.page = 1;
      this.allPhotos();
      this.commonService.getDashboardInfo();
    });

    this.ClickedRow = function (index, id, photo) {
      this.HighlightRow = index;
      this.multiSelect = true;
      if (id != null) {
        this.selectedFiles = id;
        if (photo.src != "data:image/png;base64,null") {
          this.pDetails = photo;
        }
      }
    };

    this.commonService.storeHeader("Photos / All Photos");
  }
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   console.log(event);
  //   event.returnValue = false;

  //   event.preventDefault();

  //   //or
  //   //do something
  // }

  ngOnInit() {}

  getReadableFileSizeString(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  allPhotos() {
    // this.ngxService.start();
    let data = {
      asc: this.sortOrder,
      pageNb: this.page,
      parentId: 0,
      sortBy: this.sortValue,
      step: this.pageSize,
    };
    this.photosService.showAllPhots(data).subscribe((result: any) => {
      this.uploadedPhoto = result.childern;
      var arr = [];
      this.uploadedPhoto.forEach(function (i) {
        arr.push({ imageid: i.id });
      });
      this.fullImage = arr;
      console.log(this.fullImage);
      // this.image_id= fullImage[imageid]
      this.pics = result.childern;
      this.multiSelect = false;
      this.HighlightRow = null;
      this.filesCount = result.count;
      console.log(this.filesCount);
      let test = [];
      test = this.uploadedPhoto;

      this.photosLength = this.uploadedPhoto.length;
      // console.log(this.photosLength)
      for (let i = 0; i < this.uploadedPhoto.length; i++) {
        if (
          this.commonService.base64regex.test(this.uploadedPhoto[i].icon) ==
          true
        ) {
          this.photo = test.map((a) => "data:image/png;base64," + a.src);
        } else {
          this.photo = test.map((a) => a.src);
        }
        let date = moment(this.uploadedPhoto[i].modifiedAt).fromNow();
        this.uploadedPhoto[i].createdAt = moment(
          this.uploadedPhoto[i].createdAt
        ).fromNow();
        this.uploadedPhoto[i].modifiedAt = date;
        let size = this.getReadableFileSizeString(this.uploadedPhoto[i].size);
        this.uploadedPhoto[i].size = size;
        if (
          this.commonService.base64regex.test(this.uploadedPhoto[i].icon) ==
          true
        ) {
          this.uploadedPhoto[i].icon =
            "data:image/png;base64," + this.uploadedPhoto[i].icon;
        }
        this.extention = this.uploadedPhoto[i].title.split(".").pop();
        this.uploadedPhoto[i].extention = this.extention;
        let extn: any;
        extn = this.uploadedPhoto[i].title;
        if (extn.indexOf(".") == -1) {
          this.extention = "Unknown";
          this.uploadedPhoto[i].extention = this.extention;
        }
      }
      this.ngxService.stop();
    });
  }

  //Get sort value
  OngetSort(value) {
    this.sortList = value;
    this.removable = true;
    this.sortValue = value;
    if (this.sortValue === "Title") {
      if (this.sortOrder == false) {
        this.sortOrder = true;
      } else if (this.sortOrder == true) {
        this.sortOrder = false;
      }
      this.createdTime = false;
      this.sortValue = "title";
    } else if (this.sortValue === "Size") {
      this.createdTime = false;
      this.sortValue = "size";
    } else if (this.sortValue === "Created At") {
      this.createdTime = true;
      this.sortValue = "createdAt";
    } else if (this.sortValue === "Modified At") {
      this.createdTime = false;
      this.sortValue = "modifiedAt";
    }
    this.allPhotos();
  }

  matChipremove() {
    this.removable = false;
  }

  onFocusInMulti(event: any) {
    this.selectedOption = true;
    if (this.selectedOption == true) {
      this.multiSelect = true;
    }
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.allPhotos();
  }

  addFavorite(id, favorite) {
    let flag = favorite;
    if (flag === true) {
      flag = false;
    } else if (flag === false) {
      flag = true;
    }
    this.favoriteFile = {
      flag: flag,
      id: id,
    };
    this.ngxService.start();
    this.filesService
      .addFavorites(this.favoriteFile)
      .subscribe((result: any) => {
        this.allPhotos();
        this.ngxService.stop();
        if (result.flag === true) {
          this.toastr.success("Added favorite to your Photo/Image");
        } else {
          this.toastr.success("Removed favorites to your Photo/Image");
        }
      });
  }

  trashFile(FilesId) {
    this.deleteFileId = {
      fileIds: [FilesId],
      restoreFile: false,
      trashFile: true,
    };
    this.ngxService.start();
    this.filesService.trashFiles(this.deleteFileId).subscribe((result: any) => {
      this.allPhotos();
      this.ngxService.stop();
      this.toastr.success(result["message"]);
      if (result.status === 400) {
        this.ngxService.stop();
      }
    });
  }

  // async viewPhoto(fileid, title , index) {
  // this.popover = await this.popoverController.create({
  //    componentProps: {
  //      fileid: fileid,
  //      fileTitle: title,
  //      sharedType: 'files',
  //      photos: this.uploadedPhoto,
  //      page: 'photo',
  //      index:index
  //    },
  //    component: TaigaViewerComponent,
  //    cssClass :'transparent-modal'
  //  });
  //  await this.popover.present();

  //  return this.popover.onDidDismiss().then(
  //    (data) => {
  //      this.multiSelect = false;
  //      this.HighlightRow = null;
  //    }
  //  );
  // }

  async OnmoreDetails(details) {
    // console.log(details)
    this.popover = await this.popoverController.create({
      componentProps: {
        details: details,
      },
      component: MoreDetailsComponent,
    });
    await this.popover.present();

    return this.popover.onDidDismiss().then((data) => {
      this.multiSelect = false;
      this.HighlightRow = null;
    });
  }

  goToDashboard() {
    this.router.navigate(["/user/dashboard"]);
    this.commonService.storeBackBtnVal("true");
  }

  // showLightbox(index) {
  //   this.currentIndex = index;
  //   this.showFlag = true;

  // }
  // closeEventHandler() {
  //   this.showFlag = false;
  //   this.currentIndex = -1;

  // }
  //   get previewContent(): PolymorpheusContent {
  //     return this.fullImage[this.index].image
  // }

  // show(idx) {
  // alert(idx);
  // this.currentIndex =idx;
  //     this.previewService.open(this.preview ).subscribe({
  //         complete: () => console.info('complete')
  //     });

  // }
  async viewPhoto(id, title, index) {
    console.log(
      title,
      id,
      this.sharedType,
      this.ParentID,
      this.filesType,
      this.SharedFileID,
      "dataaaaaae4rr"
    );

    this.newIndex = index;
    console.log(this.newIndex);
    console.log("show");
    await this.filesService
      .getBase64ofFile(
        id,
        this.sharedType,
        this.ParentID,
        this.filesType,
        this.SharedFileID
      )
      .subscribe((result: any) => {
        if (this.commonService.base64regex.test(result.src) == true) {
          this.uploadedPhto = "data:image/png;base64," + result.src;
          console.log(this.uploadedPhto);
        } else {
          this.uploadedPhto = result.src;
          this.photo_id = result.id;
          this.pic_title = result.title;
          console.log(this.photo_id);

          console.log(this.uploadedPhto);
          console.log(this.pic_title);
        }
        this.onclick(this.photo_id);
        this.previewService.open(this.preview).subscribe({
          complete: () => console.info("complete"),
        });
      });
  }

  get previewContent(): PolymorpheusContent {
    if (this.dblclick == true) {
      this.selectedpic = this.uploadedPhto;
    } else {
      this.selectedpic = this.newarr;
    }
    return this.selectedpic;
  }

  download(filesid): void {
    // alert('hello');
    // console.log(filesid);
    this.downloadID = filesid;
    if (this.downloadID.length > 0) {
      this.downloadID = filesid;
    } else {
      this.downloadID = [filesid];
    }
    this.downloadFilesId = {
      fileId: this.downloadID,
      sharedFile: false,
    };
    //this.ngxService.start();
    this.filesService.downloadFiles(this.downloadFilesId).subscribe(
      (event: any) => {
        this.ngxService.stop();
        this.resportProgress(event);
        this.multiSelect = false;
      },
      (error: HttpErrorResponse) => {
        this.ngxService.stop();
      }
    );
    this.allPhotos();
    this.HighlightRow = null;
    this.AllselectCheckbox["checked"] = false;
    this.selectedFiles = [];
    this.allSelected = false;
  }
  private updateStatus(
    loaded: number,
    total: number,
    requestType: string
  ): void {
    this.fileStatus.status = "progress";
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round((100 * loaded) / total);
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, "Uploading... ");
        this.toastr.success("Downloading...");
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(
          httpEvent.loaded,
          httpEvent.total!,
          "Downloading... "
        );
        break;
      case HttpEventType.ResponseHeader:
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = "done";
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          httpEvent.headers.get("Content-Disposition");
          saveAs(
            new Blob([httpEvent.body!], {
              type: `${httpEvent.headers.get("Content-Type")};charset=utf-8`,
            }),
            httpEvent.headers
              .get("content-disposition")
              .replace("attachment ; filename=", "")!
          );
          setTimeout(() => {
            this.toastr.success("Download Successfully");
          }, 3000);
        }
        this.fileStatus.status = "done";
        break;
      default:
        break;
    }
  }

  onclick(idx) {
    // this.click=true;

    this.dblclick = false;
    console.log(idx);
    this.filesService.traversePhoto(idx).subscribe((data) => {
      console.log(data);
      console.log(data.src);
      this.newarr = data.src;
      this.photo_title = data.title;
    });
  }
  // newf(e, idx) {
  //   console.log(e);
  //   if (e.keyCode == 37) {
  //     this.onclick(idx);
  //     e.preventDefault();
  //   } else if (e.keyCode == 39) {
  //     this.onclick(idx);
  //     e.preventDefault();
  //   }
  // }
  keydown(event) {
    this.keyup(event);
    console.log(event);
    // event.stopImmediatePropagation();

    // event.preventDefault();
    // return false;
    if (event.keyCode == 37) {
      event.stopImmediatePropagation();
      // event.preventDefault();
      // return false;
    } else if (event.keyCode == 39) {
      event.stopImmediatePropagation();
      // event.preventDefault();
      // return false;
    }
  }
  keyup(event) {
    console.log(event);
    // event.stopImmediatePropagation();

    // event.preventDefault();
    // return false;
    if (event.keyCode == 37) {
      event.stopImmediatePropagation();
      // event.preventDefault();
      // return false;
    } else if (event.keyCode == 39) {
      event.stopImmediatePropagation();
      // event.preventDefault();
      // return false;
    }
  }
}
