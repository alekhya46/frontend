import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy, NavParams } from "@ionic/angular";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressBarModule } from "@angular/material/progress-bar";
//taiga modules
import {
  PREVIEW_DIALOG_PROVIDER,
  TuiPreviewModule,
} from "@taiga-ui/addon-preview";
import { TuiSwipeModule } from "@taiga-ui/cdk";
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiLoaderModule,
  TuiNotificationModule,
  TuiSvgModule,
} from "@taiga-ui/core";
import { PolymorpheusModule } from "@tinkoff/ng-polymorpheus";

// Shared Modules
import { SharedModule } from "./sharedmodule/common.module";
//components
import { LoginComponent } from "./components/auth/login/login.component";
import { PublicShareComponent } from "./components/public-share/public-share.component";
import { ForgotPasswordComponent } from "./components/auth/forgot-password/forgot-password.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { HeaderComponent } from "./components/layouts/header/header.component";
import { FooterComponent } from "./components/layouts/footer/footer.component";
import { SidebarComponent } from "./components/layouts/sidebar/sidebar.component";
import { MainComponent } from "./components/main/main.component";
import { FileDeleteConfirmComponent } from "./components/modalpage/file-delete-confirm/file-delete-confirm.component";
import { ProfileComponent } from "./components/settings/profile/profile.component";
import { LogoutComponent } from "./components/modalpage/logout/logout.component";
import { SessionTimeoutComponent } from "./components/modalpage/session-timeout/session-timeout.component";
import { MoveCopyComponent } from "./components/modalpage/move-copy/move-copy.component";
import { MoreDetailsComponent } from "./components/modalpage/more-details/more-details.component";
import { ChangePasswordComponent } from "./components/auth/change-password/change-password.component";
import { EmailVerificationComponent } from "./components/modalpage/email-verification/email-verification.component";
import { PdfViwerComponent } from "./components/modalpage/pdf-viwer/pdf-viwer.component";
import { SessionExpiredComponent } from "./components/modalpage/session-expired/session-expired.component";
import { ResetPasswordComponent } from "./components/auth/reset-password/reset-password.component";
import { NotificationModelComponent } from "./components/modalpage/notification-model/notification-model.component";

// Services
import { CommonService } from "./service/common.service";
import { UserDetailService } from "./service/user-detail.service";
import { FilesService } from "./service/files.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptorService } from "./service/interceptor.service";
import { JwtInterceptorService } from "./service/jwt-interceptor.service";
import { ActivityServiceService } from "./service/activity-service.service";
import { TextEditorComponent } from "./components/modalpage/text-editor/text-editor.component";
import { VideoPlayerComponent } from "./components/modalpage/video-player/video-player.component";
import { AudioPlayerComponent } from "./components/modalpage/audio-player/audio-player.component";
import { SharingComponent } from "./components/modalpage/sharing/sharing.component";
import { PhotoViewerComponent } from "./components/modalpage/photo-viewer/photo-viewer.component";
import { Login2Component } from "./components/auth/login2/login2.component";
import { Login3Component } from "./components/auth/login3/login3.component";
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { UserIdleModule } from "angular-user-idle";
import { HighchartsService } from "./components/highcharts.service";
import { SearchedResultComponent } from "./components/searched-result/searched-result.component";
import { NgxFileDropModule } from "ngx-file-drop";
import { ChatComponent } from "./components/chat/chat.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { SetupWizardComponent } from "./components/auth/setup-wizard/setup-wizard.component";
import { MatStepperModule } from "@angular/material/stepper";
import { FileuploadErrorComponent } from "./components/modalpage/fileupload-error/fileupload-error.component";
import { DailogPopUpComponent } from "./components/modalpage/dailog-pop-up/dailog-pop-up.component";
import { RenameFilesComponent } from "./components/modalpage/rename-files/rename-files.component";
import { UpgradestorageRequestComponent } from "./components/modalpage/upgradestorage-request/upgradestorage-request.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainComponent,
    ProfileComponent,
    LogoutComponent,
    SessionTimeoutComponent,
    MoveCopyComponent,
    MoreDetailsComponent,
    SessionExpiredComponent,
    FileDeleteConfirmComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    EmailVerificationComponent,
    PdfViwerComponent,
    TextEditorComponent,
    VideoPlayerComponent,
    AudioPlayerComponent,
    SharingComponent,
    PhotoViewerComponent,
    Login2Component,
    Login3Component,
    PublicShareComponent,
    SearchedResultComponent,
    NotificationModelComponent,
    ChatComponent,
    PageNotFoundComponent,
    SetupWizardComponent,
    FileuploadErrorComponent,
    DailogPopUpComponent,
    RenameFilesComponent,
    UpgradestorageRequestComponent,
  ],
  entryComponents: [
    ForgotPasswordComponent,
    LogoutComponent,
    SessionTimeoutComponent,
    MoveCopyComponent,
    MoreDetailsComponent,
    FileDeleteConfirmComponent,
    EmailVerificationComponent,
    PdfViwerComponent,
    SessionExpiredComponent,
    ChangePasswordComponent,
    TextEditorComponent,
    VideoPlayerComponent,
    AudioPlayerComponent,
    SharingComponent,
    PhotoViewerComponent,
    FileuploadErrorComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MatPasswordStrengthModule,
    MatStepperModule,
    NgxFileDropModule,
    UserIdleModule.forRoot({ idle: 600, timeout: 5, ping: 30 }),
    MatProgressBarModule,
    TuiPreviewModule,
    TuiSwipeModule,
    TuiButtonModule,
    TuiLoaderModule,
    TuiNotificationModule,
    TuiSvgModule,
    PolymorpheusModule,
    TuiDialogModule,
  ],
  exports: [],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CommonService,
    PREVIEW_DIALOG_PROVIDER,
    AuthGuardService,
    UserDetailService,
    FilesService,
    ActivityServiceService,
    HighchartsService,
    MatStepperModule,
    NavParams,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
