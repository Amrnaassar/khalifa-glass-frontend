import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CompanyCategoryService, ICompanyCategory } from '../../shared/services/company-category.service';
import { CompanyProjectsService, ICompanyProjects } from '../../shared/services/company-projects.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-our-projects',
  imports: [SectionHeaderComponent,CommonModule,TranslatePipe],
  templateUrl: './our-projects.component.html',
  styleUrl: './our-projects.component.scss'
})
export class OurProjectsComponent {

  projects:ICompanyProjects[]
  categories:ICompanyCategory[];
  showAll:boolean=false;

  constructor(private _ProjectService:CompanyProjectsService,private _categoriesService:CompanyCategoryService){
    this.projects=this._ProjectService.getAllProjects();
    this.categories=this._categoriesService.getAllCategory();
  }

  getCategoryName(id:number):string{
    let cat:ICompanyCategory | undefined= this.categories.find((item)=>item.id==id);
    return cat? cat.name:"";
  }

  get displayedProjects() {
  return this.showAll
    ? this.projects
    : this.projects.slice(0, 3);
}

loadProject() {
  this.showAll = !this.showAll;
}

  
}
