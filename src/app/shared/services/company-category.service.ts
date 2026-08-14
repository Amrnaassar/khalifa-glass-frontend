import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../core/constants/api.constants';

export interface ICompanyCategory {
  id: number
  nameAr: string
  nameEn: string
  isActive:boolean
}
@Injectable({
  providedIn: 'root'
})
export class CompanyCategoryService {

  constructor(private http :HttpClient) { }

  getAllCategory():Observable<ICompanyCategory[]>{
    return this.http.get<ICompanyCategory[]>(API.BASE_API_URL+ API.CATEGORY.GET_ALL);
  }
}
