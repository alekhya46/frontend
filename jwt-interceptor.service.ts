import { Injectable } from '@angular/core';
import {PopoverController} from "@ionic/angular";

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse, HttpResponse, HttpClient
} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router'; 
import { Observable } from 'rxjs'; // only need to import from rxjs
// import 'rxjs/add/operator/do';
import { tap } from 'rxjs/operators';
import { SessionExpiredComponent } from '../components/modalpage/session-expired/session-expired.component';
import { environment } from 'src/environments/environment.prod';
import { SessionTimeoutComponent } from '../components/modalpage/session-timeout/session-timeout.component';
import { FileuploadErrorComponent } from '../components/modalpage/fileupload-error/fileupload-error.component';

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
    popover: any;
    refreshToken: any;
    isLogin: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private readonly http: HttpClient,
                private popoverController: PopoverController) {
                    this.refreshToken = localStorage.getItem('refreshToken');
                }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 403) {
                        // this.isLogin = localStorage.getItem('isLogin');
                        // if(this.isLogin){
                        //     this.sessionExpire();                        
                        // }
                        this.router.navigate(["/login"]);
                        localStorage.clear();
                    }
                    if (err.status === 404) {
                        this.router.navigate(["/login"]);
                        localStorage.clear();
                    }
                    if (err.status === 413) {
                        this.fileUploadError();  
                    }
                    if (err.status === 502) {
                        this.router.navigate(["/login"]);
                        localStorage.clear();
                    }
                    if (err.status === 503 || err.status === 504 ) {
                        this.router.navigate(["/login"]);
                        localStorage.clear();
                    }
                }
            })
        );
    }
    async sessionExpire() {
        this.popover = await this.popoverController.create({
          component: SessionTimeoutComponent,
          keyboardClose: false,
          translucent: true,
          backdropDismiss: false,
          cssClass: "custom-popupclass",
        });
        return this.popover.present();
    }

    async fileUploadError(){
        this.popover = await this.popoverController.create({
            component: FileuploadErrorComponent,
            keyboardClose: false,
            translucent: true,
            backdropDismiss: false,
            cssClass: "custom-popupclass",
        });
        return this.popover.present();
    }

    refreshTokens(){
        return this.http.post<any>(API_URL + '/auth/re-generate',{
            refreshToken: this.refreshToken
        });
    }
}
