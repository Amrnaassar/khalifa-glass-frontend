import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CompanyProjectsService, ICompanyProjects } from '../../../shared/services/company-projects.service';
import { ICompanyCategory, CompanyCategoryService } from '../../../shared/services/company-category.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-our-projects-section',
  standalone:true,
  imports: [SectionHeaderComponent,CommonModule,TranslatePipe,RouterLink],
  templateUrl: './our-projects-section.component.html',
  styleUrl: './our-projects-section.component.scss'
})
export class OurProjectsSectionComponent {
  projects:ICompanyProjects[]
  categories:ICompanyCategory[];
  constructor(private _ProjectService:CompanyProjectsService,private _categoriesService:CompanyCategoryService){
    this.projects=this._ProjectService.getAllProjects();
    this.categories=this._categoriesService.getAllCategory();
  }

  getCategoryName(id:number):string{
    
    let cat:ICompanyCategory | undefined= this.categories.find((item)=>item.id==id);
    return cat? cat.name:"";
  }


}
