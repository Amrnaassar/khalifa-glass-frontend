import { Injectable } from '@angular/core';

export interface ICompanyCategory {
  id: number
  name: string
}
@Injectable({
  providedIn: 'root'
})
export class CompanyCategoryService {

  categories:ICompanyCategory[] = [{ id: 1, name: "Commercial" }, { id: 2, name: "Office" }, { id: 3, name: "Residential" }, { id: 4, name: "Business" },]
  constructor() { }
  getAllCategory():ICompanyCategory[]{
    return this.categories
  }
}
