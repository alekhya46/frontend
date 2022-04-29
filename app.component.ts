import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { UserIdleService } from "angular-user-idle";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionTimeoutComponent } from "./components/modalpage/session-timeout/session-timeout.component";
import { PopoverController } from "@ionic/angular";
import { environment } from "src/environments/environment.prod"
import { AuthGuardService } from './service/auth-guard.service';
// import { isDevMode } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  
})
export class AppComponent {
  sessionexp: any;
  popover: any;
  isLogin: any;

  constructor(private authService: AuthGuardService,
    private platform: Platform,
    private userIdle: UserIdleService,
    private router: Router,
    private route: ActivatedRoute,
    private popoverController: PopoverController
  ) {
    this.initializeApp();
    this.isLogin = localStorage.getItem('isLogin');
  }

  ngOnInit() {
    // if (isDevMode()) {
    //   console.log = function () {};
    // }
    // if(this.isLogin){
    //   this.router.navigate(["/user/dashboard"]);
    // } 
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.userIdle.startWatching();
      this.userIdle.onTimerStart().subscribe((count) => {});
      this.sessionexp = this.userIdle.onTimeout().subscribe(() => {
        if(this.isLogin){
          this.sessionExpire();
          this.sessionexp.unsubscribe();
        }
      });
    });
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
}
