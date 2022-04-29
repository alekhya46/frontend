import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { PublicShareComponent } from './components/public-share/public-share.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component'

import { QuicklinkStrategy } from 'ngx-quicklink';
import { Login2Component } from './components/auth/login2/login2.component';
import { Login3Component } from './components/auth/login3/login3.component';
import { AuthGuardService } from './service/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SetupWizardComponent } from './components/auth/setup-wizard/setup-wizard.component';
import { VideoPlayerComponent } from './components/modalpage/video-player/video-player.component';

const routes: Routes = [
 
  // { path: 'login', component: LoginComponent },
  { path: 'login', component: Login2Component },
  { path: 'login3', component: Login3Component},
  { path: 'signup', component: SignupComponent },
  { path: 'publicShare/:token', component: PublicShareComponent},
  { path: 'user', 
      loadChildren: () => import('./components/pages.module').then(m => m.PagesModule), canActivate: [AuthGuardService],
    // loadChildren: './components/pages.module#PagesModule'
  },
  { path: '', component: Login2Component },
  { path: 'resetpassword/:token', component: ResetPasswordComponent},
  { path: 'setupWizard', component: SetupWizardComponent},
  { path: 'videos', component: VideoPlayerComponent},
  { path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    // RouterModule.forRoot(
    //   routes,
    //   {
    //     useHash: true,
    //     preloadingStrategy: QuicklinkStrategy
    //   }
    // )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
