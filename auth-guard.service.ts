import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate{

Environment: any = environment;
isLogin: any;

constructor(
    public router: Router,
    ) { }
canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.isLogin = localStorage.getItem('isLogin');
        if(!this.isLogin){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

}
