import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  Renderer2,
  Inject,
  HostListener,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { CommonService } from "../../service/common.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from "@angular/common/http";
import * as moment from "moment";
import { FilesService } from "src/app/service/files.service";
import { ToastController, PopoverController } from "@ionic/angular";
import { ToastrService } from "ngx-toastr";
import { saveAs } from "file-saver";
import { MatCheckbox } from "@angular/material/checkbox";
import { FileDeleteConfirmComponent } from "../modalpage/file-delete-confirm/file-delete-confirm.component";
import { PdfViwerComponent } from "../modalpage/pdf-viwer/pdf-viwer.component";
import * as introJs from "intro.js/intro.js";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { TextEditorComponent } from "../modalpage/text-editor/text-editor.component";
import { VideoPlayerComponent } from "../modalpage/video-player/video-player.component";
import { AudioPlayerComponent } from "../modalpage/audio-player/audio-player.component";
import { MoveCopyComponent } from "../modalpage/move-copy/move-copy.component";
import { SharingComponent } from "../modalpage/sharing/sharing.component";
import { PhotoViewerComponent } from "../modalpage/photo-viewer/photo-viewer.component";
import { DOCUMENT } from "@angular/common";
import { PhotosService } from "src/app/service/photos.service";
import { Subscription } from "rxjs";
import { mimetypes } from "src/environments/mimetypes";

import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";
import { Upload } from "tus-js-client";
import { environment } from "src/environments/environment.prod";
import { SimpleOuterSubscriber } from "rxjs/internal/innerSubscribe";
import { CollaboraComponent } from "../layouts/ifame/collabora/collabora.component";

//taiga changes
import { TemplateRef } from "@angular/core";
import { PreviewDialogService } from "@taiga-ui/addon-preview";
import { clamp, TuiSwipe } from "@taiga-ui/cdk";
import { TuiDialogContext, TuiNotificationsService } from "@taiga-ui/core";
import { PolymorpheusContent } from "@tinkoff/ng-polymorpheus";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from "@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector";
import { A } from "@angular/cdk/keycodes";
import { RenameFilesComponent } from "../modalpage/rename-files/rename-files.component";

@Component({
  selector: "app-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.scss"],
})
export class FilesComponent implements OnInit {
  @ViewChild("preview")
  readonly preview?: TemplateRef<TuiDialogContext<void>>;
  @ViewChild("content")
  readonly content?: TemplateRef<TuiDialogContext<void>>;
  introJS = introJs();
  fullImage: any[];
  currentIndex;
  uploadedPhoto: any;
  photo_id: any;
  pic_title: any;
  vid_title: any;
  file_id: any;
  uploadedPhto: string;
  selectedpic: string;
  @HostListener("scroll", ["$event"]) scrolled() {}
  index = 0;
  // id=0;
  length;
  filesType: any = "";
  SharedFileID: number = -1;
  newFolder: boolean = false;
  newTextDoc: boolean = false;
  newDoc: boolean = false;
  newSpreadsheet = false;
  newPresentation = false;
  newFolderName: any;
  public selectedFile: any = File;
  resData: any;
  uploadedFile: any = [];
  fileListView: boolean = true;
  fileGridView: boolean = false;
  image: any;
  reNameFile: boolean = true;
  reNameId: any;
  reName: any;
  ParentID = localStorage.getItem("parentId");
  filesLength: any;
  breadcrumb: any = [];
  breadcrumbfiles: any = [];
  deleteFileId: any = [];
  favoriteFile: any = [];
  downloadFilesId: any = [];
  title: any;
  id: any;
  mimes = mimetypes;
  selectedFiles: any = [];
  selectedId: any = [];
  fileId: any = [];
  downloadID: any = [];
  multiSelect: boolean = false;
  allSelected: boolean = false;
  linkForm: FormGroup;
  uploadedFolder: any = [];
  uploadedDocuments: any = [];
  uploadedFolderLength: any;
  uploadedDocumentsLength: any;
  popover: any;
  docsEditor: any;
  filenames: string[] = [];
  fileStatus = { status: "", requestType: "", percent: 0 };
  @ViewChildren("checkbox") checkbox: QueryList<ElementRef>;
  unselectId: any;
  page: number = 1;
  allFilesData: any = [];
  filesCount: any;
  openFolder: boolean = false;
  sortList: any = "Modified At";
  sortValue = "modifiedAt";
  removable: boolean = true;
  newLink: boolean = false;
  direction = "";

  pageEvent: PageEvent;
  pageSize: number = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("toggleButton") toggleButton: ElementRef;
  @ViewChild("menu") menu: ElementRef;
  viewDetails: boolean = false;
  newFileName: any = "";
  uploadLoader: boolean = false;
  dropUploadLoader: boolean = false;
  UploadProgress: boolean = false;
  Uploadcompleted: boolean = false;
  percentDone: any;
  uploadFiles: any = [];
  cancelUpload: boolean = false;
  multiUploadedFiles: any = [];
  // index: number = 0;
  uploadedDoc: any = [];
  cancelUploadCounter: number = 0;
  headerUploadProgress: boolean = false;
  headerUploadcompleted: boolean = false;
  headercancelUpload: boolean = false;
  sharedlength: any;
  openMenu: boolean = false;
  notALink: boolean = true;
  errormsg: any;
  totalSize = 0;
  total: any;
  breadcrumbfileslist: any = [];
  selectedfileLength: any;
  selectedlength: boolean = false;
  multicheckSelect: boolean = false;

  listener: () => void;
  reNameDoc: any;
  onFocusInput: boolean = false;
  @ViewChild("AllselectCheckbox") AllselectCheckbox: ElementRef;
  @ViewChild("SingleselectCheckbox") SingleselectCheckbox: ElementRef;
  firstlogin: any;
  errorTextDoc: string;
  errorFolder: string;
  photo: any = [];
  subscription: Subscription;
  createdTime: boolean = false;
  dashboardResult: any = [];
  extention: any;
  strname: any;
  stringname: any;
  extenstion: any;
  extenstion1: any;
  name: any;
  renameMimeType: any;
  @HostListener("window:mouseup", ["$event"])
  dropUploadedFiles: any = [];
  emptyFolder: any = [];
  selectedOption: boolean = false;
  singleClickSelect: boolean = false;
  previousParent: any;
  mouseUp() {
    if (this.onFocusInput == false) {
      this.reNameFile = true;
    }

    if (this.selectedOption == false) {
      this.multiSelect = false;
      this.HighlightRow = null;
      // this.selectedlength = false;
    }
  }
  HighlightRow: number;
  selectedRows: any = [];
  ClickedRow: any;
  sortOrder: boolean = false;
  public files: NgxFileDropEntry[] = [];
  uploadProgress = 0;
  AuthorizartionToken = localStorage.getItem("token");
  API_URL = environment.apiUrl;
  userDetails: any = [];
  lastPageEvent: boolean = false;
  zindexToggle: boolean = true;
  sharedType: any = "files";
  //video
  url: any;
  parentId: any;
  minio: any = "not minio";
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private ngxService: NgxUiLoaderService,
    private commonService: CommonService,
    private filesService: FilesService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public toastCtrl: ToastController,
    private toastr: ToastrService,
    private popoverController: PopoverController,
    private photosService: PhotosService,
    private renderer: Renderer2,
    @Inject(PreviewDialogService)
    private readonly previewService: PreviewDialogService,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService,
    @Inject(DOCUMENT) private document: Document
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
    route.params.subscribe((val) => {
      this.OnshowAllFiles(localStorage.getItem("parentId"));
      this.commonService.getDashboardInfo();
      this.getUserDetail();
      this.openMenu = false;
      this.back();
      this.newFolder = false;
      this.newTextDoc = false;
      this.newDoc = false;
      this.newSpreadsheet = false;
      this.newPresentation = false;
      this.errorTextDoc = "";
      this.errorFolder = "";
      // this.linkForm.reset;
    });

    this.ClickedRow = function (index, id, clickEvent) {
      // if (clickEvent.ctrlKey) {
      //   let selected = id
      //   for(let i = 0; i < this.selectedFiles.length; i++){
      //     if(selected == this.selectedFiles[i]){
      //       const indexRow = this.selectedFiles.indexOf(selected);
      //       if (indexRow > -1) {
      //         this.selectedFiles.splice(indexRow, 1);
      //       }
      //     }
      //   }
      //   this.selectedFiles.push(selected);
      //   this.selectedRows.push(index)
      //   console.log(this.selectedFiles)
      //   this.HighlightRow = this.selectedRows;
      //   this.multiSelect = true;
      // } else {
      //   this.HighlightRow = index;
      //   this.multiSelect = true;
      //   this.selectedFiles = id;
      // }
      this.HighlightRow = index;
      this.multiSelect = true;
      this.selectedFiles = id;
      this.singleClickSelect = true;
      this.openMenu = false;
      this.AllselectCheckbox["checked"] = false;
      this.allSelected = false;
      // this.multicheckSelect = false;
      this.selectedlength = false;
    };

    this.commonService.storeHeader("Files / All Files");
    this.commonService.storeStorageinfo(true);

    this.subscription = this.commonService.getClick().subscribe((message) => {
      if (message == "click") {
        this.openMenu = false;
        this.back();
        this.newFolder = false;
        this.newTextDoc = false;
        this.newDoc = false;
        this.newSpreadsheet = false;
        this.newPresentation = false;
        this.errorTextDoc = "";
        this.errorFolder = "";
        this.linkForm.reset;
      }
    });

    this.subscription = this.commonService.getpath().subscribe((message) => {
      if (message == "path") {
        this.OnshowAllFiles(localStorage.getItem("parentId"));
        this.ParentID = localStorage.getItem("parentId");
        this.selectedFiles = [];
        this.breadcrumbfiles = [];
        this.openMenu = false;
        this.back();
        this.newFolder = false;
        this.newTextDoc = false;
        this.newDoc = false;
        this.newSpreadsheet = false;
        this.newPresentation = false;
        this.errorTextDoc = "";
        this.errorFolder = "";
        this.linkForm.reset;
      }
    });

    this.introJS.setOptions({
      steps: [
        {
          element: "#step11",
          intro:
            "Add New Document, you can upload files, create folder, create text document, create spreadsheet & create presentation",
          position: "left",
        },
        {
          element: "#step12",
          intro: "Your files & folders count",
          position: "left",
        },
        {
          element: "#step13",
          intro: "You can filter your files & folders",
          position: "left",
        },
        {
          element: "#step14",
          intro: "You can go to list / grid view",
          position: "left",
        },
        {
          element: "#step15",
          intro: "You can multiple trash, download, move, share,..",
          position: "left",
        },
      ],
    });
  }

  ngOnInit() {
    this.firstlogin = localStorage.getItem("firstLogin");
    this.docsEditor = localStorage.getItem("docsEditor");
    this.linkForm = this.fb.group({
      link: new FormControl("", Validators.required),
      URL: new FormControl("", Validators.required),
    });
  }
  allPhotos() {
    this.ngxService.start();
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
        arr.push({ image: i.src, title: i.title });
      });
      this.fullImage = arr;
    });
  }

  onFocusInEvent(event: any) {
    this.onFocusInput = true;
    if (this.onFocusInput == true) {
      this.reNameFile = false;
      this.HighlightRow = null;
      this.multiSelect = false;
      // this.multicheckSelect = false;
    }
  }

  onFocusInMulti(event: any) {
    this.selectedOption = true;
    if (this.selectedOption == true) {
      this.multiSelect = true;
      // this.multicheckSelect = false;
    }
  }

  OnopenMenu() {
    this.openMenu ? this.handleClose() : this.handleOpen();
  }

  OncloseMenu() {
    this.openMenu = false;
    this.linkForm.reset;
    this.back();
  }

  handleOpen() {
    this.openMenu = true;
    this.addListener();
  }

  OngetSortbysortList() {
    this.OngetSort(this.sortList);
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
  }

  handleClose() {
    this.openMenu = false;
    this.linkForm.reset;
    this.newFolder = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
    this.HighlightRow = null;
    this.multiSelect = false;
    // this.multicheckSelect = false;
    this.removeListener();
    this.back();
  }

  //click outside of div it's hide
  addListener() {
    this.listener = this.renderer.listen(document, "click", (event) => {
      const targetEl = event.target as HTMLElement;
      const clickedOutside =
        targetEl.innerHTML.search("panel-menu") > 0 ? true : false;
      clickedOutside ? this.handleClose() : console.log("nothing todo");
    });
  }

  removeListener() {
    this.listener();
  }

  fileListViewShow() {
    this.fileListView = true;
    this.fileGridView = false;
    this.openMenu = false;
    this.linkForm.reset;
    this.newFolder = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
    this.back();
  }
  fileGridViewShow() {
    this.fileGridView = true;
    this.fileListView = false;
    this.openMenu = false;
    this.back();
    this.linkForm.reset;
    this.newFolder = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
  }

  createNewFile() {
    this.newFolder = true;
    this.newTextDoc = false;
    setTimeout(() => {
      var elem = this.renderer.selectRootElement("#newfolder");
      this.renderer.listen(elem, "focus", () => {});
      this.renderer.listen(elem, "blur", () => {});
      elem.focus();
    }, 500);
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
  }
  createNewTextDoc() {
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = true;
    setTimeout(() => {
      var elem = this.renderer.selectRootElement("#newTextDoc");
      this.renderer.listen(elem, "focus", () => {});
      this.renderer.listen(elem, "blur", () => {});
      elem.focus();
    }, 500);
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorFolder = "";
  }

  //docs
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
    if (event.target.files.length <= 20) {
      this.multiUploadedFiles = [];
      this.multiUploadedFiles = event.target.files;
      this.OnchunkUpload1(this.multiUploadedFiles[this.index++], this.ParentID);
    } else if (event.target.files.length > 20) {
      this.toastr.error("You can upload only 20 files at a time");
      this.openMenu = false;
    } else if (event.target.files.size > 100450390) {
      this.toastr.error("One of the file size is more than 100Mb");
      this.openMenu = false;
    }
  }

  //chunkUpload

  public async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  //   async OnchunkUpload(multiUploadedFiles, parentId) {
  //     this.openMenu = false;
  //     this.back();

  //     await this.asyncForEach(multiUploadedFiles, async (file) => {
  //       if (!file.startupload) {
  //         console.log("Uploading");
  //         this.toastr.success("Uploading...!");
  //         this.uploadProgress = 0;

  //         const upload = await new Upload(file, {
  //           endpoint: `${this.API_URL}file/upload?parentId=${parentId}`,
  //           retryDelays: [0, 1000],
  //           //overridePatchMethod: true, // Because production-servers-setup doesn't support PATCH http requests
  //           chunkSize: 1000 * 1000,
  //           metadata: {
  //             filename: file.name,
  //             filetype: file.type,
  //             token: this.AuthorizartionToken,
  //           },
  //           onError: async (error) => {
  //             // error.toString().includes("No Space Available")
  //             const toast = await this.toastCtrl.create({
  //               message: "Upload failed: " + error,
  //               duration: 3000,
  //               position: "top",
  //             });
  //             this.errormsg = error.toString().includes("No Space Available")
  //               ? "No Space Available"
  //               : "Oops, something went wrong. Please try again.";
  //             this.toastr.warning(this.errormsg);
  //           },
  //           onChunkComplete: (chunkSize, bytesAccepted, bytesTotal) => {
  //             this.uploadProgress = Math.floor(
  //               (bytesAccepted / bytesTotal) * 100
  //             );
  //             this.commonService.storeUploadProgress(file);
  //             this.uploadLoader = true;
  //             file.percentDone = this.uploadProgress;
  //             file.Uploadcompleted = false;
  //             this.headerUploadProgress = true;
  //             this.headerUploadcompleted = false;
  //             //this.changeDetectionRef.detectChanges();
  //           },
  //           onSuccess: async () => {
  //             this.uploadProgress = 100;
  //             this.uploadLoader = true;
  //             this.OnshowAllFiles(this.ParentID);
  //             //this.commonService.storeStorageinfo(true);
  //             file.percentDone = this.uploadProgress;
  //             file.Uploadcompleted = true;
  //             this.headerUploadProgress = false;
  //             this.headerUploadcompleted = true;
  //             //this.changeDetectionRef.detectChanges();
  //             const toast = await this.toastCtrl.create({
  //               message: "Upload successful",
  //               duration: 3000,
  //               position: "top",
  //             });
  //             console.log("onSuccess");
  //             toast.present();
  //           },
  //         });

  //         /*   console.log(upload.findPreviousUploads());
  //         upload.findPreviousUploads().then(function (previousUploads) {
  //           // Found previous uploads so we select the first one.
  //           if (previousUploads.length) {
  //             console.log(previousUploads);
  //             upload.resumeFromPreviousUpload(previousUploads[0]);
  //           }
  //         });
  //  */
  //         upload.start();
  //       }
  //     });
  //     // for (let i = 0; i < this.multiUploadedFiles.length; i++) {

  //     // }
  //   }

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
          // if (item.size > 9771209) {
          this.commonService.storeStorageinfo(true);
          // console.log("inside if")
          // }
          this.uploadProgress = 100;
          this.uploadLoader = true;
          this.OnshowAllFiles(this.ParentID);
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
            this.ParentID
          );
        },
      });
      upload.start();
    } else {
      this.toastr.warning(
        "File which is more than 100 MB cannot upload",
        item.name,
        { timeOut: 10000 }
      );
      if (this.index == this.multiUploadedFiles.length) {
        this.index = 0;
        return;
      }
      this.OnchunkUpload1(this.multiUploadedFiles[this.index++], this.ParentID);
    }
  }

  createFolders() {
    if (this.emptyFolder.length > 0) {
      this.commonService
        .CreateEmpthyFolderOnUpload(this.emptyFolder, this.ParentID)
        .subscribe((data) => {
          // console.log("empty folder created", data);
          this.emptyFolder = [];
        });
    } else {
      // console.log("empty folder created", this.emptyFolder);
    }
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
        this.commonService.storeStorageinfo(true);
        // console.log("inside if")
        // }
        this.uploadProgress = 100;
        this.uploadLoader = true;
        this.OnshowAllFiles(this.ParentID);
        item.file.percentDone = this.uploadProgress;
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
          this.ParentID
        );
      },
    });
    console.log("upload started");
    upload.start();
  }

  goToDashboard() {
    let parentID = localStorage.getItem("parentId");
    if (parentID == this.ParentID) {
      this.router.navigate(["/user/dashboard"]);
      this.commonService.storeBackBtnVal("true");
    } else {
      if (this.ParentID == parentID) {
        this.router.navigate(["/user/dashboard"]);
        this.commonService.storeBackBtnVal("true");
      } else {
        this.OnshowAllFiles(this.previousParent);
        this.ParentID = this.previousParent;
        this.selectedFiles = [];
        this.openMenu = false;
        this.linkForm.reset;
        this.newFolder = false;
        this.newLink = false;
        this.newTextDoc = false;
        this.newDoc = false;
        this.newSpreadsheet = false;
        this.newPresentation = false;
        this.errorTextDoc = "";
        this.errorFolder = "";
        this.multiSelect = false;
        // this.multicheckSelect = false;
        this.breadcrumbfiles.pop();
      }
    }
  }

  OnNewFolder() {
    //this.ngxService.start();
    let mimeType = "any";
    this.commonService
      .CreateNewFile(this.newFolderName, mimeType, this.ParentID)
      .subscribe(
        (data) => {
          this.ngxService.stop();
          this.newFolder = false;
          this.openMenu = false;
          this.linkForm.reset;
          if (data.responseCode === 201) {
            this.openMenu = false;
            this.linkForm.reset;
            this.toastr.success("Folder Created Successfully");
            this.OnshowAllFiles(this.ParentID);
            // this.commonService.storeStorageinfo(true);
            this.newFolderName = "";
            this.errorFolder = "";
          } else if (data.responseCode === 406) {
            this.openMenu = false;
            this.linkForm.reset;
            this.toastr.error(data["message"]);
            this.newFolderName = "";
          }
        },
        (error) => {
          this.newFolderName = "";
          this.newFolder = false;
          this.openMenu = false;
          this.linkForm.reset;
          this.ngxService.stop();
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

  get linkFormControls() {
    return this.linkForm.controls;
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
  OnshowAllFiles(parentId) {
    ////this.ngxService.start();
    let data = {
      asc: this.sortOrder,
      pageNb: this.page,
      parentId: parentId,
      sortBy: this.sortValue,
      step: this.pageSize,
    };
    this.filesService.OnshowFiles(data).subscribe(
      (result: any) => {
        this.ngxService.stop();
        this.HighlightRow = null;
        this.multiSelect = false;
        // this.multicheckSelect = false;
        this.photo = [];
        this.previousParent = result.previousParent;
        this.uploadedFile = result.childern;
        // console.log(this.uploadedFile);
        //   console.log(this.uploadedFile);
        //   var arr = [];
        // this.uploadedFile.forEach(function (i) {
        //   arr.push({ image: i.icon, title: i.title })
        // })
        // this.fullImage = arr;
        // console.log(this.fullImage);

        // this.allFilesData = result.childern;
        this.filesCount = result.count;
        this.filesLength = this.uploadedFile.length;
        // if (this.allFilesData.length >= 1) {
        //   this.uploadedFile.push(...this.allFilesData);
        if (this.filesLength == 0 && this.lastPageEvent == true) {
          this.getPevpage();
        }
        this.ParentID = parentId;
        for (let i = 0; i < this.uploadedFile.length; i++) {
          if (
            this.commonService.base64regex.test(this.uploadedFile[i].icon) ==
            true
          ) {
            this.uploadedFile[i].icon =
              "data:image/png;base64," + this.uploadedFile[i].icon;
          }
          this.uploadedFile[i].modifiedAt = moment(
            this.uploadedFile[i].modifiedAt
          ).fromNow();
          this.uploadedFile[i].createdAt = moment(
            this.uploadedFile[i].createdAt
          ).fromNow();
          let size = this.getReadableFileSizeString(this.uploadedFile[i].size);
          this.uploadedFile[i].size = size;
          let mimeType = this.uploadedFile[i].mimeType;

          if (!mimetypes[mimeType]) {
            this.uploadedFile[i].mimeType = "UNKNOWN";
          }

          if (
            mimeType == "image/png" ||
            mimeType == "image/jpg" ||
            mimeType == "image/jpeg" ||
            mimeType == "image/gif" ||
            mimeType == "link"
          ) {
            this.photo.push(this.uploadedFile[i]);
          }
          if (!(mimeType == "httpd/unix-directory")) {
            this.extention = this.uploadedFile[i].title.split(".").pop();
            this.uploadedFile[i].extention = this.extention;
          }
          if (!(mimeType == "httpd/unix-directory")) {
            let extn: any;
            extn = this.uploadedFile[i].title;
            if (extn.indexOf(".") == -1) {
              this.extention = "Unknown";
              this.uploadedFile[i].extention = this.extention;
            }
          }
        }
        // }

        if (result.status === 500) {
          this.ngxService.stop();
        }
      },
      (error) => {
        this.ngxService.stop();
      }
    );
  }

  onScrollDown() {
    this.page = this.page + 1;
    if (this.page > 0) {
      console.log("down scrolled");
      this.OnshowAllFiles(this.ParentID);
    }
  }

  // When scroll up the screen
  //  onScrollUp(){
  //   this.page = this.page - 1;
  //   if(this.page > 0){
  //     console.log("up scrolled")
  //     this.OnshowAllFiles(this.ParentID);
  //   }
  // }

  getPevpage() {
    this.page = 1;
    this.OnshowAllFiles(this.ParentID);
  }

  onPageChange(event: PageEvent) {
    this.lastPageEvent = true;
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.OnshowAllFiles(this.ParentID);
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.AllselectCheckbox["checked"] = false;
    this.multiSelect = false;
    this.allSelected = false;
    // this.multicheckSelect = false;
    this.selectedlength = false;
  }

  OnClickClose() {
    this.openMenu = false;
    this.linkForm.reset;
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
  }

  //Get sort value
  OngetSort(value) {
    this.sortList = value;
    this.removable = true;
    this.sortValue = value;

    if (this.sortOrder == false) {
      this.sortOrder = true;
    } else if (this.sortOrder == true) {
      this.sortOrder = false;
    }
    if (this.sortValue === "Title") {
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
    this.OnshowAllFiles(this.ParentID);
  }

  matChipremove() {
    this.removable = false;
  }

  getReadableFileSizeString(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  back() {
    this.notALink = true;
    // this.linkForm.reset();
  }

  OnopenFile(id, mimeType, title) {
    this.multiSelect = false;
    // this.multicheckSelect = false;
    this.openMenu = false;
    this.linkForm.reset;
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
    this.breadcrumbfileslist.push(id);
    // console.log("breadcrumb", this.breadcrumbfileslist);
    // console.log(id, mimeType, title);
    if (id && this.reNameFile === true) {
      switch (mimetypes[mimeType].editor) {
        case "FOLDER":
          this.openFolder = true;
          this.ParentID = id;
          this.selectedFile = [];
          this.OnshowAllFiles(id);
          this.breadcrumb = {
            title: title,
            id: id,
          };
          this.allSelected = false;
          this.AllselectCheckbox["checked"] = false;
          this.breadcrumbfiles.push(this.breadcrumb);
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

  save() {
    this.openMenu = false;
    let data = {
      url: this.linkForm.value.URL,
      linkName: this.linkForm.value.link,
      mimeType: "link",
      parentId: this.ParentID,
    };
    this.commonService.saveLink(data).subscribe((result: any) => {
      if (result["responseCode"] == 201) {
        this.ngxService.stop();
        this.linkForm.reset();
        this.OnshowAllFiles(this.ParentID);
      }
    });
    this.notALink = true;
    this.OnshowAllFiles(this.ParentID);
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

  // async openOffice(fileid: any, title: any) {
  //   this.popover = await this.popoverController.create({
  //     componentProps: {
  //       fileid: fileid,
  //       fileTitle: title,
  //       sharedType: "files",
  //     },
  //     component: CollaboraComponent,
  //   });
  //   await this.popover.present();
  //   return this.popover.onDidDismiss().then((data) => {
  //     this.OnshowAllFiles(this.ParentID);
  //   });
  // }

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
    return this.popover.onDidDismiss().then((data) => {
      this.OnshowAllFiles(this.ParentID);
    });
  }

  OnRename(id, title, mimeType) {
    this.reNameDoc = title;
    this.reNameFile = false;
    this.reNameId = id;
    this.renameMimeType = mimeType;
    this.strname = this.reNameDoc;
    if (this.renameMimeType == "httpd/unix-directory") {
      this.strname = this.reNameDoc;
    } else {
      //  this.strname = this.strname.split(".").shift();
      const index = title.lastIndexOf(".");
      this.strname = title.substring(0, index);
      this.extenstion = this.reNameDoc.split(".").pop();
    }
  }

  OnCreateNewName($event) {
    this.reName = $event.target.value;
    this.HighlightRow = null;
    this.multiSelect = false;
    // this.multicheckSelect = false;
    if (
      !(this.renameMimeType == "httpd/unix-directory") &&
      !(this.renameMimeType == "link")
    ) {
      this.name = this.reName + "." + this.extenstion;
    } else {
      this.name = this.reName;
    }
  }

  OnreNameFiles(id) {
    if (this.reName === this.reNameDoc || this.reName == " ") {
      this.ngxService.stop();
      this.reNameFile = true;
    } else {
      this.commonService.CreateReName(id, this.name).subscribe(
        (data) => {
          if (data.code == 200) {
            this.ngxService.stop();
            this.reNameFile = true;
            this.HighlightRow = null;
            this.OnshowAllFiles(this.ParentID);
            this.toastr.success("File Renamed Successfully");
          } else if (data.code == 304) {
            this.ngxService.stop();
            this.reNameFile = true;
            this.OnshowAllFiles(this.ParentID);
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
          this.OnshowAllFiles(this.ParentID);
          this.commonService.storeStorageinfo(true);
          this.AllselectCheckbox["checked"] = false;
          this.allSelected = false;
          this.ngxService.stop();
          this.toastr.success(result["message"]);
          this.selectedFiles = [];
          this.multiSelect = false;
          // this.multicheckSelect = false;
          this.selectedlength = false;
          if (result.status === 400) {
            this.ngxService.stop();
          }
        },
        (error) => {
          this.ngxService.stop();
        }
      );
      this.selectedFiles = [];
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
        this.selectedFiles = [];
        this.selectedlength = false;
      }
    });
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
      this.OnshowAllFiles(this.ParentID);
      if (this.ParentID == localStorage.getItem("searchedId")) {
        this.multiSelect = false;
        // this.multicheckSelect = false;
        this.AllselectCheckbox["checked"] = false;
        this.allSelected = false;
        this.selectedFiles = [];
        this.breadcrumbfiles = [];
      }
    });
  }

  async OnRenameMobile(id, title, mimeType) {
    this.reNameDoc = title;
    this.reNameId = id;
    this.renameMimeType = mimeType;
    this.stringname = this.reNameDoc;
    this.stringname = this.stringname.split(".").shift();
    this.extenstion1 = this.reNameDoc.split(".").pop();
    this.popover = await this.popoverController.create({
      component: RenameFilesComponent,
      keyboardClose: false,
      translucent: true,
      componentProps: {
        id: id,
        MimeType: mimeType,
        title: this.stringname,
        extension: this.extenstion1,
      },
      backdropDismiss: false,
      cssClass: "custom-popupclass",
    });
    await this.popover.present();
    return this.popover.onDidDismiss().then((data) => {
      this.OnshowAllFiles(this.ParentID);
    });
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
        this.OnshowAllFiles(this.ParentID);
        this.ngxService.stop();
        if (result.flag === true) {
          this.toastr.success("Added favorite to your File / Folder");
        } else {
          this.toastr.success("Removed favorite to your File / Folder");
        }
      });
  }

  Onbackbreadcrumb(id, title) {
    let index = this.breadcrumbfileslist.findIndex((x) => x === id);
    this.breadcrumbfileslist.splice(index + 1);
    this.breadcrumbfileslist.length = index + 1;
    if (id) {
      this.breadcrumbfiles.length = index + 1;
      this.OnshowAllFiles(id);
      this.ParentID = id;
      this.OnshowAllFiles(id);
    }
  }

  OnhomeFiles() {
    this.page = 1;
    this.OnshowAllFiles(localStorage.getItem("parentId"));
    this.ParentID = localStorage.getItem("parentId");
    this.selectedFiles = [];
    this.openMenu = false;
    this.linkForm.reset;
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
    this.multiSelect = false;
    this.breadcrumbfiles = [];
    this.AllselectCheckbox["checked"] = false;
    this.allSelected = false;
    // this.multicheckSelect = false;
    this.selectedlength = false;
  }

  // define a function to download files
  OnDownload(filesid): void {
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
        this.multicheckSelect = false;
      },
      (error: HttpErrorResponse) => {
        this.ngxService.stop();
      }
    );
    this.OnshowAllFiles(this.ParentID);
    this.selectedlength = false;
    this.HighlightRow = null;
    this.AllselectCheckbox["checked"] = false;
    this.selectedFiles = [];
    this.allSelected = false;
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

  private updateStatus(
    loaded: number,
    total: number,
    requestType: string
  ): void {
    this.fileStatus.status = "progress";
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round((100 * loaded) / total);
  }

  // getSelectedFiles(checkbox: MatCheckbox) {
  //   if (this.singleClickSelect == true) {
  //     this.selectedFiles = [];
  //     this.allSelected = false;
  //     this.multiSelect = false;
  //     this.multicheckSelect = false;
  //     this.selectedlength = false;
  //   }
  //   this.openMenu = false;
  //   this.linkForm.reset;
  //   this.newFolder = false;
  //   this.newLink = false;
  //   this.newTextDoc = false;
  //   this.newDoc = false;
  //   this.newSpreadsheet = false;
  //   this.newPresentation = false;
  //   this.errorTextDoc = "";
  //   this.errorFolder = "";
  //   if (checkbox.checked === false) {
  //     // this.singleClickSelect = false;
  //     this.selectedFiles.push(checkbox.value);
  //     // this.multiSelect = false;
  //     this.multiSelect = true;
  //   } else if (checkbox.checked === true) {
  //     this.singleClickSelect = false;
  //     this.multiSelect = false;
  //     this.multiSelect = true;
  //     this.singleClickSelect = false;
  //     const index = this.selectedFiles.indexOf(checkbox.value);
  //     if (index > -1) {
  //       this.selectedFiles.splice(index, 1);
  //     }
  //     if (this.selectedFiles.length === 0) {
  //       this.multiSelect = false;
  //       this.multicheckSelect = false;
  //       this.selectedlength = false;
  //     }
  //   }
  // }

  getSelectedFiles(checkbox: MatCheckbox) {
    if (this.singleClickSelect == true) {
      this.selectedFiles = [];
      this.allSelected = false;
      this.multiSelect = false;
      this.multicheckSelect = false;
      this.selectedlength = false;
    }
    this.openMenu = false;
    this.linkForm.reset;
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";

    if (checkbox.checked === false) {
      this.singleClickSelect = false;
      this.selectedFiles.push(checkbox.value);
      this.multiSelect = true;
    } else if (checkbox.checked === true) {
      this.singleClickSelect = false;
      this.multiSelect = true;
      const index = this.selectedFiles.indexOf(checkbox.value);
      if (index > -1) {
        this.selectedFiles.splice(index, 1);
      }
      if (this.selectedFiles.length === 0) {
        this.multiSelect = false;
        this.multicheckSelect = false;
        this.selectedlength = false;
      }
    }
  }

  getAllSelected(checkbox: MatCheckbox) {
    this.singleClickSelect = false;
    this.openMenu = false;
    this.linkForm.reset;
    this.newLink = false;
    this.newFolder = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
    if (checkbox.checked === false) {
      this.allSelected = true;
      this.multiSelect = false;
      // this.multicheckSelect = false;
      this.selectedlength = false;
      let selected: any = [];
      selected = checkbox.value;
      for (let i = 0; i < selected.length; i++) {
        this.selectedfileLength = selected.length;
        this.selectedlength = true;
        this.selectedFiles.push(selected[i].id);
        // this.multiSelect = false;
        this.multiSelect = true;
      }
    } else if (checkbox.checked === true) {
      const index = this.selectedFiles.indexOf(checkbox.value);
      if (index > -1) {
        this.selectedFiles.splice(index, 1);
      }
      this.allSelected = false;
      this.selectedFiles.length = 0;
      if (this.selectedFiles.length === 0) {
        this.multiSelect = false;
        // this.multicheckSelect = false;
        this.selectedlength = false;
      }
    }
  }

  OnNewTextDoc() {
    //this.ngxService.start();
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    let data = {
      content: "",
      fileName: this.newFileName,
      id: this.ParentID,
      newFile: true,
    };
    this.commonService.saveTextFile(data).subscribe(
      (result: any) => {
        if (result.code === 200) {
          this.openMenu = false;
          this.linkForm.reset;
          this.toastr.success(result["message"]);
          this.OnshowAllFiles(this.ParentID);
          this.commonService.storeStorageinfo(true);
          this.newFileName = "";
          this.errorTextDoc = "";
        } else if (result.code === 302) {
          this.toastr.error(result["message"]);
          this.openMenu = false;
          this.linkForm.reset;
          this.newFileName = "";
        }
        this.ngxService.stop();
        this.openMenu = false;
      },
      (error) => {
        this.ngxService.stop();
        this.newFileName = "";
        this.openMenu = false;
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

  OnNewDoc() {
    //this.ngxService.start();
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    let data = {
      content: "",
      fileName: this.newFileName,
      id: this.ParentID,
      newFile: true,
    };
    this.commonService.saveTextFile(data).subscribe(
      (result: any) => {
        if (result.code === 200) {
          this.openMenu = false;
          this.linkForm.reset;
          this.toastr.success(result["message"]);
          this.OnshowAllFiles(this.ParentID);
          this.commonService.storeStorageinfo(true);
          this.newFileName = "";
          this.errorTextDoc = "";
        } else if (result.code === 302) {
          this.toastr.error(result["message"]);
          this.openMenu = false;
          this.linkForm.reset;
          this.newFileName = "";
        }
        this.ngxService.stop();
        this.openMenu = false;
      },
      (error) => {
        this.ngxService.stop();
        this.newFileName = "";
        this.openMenu = false;
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
    await this.popover.present();
    return this.popover.onDidDismiss().then((data) => {
      this.OnshowAllFiles(this.ParentID);
    });
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
    await this.popover.present();
    return this.popover.onDidDismiss().then((data) => {
      this.OnshowAllFiles(this.ParentID);
    });
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
  //   await this.popover.present();
  //   return this.popover.onDidDismiss().then((data) => {
  //     this.OnshowAllFiles(this.ParentID);
  //   });
  // }

  async viewPhoto(id, title) {
    // console.log(title,id,
    //   this.sharedType,
    //   this.ParentID,
    //   this.filesType,
    //   this.SharedFileID,"dataaaaaae4rr");
    // alert('hello');

    // console.log('show');
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
          console.log(this.uploadedPhto);
          console.log(this.pic_title);
        }
        this.previewService.open(this.preview).subscribe({
          complete: () => console.info("complete"),
        });
      });
  }
  get previewContent(): PolymorpheusContent {
    this.selectedpic = this.uploadedPhto;
    return this.selectedpic;
  }
  //download files in viewer
  download(filesid): void {
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
    this.OnshowAllFiles(this.ParentID);
    this.HighlightRow = null;
    this.AllselectCheckbox["checked"] = false;
    this.selectedFiles = [];
    this.allSelected = false;
  }

  // async viewVideo(fileid, title) {
  //   this.popover = await this.popoverController.create({
  //     componentProps: {
  //       fileid: fileid,
  //       fileTitle: title,
  //       sharedType: "files",
  //     },
  //     backdropDismiss: false,
  //     component: TaigaVideoComponent,
  //   });
  //   await this.popover.present();
  //   return this.popover.onDidDismiss().then((data) => {
  //     this.OnshowAllFiles(this.ParentID);
  //   });
  // }
  viewVideo(fileid, title) {
    this.file_id = fileid;
    // console.log(title);
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
      data = fileid + "?isShared=false&token=" + localStorage.getItem("token");
    } else if (this.sharedType == "others" && this.filesType == "") {
      data = fileid + "?isShared=true&token=" + localStorage.getItem("token");
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
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(result.value);
      // console.log(this.url);

      this.minio = result.object;
    });
    this.previewService.open(this.content || "").subscribe();
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
    await this.popover.present();
    return this.popover.onDidDismiss().then((data) => {
      this.OnshowAllFiles(this.ParentID);
    });
  }

  takeFilesTour() {
    this.openMenu = false;
    this.linkForm.reset;
    this.newFolder = false;
    this.newLink = false;
    this.newTextDoc = false;
    this.newDoc = false;
    this.newSpreadsheet = false;
    this.newPresentation = false;
    this.errorTextDoc = "";
    this.errorFolder = "";
    this.introJS.start();
  }

  async OnmoveOrCopy(fileid) {
    this.popover = await this.popoverController.create({
      componentProps: {
        fileid: fileid,
        parentId: localStorage.getItem("parentId"),
      },
      component: MoveCopyComponent,
      cssClass: "modal-fullscreen",
    });
    await this.popover.present();
    return this.popover.onDidDismiss().then((data) => {
      if (data.data != undefined && data.data != "") {
        this.OnshowAllFiles(data.data);
        // this.OnshowAllFiles(this.ParentID);
        this.breadcrumbfiles = data.role;
      } else {
        this.OnshowAllFiles(this.ParentID);
        // this.breadcrumbfiles = [];
      }
      // this.breadcrumbfiles = [];
      this.multiSelect = false;
      this.multicheckSelect = false;
      this.selectedFiles = [];
      this.selectedlength = false;
      this.AllselectCheckbox["checked"] = false;
      this.allSelected = false;
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
                this.ParentID
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

  public fileOver(event) {}

  public fileLeave(event) {}

  // get user details
  getUserDetail() {
    //this.ngxService.start();
    this.commonService.userDetails().subscribe((result: any) => {
      this.userDetails = result.users;
      localStorage.setItem("email", this.userDetails.email);
    });
  }
}
