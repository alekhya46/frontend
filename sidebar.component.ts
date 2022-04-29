import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";
import { MatMenuTrigger } from "@angular/material/menu";
import { PopoverController } from "@ionic/angular";
import { CommonService } from "src/app/service/common.service";
import { LogoutComponent } from "./../../modalpage/logout/logout.component";
import { FilesService } from "src/app/service/files.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import * as moment from "moment";
import { EmailVerificationComponent } from "../../modalpage/email-verification/email-verification.component";
import { ToastrService } from "ngx-toastr";
import { ChangePasswordComponent } from "../../auth/change-password/change-password.component";
import { Subscription } from "rxjs";
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";
import { NotificationModelComponent } from "../../modalpage/notification-model/notification-model.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DailogPopUpComponent } from "../../modalpage/dailog-pop-up/dailog-pop-up.component";
import { mimetypes } from "src/environments/mimetypes";

export interface FileName {
  name: string;
}

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  popover: any;
  userName: string;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  screenWidth: number;
  screenHeight: number;
  hideMobileMode: boolean;
  islogo = true;
  showSubMenu;
  showPhotoMenu: boolean = false;
  mimes = mimetypes;

  newFolder: boolean = false;
  newTextDoc: boolean = false;
  newDoc: boolean = false;
  newSpreadsheet = false;
  newPresentation = false;
  newFolderName: any;
  public selectedFile: any = File;
  parentId = localStorage.getItem("parentId");
  email = localStorage.getItem("email");
  uploadedFile: any = [];
  uploadedFolder: any = [];
  uploadedDocuments: any = [];
  uploadedDocumentsLength: any;
  uploadedFolderLength: any;

  allnotifications: any = [];
  userDetails: any = [];
  // emailVerified: boolean;
  dissmissNoti: any = [];
  allnotificationsLength: any;
  deviceMode: boolean;
  storageResult: any = [];
  totalSpace: any;
  readableTotalSpace: any;
  usedSpaceInBytes: any;
  usedSpaceInPercentage: any;
  units: string[];
  freeSpace: any;
  subscription: Subscription;
  subscriptionUpdates: Subscription;
  notificationValue: any;
  notificationCount: any;
  subscriptionHeader: Subscription;
  subScriptionBackVal: Subscription;
  subscriptionUploadData: Subscription;
  subscriptionStorageinfo: Subscription;
  header: any;
  searchValue: any = "";
  currentPath: string;
  emptySearch: boolean = true;
  empty: any;
  searchedFile: any[];
  pageSize: number = 5;
  pageNumber: number = 1;
  countFileLength: any = [];
  loadMore: boolean = true;
  contactImgSrc: string;
  multiUploadedFiles: any = [];
  showFiller = false;
  uploadLoader: boolean = false;
  dropUploadLoader: boolean = false;
  UploadProgress: boolean = false;
  Uploadcompleted: boolean = false;
  headerUploadProgress: boolean = false;
  headerUploadcompleted: boolean = false;
  dropUploadedFiles: any = [];
  OntogglePopup: boolean = true;
  usedspace: any;
  SpaceUsed: any;
  linkForm: FormGroup;
  linklist: boolean = true;
  cretelink: boolean = false;
  applist: any = [];
  edit: boolean = false;
  bookmarkLength: any;
  favicon: any = [];
  iconsrc: any;
  storageObject: any = [];
  storageValueInPercentage: any;
  storageValueInNumber: any;
  spaceinpercent: any;
  openMenu: boolean = false;
  readableUsedSpace: any;
  prosTotalStorage: any;
  prosUsedStorage: any;
  prosValue: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private filesService: FilesService,
    private popoverController: PopoverController,
    private commonService: CommonService,
    private toastr: ToastrService
  ) {
    route.params.subscribe((val) => {
      this.getUserDetail();
      this.getStorageInfo();
      // this.getNotification();
      // this.multiUploadedFiles.push(this.commonService.getUploadProgress());

      // if (this.multiUploadedFiles.length != 0) {
      //   for (let i = 0; i < this.multiUploadedFiles.length; i++) {
      //     if (this.multiUploadedFiles[i].percentDone > 0 || this.multiUploadedFiles[i].percentDone == 100) {
      //       this.uploadLoader = true;
      //     }
      //     if (this.multiUploadedFiles[i].percentDone < 100) {
      //       this.headerUploadProgress = true;
      //       this.headerUploadcompleted = false;
      //     } else if (this.multiUploadedFiles[i].percentDone == 100) {
      //       this.headerUploadcompleted = true;
      //       this.headerUploadProgress = false;
      //     }
      //   }
      // }

      // this.dropUploadedFiles.push(this.commonService.getdragnDropProgress());
      // if (this.dropUploadedFiles.length != 0) {
      //   for (let i = 0; i < this.dropUploadedFiles.length; i++) {
      //     if (this.dropUploadedFiles[i].percentDone > 0 || this.dropUploadedFiles[i].percentDone == 100) {
      //       this.dropUploadLoader = true;
      //     }
      //     if (this.dropUploadedFiles[i].percentDone < 100) {
      //       this.headerUploadProgress = true;
      //       this.headerUploadcompleted = false;
      //     } else if (this.dropUploadedFiles[i].percentDone == 100) {
      //       this.headerUploadcompleted = true;
      //       this.headerUploadProgress = false;
      //     }
      //   }
      // }
      // if (this.commonService.getCancelProgress() == 'true') {
      //   this.dropUploadLoader = false;
      //   this.dropUploadedFiles = [];
      //   this.uploadLoader = false;
      //   this.multiUploadedFiles = [];
      // }
    });

    this.subscriptionUploadData = this.commonService
      .getUploadProgress()
      .subscribe((message) => {
        this.multiUploadedFiles.push(message);
        this.multiUploadedFiles = this.multiUploadedFiles.filter(
          (el, i, a) => i === a.indexOf(el)
        );
        if (this.multiUploadedFiles.length != 0) {
          for (let i = 0; i < this.multiUploadedFiles.length; i++) {
            if (
              this.multiUploadedFiles[i].percentDone >= 0 ||
              this.multiUploadedFiles[i].percentDone == 100
            ) {
              this.uploadLoader = true;
            }
            if (this.multiUploadedFiles[i].percentDone < 100) {
              this.headerUploadProgress = true;
              this.headerUploadcompleted = false;
            } else if ((this.multiUploadedFiles[i].percentDone = 100)) {
              this.headerUploadcompleted = true;
              this.headerUploadProgress = false;
            }
          }
        }
      });

    this.subscription = this.commonService
      .getNotification()
      .subscribe((message) => {
        this.notificationValue = message;
      });
    this.subscriptionHeader = this.commonService
      .getHeader()
      .subscribe((headerValue) => {
        this.header = headerValue;
        // this.getNotification();
      });

    this.subscriptionStorageinfo = this.commonService
      .getStorageinfo()
      .subscribe(() => {
        this.getStorageInfo();
      });

    this.subScriptionBackVal = this.commonService
      .getBackBtnVal()
      .subscribe((val) => {
        if (val == "true") {
          this.showSubMenu = "";
        }
      });

    this.subscription = this.commonService.getClick().subscribe((message) => {
      if (message == "click") {
        document.getElementById("searchDiv").style.display = "none";
        this.searchValue = "";
        this.searchedFile = [];
        this.countFileLength = [];
      }
    });

    this.subscriptionUpdates = this.commonService
      .getUpdates()
      .subscribe((message) => {
        this.getUserDetail();
      });
  }

  ngOnInit() {
    this.linkForm = this.fb.group({
      link: new FormControl("", [Validators.required]),
      URL: new FormControl("", [Validators.required]),
    });
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.mobileMode();
    // this.getStorageInfo();
    this.getbookmarks();
    this.userName = localStorage.getItem("username");
    this.usedspace = localStorage.getItem("usedSpaceInBytes");
    // this.getStorageInfo();
  }

  get linkFormControls() {
    return this.linkForm.controls;
  }

  OnClickFunction() {
    document.getElementById("searchDiv").style.display = "none";
    this.commonService.storeClick("click");
    this.searchValue = "";
  }

  //Cancel Loader popup
  OncancelUploadbox() {
    this.commonService.storeCancelProgress("true");
    this.uploadLoader = false;
    this.dropUploadLoader = false;
    this.multiUploadedFiles = [];
    this.dropUploadedFiles = [];
  }

  //Toggle popup
  OntoggleLoaderpopUp() {
    var toggle = document.getElementById("toggle");
    if (toggle.style.display === "none") {
      this.OntogglePopup = true;
      toggle.style.display = "block";
    } else {
      this.OntogglePopup = false;
      toggle.style.display = "none";
    }
  }

  OnClickPath() {
    this.commonService.storePath("path");
  }

  @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;
  @ViewChild("sidenav") sidenav: MatSidenav;

  @HostListener("window:onresize", ["$event"])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.mobileMode();
  }

  mobileMode() {
    if (this.screenWidth <= 767) {
      this.hideMobileMode = true;
    } else if (this.screenWidth <= 1024) {
      this.hideMobileMode = true;
    } else {
      this.hideMobileMode = false;
    }
  }

  toggleMobileMenu() {
    this.hideMobileMode = !this.hideMobileMode;
    this.deviceMode = !this.deviceMode;
    if (this.screenWidth <= 767) {
      !this.isExpanded;
    } else {
      this.isExpanded = !this.isExpanded;
    }
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
      this.islogo = false;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
      this.islogo = true;
    }
  }

  toggleMenu(val: string) {
    if (val == "file") {
      this.showSubMenu = "file";
    } else if (val == "photo") {
      this.showSubMenu = "photo";
    } else {
      this.showSubMenu = "";
    }
  }

  toggleFiles() {
    var menu = document.getElementById("subFiles");
    if (menu.style.display === "none") {
      this.showSubMenu = true;
      menu.style.display = "block";
    } else {
      this.showSubMenu = false;
      menu.style.display = "none";
      this.router.navigate(["/user/dashboard"]);
    }
  }

  goToDashboard() {
    if (this.screenWidth <= 767) {
      this.hideMobileMode = true;
      this.router.navigate(["/user/dashboard"]);
    } else {
      this.hideMobileMode = false;
      this.router.navigate(["/user/dashboard"]);
    }
  }

  gotoAllFiles() {
    if (this.screenWidth <= 767) {
      this.hideMobileMode = true;
      this.router.navigate(["/user/files/all"]);
    } else {
      this.hideMobileMode = false;
      this.router.navigate(["/user/files/all"]);
    }
  }

  gotoFavoriteFiles() {
    if (this.screenWidth <= 767) {
      this.hideMobileMode = true;
      this.router.navigate(["/user/files/favorite"]);
    } else {
      this.hideMobileMode = false;
      this.router.navigate(["/user/files/favorite"]);
    }
  }

  gotoAllPhotos() {
    if (this.screenWidth <= 767) {
      this.hideMobileMode = true;
      this.router.navigate(["/user/photos/all"]);
    } else {
      this.hideMobileMode = false;
      this.router.navigate(["/user/photos/all"]);
    }
  }

  gotoFavoritePhotos() {
    if (this.screenWidth <= 767) {
      this.hideMobileMode = true;
      this.router.navigate(["/user/photos/favorite"]);
    } else {
      this.hideMobileMode = false;
      this.router.navigate(["/user/photos/favorite"]);
    }
  }

  gotoShared() {
    if (this.screenWidth <= 767) {
      this.hideMobileMode = true;
      this.router.navigate(["/user/shared/all"]);
    } else {
      this.hideMobileMode = false;
      this.router.navigate(["/user/shared/all"]);
    }
  }

  gotoActivity() {
    if (this.screenWidth <= 767) {
      this.hideMobileMode = true;
      this.router.navigate(["/user/activity/all"]);
    } else {
      this.hideMobileMode = false;
      this.router.navigate(["/user/activity/all"]);
    }
  }

  gotoContacts() {
    if (this.screenWidth <= 767) {
      this.hideMobileMode = true;
      this.router.navigate(["/user/contacts"]);
    } else {
      this.hideMobileMode = false;
      this.router.navigate(["/user/contacts"]);
    }
  }

  gotoTrash() {
    if (this.screenWidth <= 767) {
      this.hideMobileMode = true;
      this.router.navigate(["/user/trash/all"]);
    } else {
      this.hideMobileMode = false;
      this.router.navigate(["/user/trash/all"]);
    }
  }

  togglePhotos() {
    var menu = document.getElementById("subphotos");
    if (menu.style.display === "none") {
      this.showSubMenu = true;
      menu.style.display = "block";
    } else {
      this.showSubMenu = false;
      menu.style.display = "none";
      this.router.navigate(["/user/dashboard"]);
    }
  }

  settings() {
    this.router.navigate(["dashboard/profile"]);
  }

  logout() {
    this.sessionExpire();
  }

  emailVerications() {
    this.emailVerication();
  }

  scrollToElement(el): void {
    const duration = 600;
    const interval = 5;
    const moveEl = (el.scrollTop * interval) / duration;

    observableInterval(interval)
      .pipe(
        scan((acc, curr) => acc - moveEl, el.scrollTop),
        tap((position) => (el.scrollTop = position)),
        takeWhile((val) => val > 0)
      )
      .subscribe();
  }

  dontClose() {
    this.sidenav.disableClose = true;
    setTimeout(() => (this.sidenav.disableClose = false));
  }

  async sessionExpire() {
    this.popover = await this.popoverController.create({
      component: LogoutComponent,
      keyboardClose: false,
      translucent: true,
      backdropDismiss: false,
      cssClass: "custom-popupclass",
    });
    return this.popover.present();
  }

  async emailVerication() {
    this.popover = await this.popoverController.create({
      component: EmailVerificationComponent,
      keyboardClose: false,
      translucent: true,
      backdropDismiss: false,
      cssClass: "custom-popupclass",
    });
    return this.popover.present();
  }

  viewAllNotification() {
    this.router.navigate(["/user/allnotifications"]);
  }
  // get user details
  getUserDetail() {
    //this.ngxService.start();
    this.commonService.userDetails().subscribe((result: any) => {
      console.log("sidebarprofiles");
      this.ngxService.stop();
      this.userDetails = result.users;
      this.contactImgSrc =
        "data:image/png;base64," + this.userDetails.displayPicture;
      localStorage.setItem("email", this.userDetails.email);
      if (this.userDetails.emailVerified == false) {
        this.emailVerication();
      }
    });
  }

  // Get All notification
  getNotification() {
    this.commonService.getNotifications().subscribe((result: any) => {
      this.allnotifications = result;
      this.allnotificationsLength = this.allnotifications.length;
      this.subscription = this.commonService
        .getNotification()
        .subscribe((message) => {
          this.notificationValue = message;
        });
      this.getDashboardInfo();
    });
  }

  // Get  Storage info
  getDashboardInfo() {
    this.commonService.getDashboardInfos().subscribe((result: any) => {
      let dashboardResult = result;
      this.commonService.storeNotification(
        dashboardResult.numberOfNotifications
      );
    });
  }

  //Dissmiss All Notification
  clearAllNotification() {
    //this.ngxService.start();
    this.commonService.dismissAllNotifications().subscribe((result: any) => {
      if (result["code"] == 200) {
        this.ngxService.stop();
        this.toastr.success(result["message"]);
        this.getNotification();
      }
      this.ngxService.stop();
    });
  }

  //Dissmiss Notification By ID
  async dismissAllNotificationById(items, id, value, objectType) {
    this.popover = await this.popoverController.create({
      component: NotificationModelComponent,
      componentProps: {
        message: items.message,
        status: items.status,
        subject: items.subject,
      },
      keyboardClose: false,
      translucent: true,
      backdropDismiss: false,
      cssClass: "custom-popupclass",
    });
    await this.popover.present();
    return this.popover.onDidDismiss().then((data) => {
      this.dissmissNoti = {
        id: id,
        status: value,
      };
      //this.ngxService.start();
      this.commonService
        .dismissAllNotificationById(this.dissmissNoti)
        .subscribe((result: any) => {
          this.ngxService.stop();
          if (result["code"] == 200) {
            this.ngxService.stop();
            if (value === "VIEWED_AND_READ" && objectType === "FILE_SHARED") {
              this.router.navigate(["/user/shared/all"]);
            } else if (value === "DELETED") {
              this.toastr.success(result["message"]);
            }
            this.getNotification();
            this.ngxService.stop();
          }
        });
    });
  }

  getConvertGb(bytes, decimals = 2) {
    if (bytes === 0) return "0 KB";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) / k + " GB";
  }

  getConvert(bytes, decimals = 2) {
    if (bytes === 0) return "0 KB";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) / k;
  }

  getReadableFileSizeString(bytes, decimals = 2) {
    if (bytes === 0) return "0 KB";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }

  // Get  Storage info
  getStorageInfo() {
    //this.ngxService.start();
    this.commonService.getStorageInfos().subscribe((result: any) => {
      this.ngxService.stop();
      this.storageResult = result;
      this.readableTotalSpace = result.readableTotalSpace;
      this.readableUsedSpace = result.readableUsedSpace;
      this.prosTotalStorage = result.totalSpace;
      this.prosUsedStorage = result.usedSpaceInBytes;
      this.prosValue = this.prosUsedStorage / this.prosTotalStorage;
      this.SpaceUsed = this.getConvert(this.storageResult.totalSpace);
      this.freeSpace =
        this.storageResult.totalSpace - this.storageResult.usedSpaceInBytes;
      this.freeSpace = this.getReadableFileSizeString(this.freeSpace);
      this.totalSpace = this.getConvertGb(this.storageResult.totalSpace);
      this.storageResult.totalSpace = this.totalSpace;

      this.usedSpaceInBytes = this.getReadableFileSizeString(
        this.storageResult.usedSpaceInBytes
      );
      this.storageResult.usedSpaceInBytes = this.usedSpaceInBytes;
      var totalSpace1 = this.totalSpace;
      var trimTotalSpace = totalSpace1.match(/\d/g).join("");

      //Getting storage values
      this.usedSpaceInPercentage =
        this.storageResult.usedSpaceInPercentage.toFixed(1);
      this.storageResult.usedSpaceInPercentage = this.usedSpaceInPercentage;
      this.storageValueInNumber = (
        parseInt(this.usedSpaceInBytes) / 1024
      ).toFixed(1);
      this.storageValueInPercentage = this.usedSpaceInPercentage;
    });
  }
  getshowAllFiles(parentId) {
    //this.ngxService.start();
    this.commonService.getshowAllFiles(parentId).subscribe((result: any) => {
      this.ngxService.stop();
      this.uploadedFile = result.childern;
      this.uploadedFolderLength = this.uploadedFolder.length;
      this.uploadedDocumentsLength = this.uploadedDocuments.length;
      for (let i = 0; i < this.uploadedDocuments.length; i++) {
        this.uploadedDocuments[i].icon =
          "data:image/png;base64," + this.uploadedDocuments[i].icon;
      }
      for (let i = 0; i < this.uploadedFolder.length; i++) {
        this.uploadedFolder[i].modifiedAt = moment(
          this.uploadedFolder[i].modifiedAt
        ).format("DD MMM YYYY");
      }
    });
  }

  OnSearchValue(searchValue) {
    this.searchValue = searchValue;
    if (searchValue.length >= 2) {
      this.emptySearch = false;
      let data = {
        fileTitle: searchValue,
        pageNb: this.pageNumber,
        step: this.pageSize,
      };
      this.commonService.gobalSearch(data).subscribe(
        (data: any) => {
          this.searchedFile = data;
          document.getElementById("searchDiv").style.display = "block";
          for (let i = 0; i < this.searchedFile.length; i++) {
            // if (
            //   this.commonService.base64regex.test(this.uploadedFile[i].icon) ==
            //   true
            // ) {
            //   this.uploadedFile[i].icon =
            //     "data:image/png;base64," + this.uploadedFile[i].icon;
            // }
            this.searchedFile[i].modifiedAt = moment(
              this.searchedFile[i].modifiedAt
            ).fromNow();
            let mimeType = this.searchedFile[i].mimeType;
            if (!mimetypes[mimeType]) {
              this.searchedFile[i].mimeType = "UNKNOWN";
            }
          }
          if (data.code == 406) {
            document.getElementById("searchDiv").style.display = "none";
          }
        },
        (error) => {
          if (error.status == 500) {
            this.emptySearch = false;
            this.searchedFile.length = 0;
          }
        }
      );
    } else {
      this.pageSize = 5;
      this.emptySearch = true;
      this.searchedFile = [];
      this.countFileLength = [];
      document.getElementById("searchDiv").style.display = "none";
    }
  }

  OncancelSearch() {
    this.pageSize = 5;
    this.emptySearch = true;
    this.searchedFile = [];
    this.countFileLength = [];
    document.getElementById("searchDiv").style.display = "none";
  }

  OngetMoreFiles() {
    this.pageSize += 5;
    document.getElementById("searchDiv").style.display = "block";
    this.OnSearchValue(this.searchValue);
    for (let i = 0; i < this.countFileLength.length; i++) {
      if (this.countFileLength[i] == this.searchedFile.length) {
        this.loadMore = false;
      }
    }
    this.countFileLength.push(this.searchedFile.length);
  }

  openSearchedFile(value) {
    this.router.navigate(["/user/searched-results"]);
    localStorage.setItem("searchedId", value);
    this.commonService.storeSearchedValue(value);
    document.getElementById("searchDiv").style.display = "none";
    this.searchValue = "";
    this.searchedFile = [];
    this.countFileLength = [];
  }

  OnCloseSearchedDiv() {
    document.getElementById("searchDiv").style.display = "none";
    this.searchValue = "";
    this.searchedFile = [];
    this.countFileLength = [];
  }

  OnClickAdd() {
    this.linklist = false;
    this.cretelink = true;
  }

  back() {
    this.linklist = true;
    this.cretelink = false;
    this.edit = false;
    this.linkForm.reset();
  }

  save() {
    let data = {
      url: this.linkForm.value.URL,
      linkName: this.linkForm.value.link,
      mimeType: "link",
      parentId: this.parentId,
    };
    this.commonService.createbookmarks(data).subscribe((result: any) => {
      if (result["responseCode"] == 201) {
        this.getbookmarks();
        this.linklist = true;
        this.cretelink = false;
        this.edit = false;
        this.linkForm.reset();
      }
    });
  }

  getbookmarks() {
    this.commonService.getbookmarks().subscribe((result: any) => {
      this.applist = result.content;
      this.bookmarkLength = result.totalElements;
      for (let i = 0; i < this.applist.length; i++) {
        this.favicon = result.content[i].icon;
        this.applist[i].iconsrc = result.content[i].icon;
      }
      this.edit = false;
    });
  }

  OnClearbookmark(id: any) {
    this.commonService.deletebookmarks(id).subscribe((result: any) => {
      if (result.code == 200) {
        this.getbookmarks();
      }
    });
  }

  getbook() {
    this.edit = false;
  }

  OnEdit() {
    this.edit = true;
  }

  //storage color changer function
  storageColorChanger() {
    if (this.prosValue <= 0.9) {
      return "primary";
    } else {
      return "danger";
    }
  }

  showDialog() {
    this.upgradeStorage();
  }

  async upgradeStorage() {
    this.popover = await this.popoverController.create({
      component: DailogPopUpComponent,
      keyboardClose: false,
      translucent: true,
      backdropDismiss: false,
      cssClass: "custom-popupclass",
    });
    return this.popover.present();
  }

  openSettings() {
    this.router.navigate(["/user/settings/profile"]);
    this.openMenu = false;
  }
}
