import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  Inject,
  OnDestroy,
  HostListener,
} from "@angular/core";
import { CommonService } from "src/app/service/common.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import * as moment from "moment";
import { ActivatedRoute, Router } from "@angular/router";
import { FilesService } from "src/app/service/files.service";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from "@angular/common/http";
import { saveAs } from "file-saver";
import { ToastrService } from "ngx-toastr";
import * as introJs from "intro.js/intro.js";
import { ActivityServiceService } from "src/app/service/activity-service.service";
import { PopoverController } from "@ionic/angular";
import { TextEditorComponent } from "../modalpage/text-editor/text-editor.component";
import { VideoPlayerComponent } from "../modalpage/video-player/video-player.component";
import { AudioPlayerComponent } from "../modalpage/audio-player/audio-player.component";
import { PdfViwerComponent } from "../modalpage/pdf-viwer/pdf-viwer.component";
import { MoveCopyComponent } from "../modalpage/move-copy/move-copy.component";
import { SharingComponent } from "../modalpage/sharing/sharing.component";
import { PhotoViewerComponent } from "../modalpage/photo-viewer/photo-viewer.component";
import { DOCUMENT } from "@angular/common";
import { Subscription } from "rxjs";
import { mimetypes } from "src/environments/mimetypes";
// import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { FileDeleteConfirmComponent } from "../modalpage/file-delete-confirm/file-delete-confirm.component";
import { PhotosService } from "src/app/service/photos.service";
import { HighchartsService } from "./../highcharts.service";
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";
import { Upload } from "tus-js-client";
import { ToastController } from "@ionic/angular";
import { environment } from "src/environments/environment.prod";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CollaboraComponent } from "../layouts/ifame/collabora/collabora.component";
//taiga changes
import { TemplateRef } from '@angular/core';
import { PreviewDialogService } from '@taiga-ui/addon-preview';
import { TuiDialogContext, TuiNotificationsService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],

  animations: [
    // fadeInOnEnterAnimation(),
    // fadeOutOnLeaveAnimation()
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  introJS = introJs();

  linkForm: FormGroup;
  sharedType: any = "files";
  filesType: any = "";
  SharedFileID: number = -1;
  newFolder: boolean = false;
  newTextDoc: boolean = false;
  newDoc: boolean = false;
  newSpreadsheet = false;
  newPresentation = false;
  newFolderName: any;
  newFileName: any;
  public selectedFile: any = File;
  welcomegreeting: string;
  resData: any;
  uploadedFile: any = [];
  uploadedFolder: any = [];
  uploadedDocuments: any = [];
  modified: any = [];
  userName: string;
  reNameFile: boolean = true;
  reNameId: any;
  reName: any;
  uploadedFolderLength: any;
  uploadedDocumentsLength: any;
  deleteFileId: any = [];
  parentId = localStorage.getItem("parentId");
  ParentID = localStorage.getItem("parentId");
  favoriteFile: any = [];
  userDetails: any = [];
  filenames: string[] = [];
  fileStatus = { status: "", requestType: "", percent: 0 };
  activityList: any = [];
  emptyFolder: any = [];

  openFolder: boolean = false;
  breadcrumb: any = [];
  breadcrumbfiles: any = [];
  popover: any;
  id: any;
  fileId: any = [];
  storageResult: any = [];
  totalSpace: any;
  usedSpaceInBytes: any;
  usedSpaceInPercentage: any;
  units: string[];
  freeSpace: any;
  dashboardResult: any = [];
  @ViewChild("toggleButton") toggleButton: ElementRef;
  @ViewChild("menu") menu: ElementRef;
  multiUploadedFiles: any = [];
  index: number = 0;

  uploadFiles: any = [];
  uploadLoader: boolean = false;
  dropUploadLoader: boolean = false;
  headerUploadProgress: boolean = false;
  headerUploadcompleted: boolean = false;
  headercancelUpload: boolean = false;
  percentDone: any;
  notALink: boolean = true;
  OntogglePopup: boolean = true;
  cancelUploadCounter: number = 0;
  folderListView: boolean = true;
  folderGridView: boolean = false;
  fileListView: boolean = true;
  fileGridView: boolean = false;
  openMenu: boolean = false;
  listener: () => void;
  reNameDoc: any;
  firstlogin: any;
  errorTextDoc: string;
  errorFolder: string;
  onFocusInput: boolean = false;
  photo: any = [];
  subscription: Subscription;
  subscriptionNotify: Subscription;
  subscriptionStorageinfo: Subscription;
  mimes = mimetypes;
  viewDetails: boolean = false;
  @HostListener("window:mouseup", ["$event"])
  @ViewChild("charts", { static: true })
  public chartEl: ElementRef;
  @ViewChild("scroll", { read: ElementRef }) public scroll: ElementRef<any>;
  donutChart: any;
  dropUploadedFiles: any = [];
  newLink: boolean = false;
  errormsg: any;
  pic_title: any;
  photo_id: any;
  uploadedPhoto: any;
  //video
  url: any;
  minio: any = "not minio";
  file_id: any;
  vid_title: any;
  mouseUp() {
    if (this.onFocusInput == false) {
      this.reNameFile = true;
    }
  }
  allnotifications: any = [];
  allnotificationsLength: any;
  refreshCount: number = 0;
  public files: NgxFileDropEntry[] = [];
  uploadProgress = 0;
  AuthorizartionToken = localStorage.getItem("token");
  API_URL = environment.apiUrl;
  storageValueInPercentage: any;
  storageValueInNumber: any;
  totalSize = 0;
  total: any;
  @ViewChild('preview')
  readonly preview?: TemplateRef<TuiDialogContext<void>>;
  @ViewChild('content')
  readonly content?: TemplateRef<TuiDialogContext<void>>;
  // totalSize = 0;
  // total: any;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private commonService: CommonService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private filesService: FilesService,
    private toastr: ToastrService,
    private activityService: ActivityServiceService,
    private popoverController: PopoverController,
    private renderer: Renderer2,
    private photosService: PhotosService,
    private elementRef: ElementRef,
    private highcharts: HighchartsService,
    private readonly toastCtrl: ToastController,
    @Inject(PreviewDialogService)
    private readonly previewService: PreviewDialogService,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService,
  ) {
    route.params.subscribe((val) => {
      this.getshowAllFiles(this.parentId);
      this.recentActivity();
      this.getUserDetail();
      this.getDashboardInfo();
      this.openMenu = false;
      this.back();
      this.newFolder = false;
      this.newLink = false;
      this.newTextDoc = false;
      this.newDoc = false;
      this.newSpreadsheet = false;
      this.newPresentation = false;
      this.errorTextDoc = "";
      this.errorFolder = "";
    });

    // this.commonService.storeStorageinfo(true);

    this.subscription = this.commonService.getClick().subscribe((message) => {
      if (message == "click") {
        this.openMenu = false;
        this.back();
        this.newFolder = false;
        this.newLink = false;
        this.newTextDoc = false;
        this.newDoc = false;
        this.newSpreadsheet = false;
        this.newPresentation = false;
        this.errorTextDoc = "";
        this.errorFolder = "";
      }
    });

    this.commonService.storeHeader("Dashboard");
    this.introJS.setOptions({
      steps: [
        {
          intro: "Hello, Welcome to exzaconcert!",
          position: "top",
        },
        {
          element: "#step1",
          intro: "Your recent activities",
          position: "left",
        },
        {
          element: "#step2",
          intro: "Your account storage",
          position: "left",
        },
        {
          element: "#step3",
          intro: "Your latest 5 folders",
          position: "left",
        },
        {
          element: "#step4",
          intro: "Your latest 5 files",
          position: "left",
        },
        {
          element: "#step5",
          intro: "You can change your profile info",
          position: "left",
        },
        {
          element: "#step6",
          intro: "Your recent notifications",
          position: "left",
        },
        {
          element: "#step7",
          intro: "Your bookmarks",
          position: "left",
        },
        {
          element: "#step8",
          intro: "Search",
          position: "left",
        },
        {
          element: "#step9",
          intro:
            "Add New Document, you can upload files, create folder, create text document, create spreadsheet & create presentation",
          position: "left",
        },
      ],
    });
  }

  get linkFormControls() {
    return this.linkForm.controls;
  }

  ngOnInit() {
    this.linkForm = this.fb.group({
      link: new FormControl("", Validators.compose([Validators.required])),
      URL: new FormControl(""),
    });

    this.userName = localStorage.getItem("username");
    const hours = new Date().getHours();
    if (hours >= 12) {
      this.welcomegreeting = "Good Afternoon";
    } else {
      this.welcomegreeting = "Good Morning";
    }
    this.firstlogin = localStorage.getItem("firstLogin");
    if (this.firstlogin === true) {
      this.takeDashboardTour();
      this.introJS.start();
      localStorage.setItem("firstLogin", "false");
    }
    // if (this.commonService.refreshCount == 1) {
    //   //this.ngxService.start();
    //   setTimeout(() => {
    //     location.reload();
    //     this.ngxService.stop();
    //   }, 100);
    // }
  }

  onFocusInEvent(event: any) {
    this.onFocusInput = true;
    if (this.onFocusInput == true) {
      this.reNameFile = false;
    }
  }

  // save() {
  //   this.openMenu = false;
  //   let data = {
  //     url: this.linkForm.value.URL,
  //     linkName: this.linkForm.value.link,
  //     mimeType: "link",
  //     parentId: this.parentId,
  //   };
  //   this.commonService.createbookmarks(data).subscribe((result: any) => {
  //     if (result["responseCode"] == 201) {
  //       this.ngxService.stop();
  //       this.getshowAllFiles(this.parentId);
  //       this.recentActivity();
  //     }
  //   });
  // }

  back() {
    this.notALink = true;
  }

  moreactions() {
    this.openMenu = false;
    this.back();
    this.newFolder = false;
    this.newTextDoc = false;
    this.newLink = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
  }

  OnopenMenu() {
    this.commonService.storeClick("click");
    this.openMenu ? this.handleClose() : this.handleOpen();
  }

  handleOpen() {
    this.back();
    this.openMenu = true;
    this.addListener();
  }

  handleClose() {
    this.openMenu = false;
    this.back();
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
    this.removeListener();
  }

  //click outside of div it's hide
  addListener() {
    this.listener = this.renderer.listen(document, "click", (event) => {
      const targetEl = event.target as HTMLElement;
      const clickedOutside =
        targetEl.innerHTML.search("panel-menu") > 0 ? true : false;
      clickedOutside ? this.handleClose() : console.log("");
    });
  }

  removeListener() {
    this.listener();
  }

  OnCreateTextDoc($event) {
    this.newFileName = $event.target.value + ".txt";
  }

  OnCreateDoc($event) {
    this.newFileName = $event.target.value + ".docx";
  }
  OnCreateSpreadsheet($event) {
    this.newFileName = $event.target.value + ".xlsx";
  }
  OnCreatePresentation($event) {
    this.newFileName = $event.target.value + ".pptx";
  }

  folderListViewShow() {
    this.folderListView = true;
    this.folderGridView = false;
    this.openMenu = false;
    this.newFolder = false;
    this.newLink = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.newTextDoc = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
  }
  folderGridViewShow() {
    this.folderGridView = true;
    this.folderListView = false;
    this.openMenu = false;
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
  }

  fileListViewShow() {
    this.fileListView = true;
    this.fileGridView = false;
    this.openMenu = false;
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
  }
  fileGridViewShow() {
    this.fileGridView = true;
    this.fileListView = false;
    this.openMenu = false;
    this.newLink = false;
    this.newFolder = false;
    this.newTextDoc = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
  }

  getConvertGb(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) / k + " GB";
  }

  getReadableFileSizeString(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  // Get  Storage info
  getStorageInfo() {
    //this.ngxService.start();
    this.commonService.getStorageInfos().subscribe((result: any) => {
      this.ngxService.stop();
      this.storageResult = result;
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

      //Getting storage values
      this.usedSpaceInPercentage =
        this.storageResult.usedSpaceInPercentage.toFixed(2);
      this.storageResult.usedSpaceInPercentage = this.usedSpaceInPercentage;
      localStorage.setItem("storageValueInNumber", this.storageValueInNumber);
      this.storageValueInNumber = (
        parseInt(this.usedSpaceInBytes) / 1024
      ).toFixed(2);
      this.storageValueInPercentage = this.usedSpaceInPercentage;
      localStorage.setItem(
        "storageValueInPercentage",
        this.storageValueInPercentage
      );
    });
  }

  takeDashboardTour() {
    this.openMenu = false;
    this.back();
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
    this.commonService.storeClick("click");
    this.introJS.start();
  }

  createNewFile() {
    this.newLink = false;
    this.newFolder = true;
    setTimeout(() => {
      var elem = this.renderer.selectRootElement("#newfolder");
      this.renderer.listen(elem, "focus", () => { });
      this.renderer.listen(elem, "blur", () => { });
      elem.focus();
    }, 500);
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
  }

  createNewLink() {
    this.notALink = false;
    this.newLink = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.newFolder = false;
  }

  createNewTextDoc() {
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = true;
    setTimeout(() => {
      var elem = this.renderer.selectRootElement("#newTextDoc");
      this.renderer.listen(elem, "focus", () => { });
      this.renderer.listen(elem, "blur", () => { });
      elem.focus();
    }, 500);
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorFolder = "";
  }
  createNewDoc() {
    this.newTextDoc = false;
    this.newFolder = false;
    this.newLink = false;
    this.newDoc = true;
    this.newSpreadsheet = false;
    this.newPresentation = false;
  }
  createNewSpreadsheet() {
    this.newTextDoc = false;
    this.newFolder = false;
    this.newLink = false;
    this.newDoc = false;
    this.newSpreadsheet = true;
    this.newPresentation = false;
  }
  createNewPresentation() {
    this.newTextDoc = false;
    this.newFolder = false;
    this.newLink = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = true;
  }

  OncreateFolder($event) {
    this.newFolderName = $event.target.value;
  }

  uploadFile(event) {
    if(event.target.files.length <= 20){
      this.multiUploadedFiles = [];
      this.multiUploadedFiles = event.target.files;
      this.OnchunkUpload1(this.multiUploadedFiles[this.index++], this.parentId);
    }
    else if(event.target.files.length > 20){
      this.toastr.error("You can upload only 20 files at a time")
      this.openMenu = false;
    }
    else if( event.target.files.size > 100450390){
      this.toastr.error("One of the file size is more than 100Mb");
      this.openMenu = false;
    }
  }

  OnchunkUpload1(item, parentId) {
    // console.log("Uploading file" + item);
    this.openMenu = false;
    this.back();
    // for (let i = 0; i < this.multiUploadedFiles.length; i++) {
    if (!item.startupload && item.size <= 100450390) {
      this.toastr.success("Uploading...!");
      this.uploadProgress = 0;
      let foldering = item.webkitRelativePath ? item.webkitRelativePath : " ";
      const upload = new Upload(item, {
        endpoint: `${this.API_URL}file/upload?parentId=${parentId}`,
        retryDelays: [0, 1000],
        //overridePatchMethod: true, // Because production-servers-setup doesn't support PATCH http requests
        chunkSize: 1000 * 1000,
        metadata: {
          filename: item.name,
          filetype: item.type,
          token: this.AuthorizartionToken,
          folder: foldering,
        },
        onError: async (error) => {
          // error.toString().includes("No Space Available")
          const toast = await this.toastCtrl.create({
            message: "Upload failed: " + error,
            duration: 3000,
            position: "top",
          });
          this.errormsg = error.toString().includes("No Space Available")
            ? "No Space Available"
            : "Oops, something went wrong. Please try again.";
          this.toastr.warning(this.errormsg);
        },
        onChunkComplete: (chunkSize, bytesAccepted, bytesTotal) => {
          this.uploadProgress = Math.floor((bytesAccepted / bytesTotal) * 100);
          this.commonService.storeUploadProgress(item);
          this.uploadLoader = true;
          item.percentDone = this.uploadProgress;
          item.Uploadcompleted = false;
          this.headerUploadProgress = true;
          this.headerUploadcompleted = false;
          //this.changeDetectionRef.detectChanges();
        },
        onSuccess: async () => {
          // if(item.size > 9771209){
            this.commonService.storeStorageinfo(true);
            this.commonService.storeDonutStorageinfo(true);
            // console.log("inside if")
          // }
          this.uploadProgress = 100;
          this.uploadLoader = true;
          this.getshowAllFiles(this.parentId);
          this.getDashboardInfo();
          item.percentDone = this.uploadProgress;
          item.Uploadcompleted = true;
          this.headerUploadProgress = false;
          this.headerUploadcompleted = true;
          //this.changeDetectionRef.detectChanges();
          const toast = await this.toastCtrl.create({
            message: "Upload successful",
            duration: 3000,
            position: "top",
          });
          console.log("onSuccess");
          toast.present();
          if (this.index == this.multiUploadedFiles.length) {
            this.createFolders();
            this.index = 0;
            return;
          }
          this.OnchunkUpload1(
            this.multiUploadedFiles[this.index++],
            this.parentId
          );
        },
      });
      upload.start();
    }
    else {
      this.toastr.warning("File which is more than 100 MB cannot upload", item.name,{timeOut :  10000})
      if (this.index == this.multiUploadedFiles.length) {
        this.index = 0;
        return;
      }
      this.OnchunkUpload1(
        this.multiUploadedFiles[this.index++],
        this.parentId
      );
    }
  }

  //chunkUpload
  OnchunkUpload(multiUploadedFiles, parentId) {
    this.openMenu = false;
    this.back();
    this.multiUploadedFiles.push(...multiUploadedFiles);
    for (let i = 0; i < this.multiUploadedFiles.length; i++) {
      if (!this.multiUploadedFiles[i].startupload) {
        this.toastr.success("Uploading...!");
        this.uploadProgress = 0;
        this.uploadLoader = true;
        const upload = new Upload(this.multiUploadedFiles[i], {
          endpoint: `${this.API_URL}file/upload?parentId=${parentId}`,
          retryDelays: [0, 1000],
          chunkSize: 1000 * 1000,
          metadata: {
            filename: this.multiUploadedFiles[i].name,
            filetype: this.multiUploadedFiles[i].type,
            token: this.AuthorizartionToken,
          },
          onError: async (error) => {
            // error.toString().includes("No Space Available")
            const toast = await this.toastCtrl.create({
              message: "Upload failed: " + error,
              duration: 3000,
              position: "top",
            });
            this.errormsg = error.toString().includes("No Space Available")
              ? "No Space Available"
              : "Oops, something went wrong. Please try again.";
            this.toastr.warning(this.errormsg);
          },
          onChunkComplete: (chunkSize, bytesAccepted, bytesTotal) => {
            this.uploadProgress = Math.floor(
              (bytesAccepted / bytesTotal) * 100
            );
            this.commonService.storeUploadProgress(this.multiUploadedFiles[i]);
            this.uploadLoader = true;
            this.multiUploadedFiles[i].percentDone = this.uploadProgress;
            this.multiUploadedFiles[i].Uploadcompleted = false;
            this.headerUploadProgress = true;
            this.headerUploadcompleted = false;
            //this.changeDetectionRef.detectChanges();
          },
          onSuccess: async () => {
            this.uploadProgress = 100;
            this.uploadLoader = true;
            this.getshowAllFiles(this.parentId);
            this.recentActivity();
            this.commonService.storeStorageinfo(true);
            // this.commonService.getDashboardInfo();
            this.getDashboardInfo();
            this.multiUploadedFiles[i].percentDone = this.uploadProgress;
            this.multiUploadedFiles[i].Uploadcompleted = true;
            this.headerUploadProgress = false;
            this.headerUploadcompleted = true;
            //this.changeDetectionRef.detectChanges();
            const toast = await this.toastCtrl.create({
              message: "Upload successful",
              duration: 3000,
              position: "top",
            });
            console.log("onSuccess");
            toast.present();
          },
        });

        upload.start();
      }
    }
  }

  OnNewLink() {
    console.log("saodcsqsqsqsqqsqsqdcscdscdscds");
  }
  OnNewFolder() {
    //this.ngxService.start();
    let mimeType = "any";
    this.commonService
      .CreateNewFile(this.newFolderName, mimeType, this.parentId)
      .subscribe(
        (data) => {
          this.ngxService.stop();
          this.newFolder = false;
          if (data.responseCode === 201) {
            this.openMenu = false;
            this.toastr.success("Folder Created Successfully");
            this.getshowAllFiles(this.parentId);
            // this.commonService.storeStorageinfo(true);
            this.recentActivity();
            this.getDashboardInfo();
            // this.commonService.getDashboardInfo();
            this.newFolderName = "";
            this.errorFolder = "";
          } else if (data.responseCode === 406) {
            this.toastr.error(data["message"]);
            this.openMenu = false;
            this.back();
            this.newFolderName = "";
          }
        },
        (error) => {
          this.newFolderName = "";
          this.newFolder = false;
          this.ngxService.stop();
          this.openMenu = false;
          this.back();
          if (error.status === 400) {
            this.toastr.error("Please Enter the Name");
            // this.errorFolder = "Please Enter New Folder Name";
            this.errorTextDoc = "";
            this.openMenu = true;
            this.newFolder = true;
          }
        }
      );
  }

  onFocusInNewFolder() {
    this.errorFolder = "";
    this.errorTextDoc = "";
  }

  getFolderByFilter(mimeType) {
    return this.uploadedFile.filter((x) => x.mimeType === mimeType);
  }

  getFilesByFilter(mimeType) {
    return this.uploadedFile.filter((x) => x.mimeType != mimeType);
  }

  getshowAllFiles(parentId) {
    //this.ngxService.start();
    let data = {
      parentId: parentId,
      step: 10,
    };
    this.commonService.showAllFiles(data).subscribe((result: any) => {
      this.ngxService.stop();
      this.photo = [];
      this.commonService.getDashboardInfo();
      this.uploadedFile = result.childern;
      this.uploadedFolder = this.getFolderByFilter("httpd/unix-directory");
      this.uploadedFolderLength = this.uploadedFolder.length;
      this.uploadedDocuments = this.getFilesByFilter("httpd/unix-directory");
      this.uploadedDocumentsLength = this.uploadedDocuments.length;
      for (let i = 0; i < this.uploadedDocuments.length; i++) {
        if (
          this.commonService.base64regex.test(this.uploadedDocuments[i].icon) ==
          true
        ) {
          this.uploadedDocuments[i].icon =
            "data:image/png;base64," + this.uploadedDocuments[i].icon;
        }
        let mimeType = this.uploadedDocuments[i].mimeType;
        this.uploadedDocuments[i].modifiedAt = moment(
          this.uploadedDocuments[i].modifiedAt
        ).fromNow();
        let size = this.getReadableFileSizeString(
          this.uploadedDocuments[i].size
        );
        this.uploadedDocuments[i].size = size;
        if (!mimetypes[mimeType]) {
          this.uploadedDocuments[i].mimeType = "UNKNOWN";
        }
        if (
          mimeType == "image/png" ||
          mimeType == "image/jpg" ||
          mimeType == "image/jpeg" ||
          mimeType == "image/gif"
        ) {
          this.photo.push(this.uploadedDocuments[i]);
        }
      }
      for (let i = 0; i < this.uploadedFolder.length; i++) {
        let size = this.getReadableFileSizeString(this.uploadedFolder[i].size);
        this.uploadedFolder[i].size = size;
        this.uploadedFolder[i].modifiedAt = moment(
          this.uploadedFolder[i].modifiedAt
        ).fromNow();
      }
    });
  }

  recentActivity() {
    //this.ngxService.start();
    let data = {
      date: moment(new Date()).format("DD/M/YYYY"),
      recentActivity: true,
    };
    this.activityService.getActivitiesList(data).subscribe((result: any) => {
      this.activityList = result;
      this.activityList = this.getFilesByactivityAction("USER_LOGIN");
      this.activityList = this.activityList.slice(0, 5);
      this.ngxService.stop();
      for (let i = 0; i < this.activityList.length; i++) {
        if (this.activityList[i].userName == this.userName) {
          this.activityList[i].userName = "You";
        }
        this.activityList[i].activityAction = this.activityList[
          i
        ].activityAction
          .replace("FILE_", "")
          .toLowerCase();
        this.activityList[i].objectMetadata = this.activityList[
          i
        ].objectMetadata.replace("{filename=", " ");
        this.activityList[i].objectMetadata = this.activityList[
          i
        ].objectMetadata.replace("}", " ");
        this.activityList[i].objectMetadata = this.activityList[
          i
        ].objectMetadata.replace("}", " ");
        this.activityList[i].objectMetadata = this.activityList[
          i
        ].objectMetadata.replace("[", " ");
        this.activityList[i].objectMetadata = this.activityList[
          i
        ].objectMetadata.replace("]", " ");
        this.activityList[i].timestamp = moment(
          this.activityList[i].timestamp
        ).format("DD/M/YYYY HH:mm A");
      }
    });
  }

  getFilesByactivityAction(activityAction) {
    return this.activityList.filter((x) => x.activityAction != activityAction);
  }

  OnopenFile(id, mimeType, title) {
    if (id && this.reNameFile === true) {
      switch (mimetypes[mimeType].editor) {
        case "FOLDER":
          this.parentId = id;
          this.getshowAllFiles(id);
          break;
        case "PDF_VIEWER":
          this.viwePdfViwer(id, title);
          break;
        case "IMAGE_VIEWER":
          this.viewPhoto(id, title);
          break;
        case "TEXT_EDITOR":
          console.log("88888888888888");
          this.viewTextEdit(id, title);
          break;
        case "AUDIO_PLAYER":
          this.viewAudio(id, title);
          break;
        case "DOC_EDITOR":
          this.openOffice(id, title);
          break;
        case "VIDEO_PLAYER":
          this.viewVideo(id, title);
          break;
        case "UNKNOWN":
          this.OnDownload(id);
          break;
      }
    }
  }

  OnRename(id, title) {
    this.reNameDoc = title;
    this.reNameFile = false;
    this.reNameId = id;
  }

  OnCreateNewName($event) {
    this.reName = $event.target.value;
  }

  async openOffice(fileid, title) {
    this.popover = await this.popoverController.create({
      componentProps: {
        fileid: fileid,
        fileTitle: title,
        isShared: false,
      },
      component: CollaboraComponent,
      cssClass: "modal-fullscreen",
    });
    await this.popover.present();
    return this.popover.onDidDismiss().then((data) => { });
  }
  OnreNameFiles(id) {
    //this.ngxService.start();
    if (this.reName === this.reNameDoc || this.reName == " ") {
      this.ngxService.stop();
      this.reNameFile = true;
    } else {
      this.commonService.CreateReName(id, this.reName).subscribe(
        (data) => {
          if (data.code == 200) {
            this.ngxService.stop();
            this.reNameFile = true;
            this.getshowAllFiles(this.parentId);
            this.recentActivity();
            this.toastr.success("File Renamed Successfully");
          } else if (data.code == 304) {
            this.ngxService.stop();
            this.reNameFile = true;
            this.getshowAllFiles(this.parentId);
            this.toastr.error(data.message);
          }
          this.reName = "";
          this.onFocusInput = false;
        },
        (error) => {
          this.reNameFile = true;
          this.ngxService.stop();
        }
      );
    }
  }

  trashFile(FilesId, itemCount) {
    if (itemCount > 0) {
      this.deleteFileConfirm(FilesId);
    } else {
      this.fileId = FilesId;
      if (this.fileId.length > 0) {
        this.fileId = FilesId;
      } else {
        this.fileId = [FilesId];
      }
      this.deleteFileId = {
        fileIds: this.fileId,
        restoreFile: false,
        trashFile: true,
      };
      //this.ngxService.start();
      this.filesService.trashFiles(this.deleteFileId).subscribe(
        (result: any) => {
          this.getshowAllFiles(this.parentId);
          this.toastr.success(result["message"]);
          this.recentActivity();
          this.ngxService.stop();
          this.toastr.success(result["message"]);
          if (result.status === 400) {
            this.ngxService.stop();
          }
        },
        (error) => {
          this.ngxService.stop();
        }
      );
    }
  }

  async deleteFileConfirm(id) {
    this.popover = await this.popoverController.create({
      component: FileDeleteConfirmComponent,
      keyboardClose: false,
      translucent: true,
      componentProps: {
        id: id,
        type: "files",
      },
      backdropDismiss: false,
      cssClass: "custom-popupclass",
    });

    await this.popover.present();

    return this.popover.onDidDismiss().then((data) => {
      if (data.data) {
        this.trashFile(id, 0);
      }
    });
  }

  // define a function to download files
  OnDownload(id): void {
    let downloadFilesId = {
      fileId: [id],
    };
    //this.ngxService.start();
    this.filesService.downloadFiles(downloadFilesId).subscribe(
      (event: any) => {
        this.ngxService.stop();
        this.resportProgress(event);
        this.toastr.success("Download Successfully");
      },
      (error: HttpErrorResponse) => {
        this.ngxService.stop();
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, "Uploading... ");
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
        }
        this.fileStatus.status = "done";
        break;
      default:
        break;
    }
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
    //this.ngxService.start();
    this.filesService
      .addFavorites(this.favoriteFile)
      .subscribe((result: any) => {
        this.getshowAllFiles(this.parentId);
        this.recentActivity();
        this.ngxService.stop();
        if (result.flag === true) {
          this.toastr.success("Added favorite to your File / Folder");
        } else {
          this.toastr.success("Removed favorite to your File / Folder");
        }
      });
  }

  async viwePdfViwer(fileid, title) {
    this.popover = await this.popoverController.create({
      componentProps: {
        fileid: fileid,
        fileTitle: title,
        sharedType: "files",
      },
      component: PdfViwerComponent,
      cssClass: "modal-fullscreen",
    });
    return this.popover.present();
  }

  async viewTextEdit(fileid, title) {
    this.popover = await this.popoverController.create({
      componentProps: {
        fileid: fileid,
        fileTitle: title,
        sharedType: "files",
      },
      component: TextEditorComponent,
    });
    return this.popover.present();
  }

  // async viewPhoto(fileid, title) {
  //   this.popover = await this.popoverController.create({
  //     componentProps: {
  //       fileid: fileid,
  //       fileTitle: title,
  //       sharedType: "files",
  //       photos: this.photo,
  //       page: "files",
  //     },
  //     component: PhotoViewerComponent,
  //   });
  //   return this.popover.present();
  // }
  viewPhoto(id, title) {
    console.log(title, id,
      this.sharedType,
      this.ParentID,
      this.filesType,
      this.SharedFileID, "dataaaaaae4rr");
    console.log('show');
    this.filesService
      .getBase64ofFile(
        id,
        this.sharedType,
        this.ParentID,
        this.filesType,
        this.SharedFileID
      )
      .subscribe(
        (result: any) => {
          if (this.commonService.base64regex.test(result.src) == true) {
            this.uploadedPhoto = "data:image/png;base64," + result.src;
            // console.log(this.uploadedPhoto)
          } else {
            this.uploadedPhoto = result.src;
            this.photo_id = result.id;
            this.pic_title = result.title;
            // console.log(this.uploadedPhoto);
            // console.log(this.pic_title);
          }
        })


    this.previewService.open(this.preview).subscribe({
      complete: () => console.info('complete')
    });

  }
  get previewContent(): PolymorpheusContent {

    return 'this.uploadedPhoto'

  }


  // async viewVideo(fileid, title) {
  //   this.popover = await this.popoverController.create({
  //     componentProps: {
  //       fileid: fileid,
  //       fileTitle: title,
  //       sharedType: "files",
  //     },
  //     backdropDismiss: false,
  //     component: VideoPlayerComponent,
  //   });
  //   return this.popover.present();
  // }
  viewVideo(fileid, title) {
    this.file_id = fileid;
    console.log(title);
    this.vid_title = title;
    if (this.sharedType == "files" || this.sharedType == "self") {
      this.url =
        environment.apiUrl +
        "video/playVideo/" +
        fileid +
        "?isShared=false&token=" +
        localStorage.getItem("token");
    } else if (this.sharedType == "others" && this.filesType == "") {
      this.url =
        environment.apiUrl +
        "video/playVideo/" +
        fileid +
        "?isShared=true&token=" +
        localStorage.getItem("token");
    } else if (
      this.filesType == "insideFolder" &&
      this.sharedType == "others"
    ) {
      this.url =
        environment.apiUrl +
        "video/playSharedWithMeFiles/" +
        fileid +
        "?isShared=true&token=" +
        localStorage.getItem("token") +
        "&folderId=" +
        this.parentId;
    }
    let data;
    if (this.sharedType == "files" || this.sharedType == "self") {
      data =
        fileid + "?isShared=false&token=" + localStorage.getItem("token");
    } else if (this.sharedType == "others" && this.filesType == "") {
      data =
        fileid + "?isShared=true&token=" + localStorage.getItem("token");
    } else if (
      this.filesType == "insideFolder" &&
      this.sharedType == "others"
    ) {
      data =
        fileid +
        "?isShared=true&token=" +
        localStorage.getItem("token") +
        "&folderId=" +
        this.parentId;
    }
    this.filesService.viewVideo(data).subscribe((result: any) => {
      //for safe image
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(result.value);
      // console.log(this.url);
      this.minio = result.object;
    });
    this.previewService.open(this.content || '').subscribe();
  }

  async viewAudio(fileid, title) {
    this.popover = await this.popoverController.create({
      componentProps: {
        fileid: fileid,
        fileTitle: title,
        sharedType: "files",
      },
      backdropDismiss: false,
      component: AudioPlayerComponent,
    });
    return this.popover.present();
  }

  async documentShare(id, type, title) {
    this.popover = await this.popoverController.create({
      component: SharingComponent,
      keyboardClose: false,
      translucent: true,
      componentProps: {
        id: id,
        sharedType: "files",
        Accesstype: type,
        title: title,
      },
      backdropDismiss: false,
      cssClass: "custom-popupclass",
    });
    await this.popover.present();
    return this.popover.onDidDismiss().then((data) => {
      this.getshowAllFiles(localStorage.getItem("parentId"));
      this.recentActivity();
    });
  }

  OnNewTextDoc() {
    //this.ngxService.start();

    console.log(this.newFileName);
    this.newTextDoc = false;
    let data = {
      content: "",
      fileName: this.newFileName,
      id: this.parentId,
      newFile: true,
    };
    this.commonService.saveTextFile(data).subscribe(
      (result: any) => {
        if (result.code === 200) {
          this.openMenu = false;
          this.back();
          this.toastr.success(result["message"]);
          this.getshowAllFiles(this.parentId);
          this.getDashboardInfo();
          this.commonService.storeStorageinfo(true);
          this.recentActivity();
          this.errorTextDoc = "";
          this.newFileName = "";
        } else if (result.code === 302) {
          this.toastr.error(result["message"]);
          this.openMenu = false;
          this.back();
          this.newFileName = "";
        }
        this.ngxService.stop();
        this.openMenu = false;
        this.back();
      },
      (error) => {
        this.newFileName = "";
        this.ngxService.stop();
        this.openMenu = false;
        this.back();
        if (error.status === 400) {
          this.toastr.error("Please Enter the Name");
          // this.errorTextDoc = "Please Enter New Text Document Name";
          this.errorFolder = "";
          this.openMenu = true;
          // this.newTextDoc = true;
        }
      }
    );
  }

  async OnmoveOrCopy(fileid) {
    this.popover = await this.popoverController.create({
      componentProps: {
        fileid: fileid,
        parentId: this.parentId,
      },
      component: MoveCopyComponent,
      cssClass: "modal-fullscreen",
    });
    await this.popover.present();
    return this.popover.onDidDismiss().then((data) => {
      this.getshowAllFiles(this.parentId);
      this.recentActivity();
    });
  }

  // get user details
  getUserDetail() {
    //this.ngxService.start();
    this.commonService.userDetails().subscribe((result: any) => {
      this.userDetails = result.users;
      localStorage.setItem("email", this.userDetails.email);
    });
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  // Get  Storage info
  getDashboardInfo() {
    this.commonService.getDashboardInfos().subscribe((result: any) => {
      this.dashboardResult = result;
      this.commonService.storeNotification(
        this.dashboardResult.numberOfNotifications
      );
    });
  }

  //Drag and drop
  dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    const pushfiles = (files) => {
      let fileLength = files.length;
      for (const droppedFile of files) {
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.dropUploadedFiles.push({
              file: file,
              relativePath: droppedFile.relativePath,
            });
            if (fileLength == this.dropUploadedFiles.length) {
              this.OnchunkUpload2(
                this.dropUploadedFiles[this.index++],
                this.parentId
              );
            }
          });
        } else {
          fileLength--;
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          // console.log(droppedFile.relativePath, fileEntry);
          this.emptyFolder.push(droppedFile.relativePath);
        }
      }
    };

    pushfiles(files);

    // setTimeout(() => {
    //   console.log("all files pushed");
    //   console.log("dropUploadedFiles", this.dropUploadedFiles);
    //   this.OnchunkUpload2(this.dropUploadedFiles[this.index++], this.ParentID);
    // }, 3000);
  }

  OnchunkUpload2(item, parentId) {
    // console.log("Uploading file" + item);
    this.openMenu = false;
    this.back();
    // // for (let i = 0; i < this.multiUploadedFiles.length; i++) {
    // if (!item.startupload) {

    this.toastr.success("Uploading...!");
    this.uploadProgress = 0;
    console.log("Uploading file" + item.relativePath);
    let foldering = item.relativePath ? item.relativePath : " ";
    console.log("foldering  OnchunkUpload2");
    const upload = new Upload(item.file, {
      endpoint: `${this.API_URL}file/upload?parentId=${parentId}`,
      retryDelays: [0, 1000],
      //overridePatchMethod: true, // Because production-servers-setup doesn't support PATCH http requests
      chunkSize: 1000 * 1000,
      metadata: {
        filename: item.file.name,
        filetype: item.file.type,
        token: this.AuthorizartionToken,
        folder: foldering,
      },
      onError: async (error) => {
        // error.toString().includes("No Space Available")
        const toast = await this.toastCtrl.create({
          message: "Upload failed: " + error,
          duration: 3000,
          position: "top",
        });
        this.errormsg = error.toString().includes("No Space Available")
          ? "No Space Available"
          : "Oops, something went wrong. Please try again.";
        this.toastr.warning(this.errormsg);
      },
      onChunkComplete: (chunkSize, bytesAccepted, bytesTotal) => {
        this.uploadProgress = Math.floor((bytesAccepted / bytesTotal) * 100);
        this.commonService.storeUploadProgress(item.file);
        this.uploadLoader = true;
        item.file.percentDone = this.uploadProgress;
        item.file.Uploadcompleted = false;
        this.headerUploadProgress = true;
        this.headerUploadcompleted = false;
        //this.changeDetectionRef.detectChanges();
      },
      onSuccess: async () => {
        // if (this.totalSize > 9771209) {
          this.commonService.storeDonutStorageinfo(true);
          this.commonService.storeStorageinfo(true);
          // console.log("inside if")
        // }
        this.uploadProgress = 100;
        this.uploadLoader = true;
        this.getshowAllFiles(this.parentId);
        item.file.percentDone = this.uploadProgress;
        this.getDashboardInfo();
        item.file.Uploadcompleted = true;
        this.headerUploadProgress = false;
        this.headerUploadcompleted = true;
        //this.changeDetectionRef.detectChanges();
        const toast = await this.toastCtrl.create({
          message: "Upload successful",
          duration: 3000,
          position: "top",
        });
        console.log("onSuccess");
        toast.present();
        if (this.index == this.dropUploadedFiles.length) {
          this.dropUploadedFiles = [];
          this.createFolders();

          this.index = 0;
          return;
        }
        this.OnchunkUpload2(
          this.dropUploadedFiles[this.index++],
          this.parentId
        );
      },
    });
    console.log("upload started");
    upload.start();
  }

  createFolders() {
    if (this.emptyFolder.length > 0) {
      this.commonService
        .CreateEmpthyFolderOnUpload(this.emptyFolder, this.parentId)
        .subscribe((data) => {
          console.log("empty folder created", data);
          this.emptyFolder = [];
        });
    } else {
      console.log("empty folder created", this.emptyFolder);
    }
  }

  //Drag and drop
  public dropped1(files: NgxFileDropEntry[]) {
    this.files = files;
    //3
    for (const droppedFile of files) {
      // Is it a file?

      console.log("--------------    ", droppedFile.fileEntry.name);
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        console.log("madhu");
        fileEntry.file((file: File) => {
          this.dropUploadedFiles.push(file);
          for (let i = 0; i < this.dropUploadedFiles.length; i++) {
            this.uploadProgress = 0;
            const upload = new Upload(this.dropUploadedFiles[i], {
              endpoint: `${this.API_URL}file/upload?parentId=${this.parentId}`,
              retryDelays: [0, 3000, 6000, 12000, 24000],
              chunkSize: 1000 * 1000,
              parallelUploads: 1,
              metadata: {
                filename: this.dropUploadedFiles[i].name,
                filetype: this.dropUploadedFiles[i].type,
                token: this.AuthorizartionToken,
              },
              onError: async (error) => {
                const toast = await this.toastCtrl.create({
                  message: "Upload failed: " + error,
                  duration: 3000,
                  position: "top",
                });
                toast.present();
              },
              onChunkComplete: (chunkSize, bytesAccepted, bytesTotal) => {
                this.uploadProgress = Math.floor(
                  (bytesAccepted / bytesTotal) * 100
                );
                this.dropUploadedFiles[i].percentDone = this.uploadProgress;
                this.commonService.storeUploadProgress(
                  this.dropUploadedFiles[i]
                );
                this.dropUploadLoader = true;
                this.dropUploadedFiles[i].Uploadcompleted = false;
                this.headerUploadProgress = true;
                this.headerUploadcompleted = false;
                //this.changeDetectionRef.detectChanges();
              },
              onSuccess: async () => {
                this.uploadProgress = 100;
                this.getshowAllFiles(this.parentId);
                this.recentActivity();
                // this.commonService.getDashboardInfo();
                this.getDashboardInfo();
                this.commonService.storeStorageinfo(true);
                this.commonService.storeDonutStorageinfo(true);
                this.dropUploadedFiles[i].percentDone = this.uploadProgress;
                this.dropUploadLoader = true;
                this.dropUploadedFiles[i].Uploadcompleted = true;
                this.headerUploadProgress = false;
                this.headerUploadcompleted = true;
                //this.changeDetectionRef.detectChanges();
                const toast = await this.toastCtrl.create({
                  message: "Upload successful",
                  duration: 3000,
                  position: "top",
                });
                toast.present();
              },
            });

            upload.start();
          }
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event) { }

  public fileLeave(event) { }
}
