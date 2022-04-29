import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.prod";
import { CommonService } from "./common.service";
import * as forge from "node-forge";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class FilesService {

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private commonService: CommonService
  ) {}

  //Trash file and folder or Restore Trash file and folder
  trashFiles(trashFile) {
    return this.http.post<any>(API_URL + "file/Trashaction", trashFile);
  }

  //Show all trashed files
  showAllTrashedFiles(trashedFiles) {
    return this.http.post<any>(API_URL + "file/showTrashFiles", trashedFiles);
  }

  //Delete permanently file or folder
  deleteFiles(deleteFilesParm) {
    return this.http.post<any>(API_URL + "file/deleteFiles", deleteFilesParm);
  }

  //Add Favorites file or folder
  addFavorites(favriteFile) {
    return this.http.put<any>(API_URL + "file/changeFavorite", favriteFile);
  }

  //Show all trashed files
  showAllFavorites(favriteFiles) {
    return this.http.post<any>(API_URL + "file/getFavoriteFiles", favriteFiles);
  }

  //Download files
  downloadFiles(downloadFilesId) {
    return this.http.post(API_URL + "file/downloadfiles", downloadFilesId, {
      responseType: "blob",
      reportProgress: true,
      observe: "events",
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.commonService.gettoken()}`,
      }),
    });
  }




  traversePhoto(idx: any) {
    return this.http.get<any>(
      API_URL + "file/openFile/" + idx + "?isShared=false" );
  

    }



  //Open Files
  getBase64ofFile(fileId, sharedType, parentId, filesType, sharedFileId) {
    let headers: any = new Headers();
    let params = new HttpParams().set("SharedFileID", parentId);
    if (sharedType == "files" || sharedType == "self") {
      return this.http.get<any>(
        API_URL + "file/openFile/" + fileId + "?isShared=false"
      );
    } else if (sharedType == "others" && filesType == "") {
      return this.http.get<any>(
        API_URL + "file/openFile/" + fileId + "?isShared=true"
      );
    } else if (filesType == "insideFolder" && sharedType == "others") {
      let params = new HttpParams().set("SharedFileID", sharedFileId);
      return this.http.get<any>(API_URL + "share/openSharedFile/" + fileId, {
        headers: headers,
        params: params,
      });
    }
  }

  OnshowFiles(filesData) {
    return this.http.post<any>(API_URL + "file/showFiles", filesData);
  }

  OnshowSearchedFiles(id) {
    return this.http.get<any>(API_URL + "getFileDetailsById?id=" + id);
  }

  getFolders(data) {
    return this.http.post<any>(API_URL + "file/showFolders", data);
  }

  //Move and copy
  OnMovenCopy(data) {
    return this.http.put<any>(API_URL + "file/transferFile", data);
  }

  //Find Users POST Method
  OnFindUsers(data) {
    return this.http.post<any>(API_URL + "dashboard/findUser", data);
  }

  //Shared files or folders POST Method
  OnSharedDocs(data) {
    return this.http.post<any>(API_URL + "share/internal", data);
  }

  //Shared Files Post method
  getSharedFiles(data) {
    return this.http.post<any>(API_URL + "share/sharedFiles", data);
  }

  //Remove Shared Files or folder
  removeSharedFiles(removeSharedFiles) {
    return this.http.post<any>(
      API_URL + "share/removeSharedFiles",
      removeSharedFiles
    );
  }

  //Shared Files Post method
  getOpenSharedFiles(data, SharedFileID) {
    let headers: any = new Headers();
    let params = new HttpParams().set("SharedFileID", SharedFileID);
    return this.http.post<any>(API_URL + "share/showSharedFiles", data, {
      headers: headers,
      params: params,
    });
  }

  //shared Files Users List POST Method
  sharedFilesUsersList(data) {
    return this.http.post<any>(API_URL + "share/sharedFilesUsersList", data);
  }

  //Update Permissions POST Method
  updatePermissions(data) {
    return this.http.post<any>(API_URL + "share/updatePermissions", data);
  }

  //remove File Users POST Method
  removeFileUsers(data) {
    return this.http.post<any>(API_URL + "share/removeFileUsers", data);
  }

  //public Link Status POST Method
  getPublicLinkStatus(data) {
    return this.http.post<any>(API_URL + "share/PublicLinkStatus", data);
  }

  //public Link Disabled POST Method
  getPublicLinkDisabled(data) {
    return this.http.post<any>(API_URL + "share/disablePublicLink", data);
  }

  //public Link POST Method
  getPublicLink(data) {
    return this.http.post<any>(API_URL + "share/publicLink", data);
  }

  //Open Files
  getPublicShared(token) {
    return this.http.get<any>(API_URL + "share/pub/getFile/" + token);
  }

  //public sharing password verification
  OnPubPassVrify(data) {
    return this.http.post<any>(API_URL + "share/pub/getFile/auth", data);
  }

  //Download files
  pubShareddownloadFiles(data) {
    return this.http.post(API_URL + "share/pub/downloadPublicFile", data, {
      responseType: "blob",
      reportProgress: true,
      observe: "events",
    });
  }

  //Open Documents
  OpenDocument(data) {
    return this.http.post(API_URL + "share/pub/openFile", data);
  }

  //Public link send by email POST Method
  publinkSend(data) {
    return this.http.post<any>(API_URL + "share/mailPublicFile", data);
  }

  encryptpassword(password) {
    var rsa = forge.pki.publicKeyFromPem(environment.LOGIN_PUB_KEY);
    return window.btoa(rsa.encrypt(password));
  }

  viewVideo(data) {
    return this.http.get<any>(API_URL + "video/playVideo/" + data);
  }
  viewSharedVideo(data) {
    return this.http.post(API_URL + "share/pub/openFile", data);
  }
}
