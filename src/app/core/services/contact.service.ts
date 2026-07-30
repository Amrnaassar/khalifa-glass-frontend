import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constants/api.constants';
import { Observable } from 'rxjs';

export interface ContactRequest {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
export interface ContactResponse {
  success: boolean;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class ContactService {


  constructor(private http: HttpClient) {}

  sendMessage(data: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(API.BASE_API_URL+API.CONTACT, data);
  }
}
