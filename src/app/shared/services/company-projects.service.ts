import { Injectable } from '@angular/core';

export interface ICompanyProjects{
  id:number
  catId:number
  title:string
  location:string
  img:string

}
@Injectable({
  providedIn: 'root'
})
export class CompanyProjectsService {

  
  projects:ICompanyProjects[] = [
  {
    id: 100,
    catId: 1,
    title: 'projects.items.skylineTower.title',
    location: 'projects.items.skylineTower.location',
    img: 'assets/images/commercial.png'
  },
  {
    id: 200,
    catId: 2,
    title: 'projects.items.corporateOffice.title',
    location: 'projects.items.corporateOffice.location',
    img: 'assets/images/office.png'
  },
  {
    id: 300,
    catId: 3,
    title: 'projects.items.luxuryVilla.title',
    location: 'projects.items.luxuryVilla.location',
    img: 'assets/images/villa.png'
  },
  {
    id: 400,
    catId: 4,
    title: 'projects.items.businessCenter.title',
    location: 'projects.items.businessCenter.location',
    img: 'assets/images/business.png'
  }
];
  constructor() { }

  getAllProjects():ICompanyProjects[]{
    return this.projects
  }
}
