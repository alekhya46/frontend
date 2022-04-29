import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { FilesRoutingModule } from "./files-routing.module";
import { FilesComponent } from "./files.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { RecentComponent } from "./recent/recent.component";
import { SharedModule } from "../../sharedmodule/common.module";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptorService } from "./../../service/interceptor.service";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxFileDropModule } from "ngx-file-drop";
import { TuiPreviewModule } from "@taiga-ui/addon-preview";
import { PolymorpheusModule } from "@tinkoff/ng-polymorpheus";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiSvgModule } from "@taiga-ui/core";
import {
  TuiNotificationsModule,
  TuiDialogModule,
  TuiRootModule,
} from "@taiga-ui/core";
import { TuiLoaderModule, TuiNotificationModule } from "@taiga-ui/core";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    SharedModule,
    FilesRoutingModule,
    InfiniteScrollModule,
    NgxFileDropModule,
    TuiPreviewModule,
    PolymorpheusModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiNotificationsModule,
    TuiDialogModule,
    TuiRootModule,
    TuiLoaderModule,
    TuiNotificationModule,
  ],
  declarations: [FilesComponent, FavoritesComponent, RecentComponent],
  providers: [
    // FilesService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
})
export class FilesModule {}
