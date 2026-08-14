import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../core/constants/api.constants';

export interface ICompanyProjects{
  id:number
  titleAr:string
  titleEn:string
  descriptionAr:string
  descriptionEn:string
  imageUrl:string
  categoryId:number
  categoryNameAr:string
  categoryNameEn:string
  createdAt:string

}
@Injectable({
  providedIn: 'root'
})
export class CompanyProjectsService {

  constructor(private http:HttpClient) { }

  getAllProjects():Observable<ICompanyProjects[]>{
    return this.http.get<ICompanyProjects[]>(API.BASE_API_URL+API.PROJECTS.GEL_ALL);
  }
}
