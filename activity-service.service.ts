import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class ActivityServiceService {

  constructor(private readonly http: HttpClient,) { }

  getActivitiesList(date): Observable<any>{
    return this.http.post<any>(API_URL + 'activities/activity' ,date);
  }

  getActivitiesCount(countData: any): Observable<any>{
    return this.http.post<any>(API_URL + 'activities/activityCount',countData);
  }
}
