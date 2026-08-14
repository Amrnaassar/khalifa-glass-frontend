import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../core/constants/api.constants';

export interface IGallery{
  id:number
  title:string
  categoryId:number
  imageUrl:string
  isLarge:boolean
  createdAt: string
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

   gallery:IGallery[] = []
  constructor(private http:HttpClient) { }
  getAllGallery():Observable<IGallery[]>{
    return this.http.get<IGallery[]>(API.BASE_API_URL+API.GALLERTY.GET_ALL);
  }
}
