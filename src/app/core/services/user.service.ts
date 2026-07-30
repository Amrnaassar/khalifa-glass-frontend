import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants/api.constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(API.BASE_API_URL + API.USER.ME);
  }
}