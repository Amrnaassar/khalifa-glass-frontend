import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CompanyCategoryService, ICompanyCategory } from '../../shared/services/company-category.service';
import { CompanyProjectsService, ICompanyProjects } from '../../shared/services/company-projects.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-our-projects',
  imports: [SectionHeaderComponent, CommonModule, TranslatePipe],
  templateUrl: './our-projects.component.html',
  styleUrl: './our-projects.component.scss'
})
export class OurProjectsComponent {

  projects: ICompanyProjects[]
  categories: ICompanyCategory[];
  showAll: boolean = false;
  selectedCategoryId: number = 0;

  constructor(private _ProjectService: CompanyProjectsService, private _categoriesService: CompanyCategoryService) {
    this.projects = this._ProjectService.getAllProjects();
    this.categories = this._categoriesService.getAllCategory();
  }


  getCategoryName(id: number): string {
    let cat: ICompanyCategory | undefined = this.categories.find((item) => item.id == id);
    return cat ? cat.name : "";
  }
  filterProjects(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.showAll = false; // كل مرة يرجع لأول 3
  }

  get displayedProjects() {

    const filteredProjects =
      this.selectedCategoryId === 0
        ? this.projects
        : this.projects.filter(
          project => project.catId === this.selectedCategoryId
        );

    return this.showAll
      ? filteredProjects
      : filteredProjects.slice(0, 3);
  }


  loadProject() {
    this.showAll = !this.showAll;
  }


}
