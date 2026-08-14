import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CompanyCategoryService, ICompanyCategory } from '../../shared/services/company-category.service';
import { CompanyProjectsService, ICompanyProjects } from '../../shared/services/company-projects.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-our-projects',
  imports: [SectionHeaderComponent, CommonModule, TranslatePipe],
  templateUrl: './our-projects.component.html',
  styleUrl: './our-projects.component.scss'
})
export class OurProjectsComponent implements OnInit {

  projects: ICompanyProjects[] = []
  categories: ICompanyCategory[] = []
  showAll: boolean = false;
  selectedCategoryId: number = 0;

  constructor(private _ProjectService: CompanyProjectsService,
    private _categoriesService: CompanyCategoryService,
    private language: LanguageService) {

  }
  ngOnInit(): void {
    this.loadData();
  }

  getCategoryName(category: ICompanyCategory): string {
  return this.language.isArabic()
    ? category.nameAr
    : category.nameEn;
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
          project => project.categoryId === this.selectedCategoryId
        );

    return this.showAll
      ? filteredProjects
      : filteredProjects.slice(0, 3);
  }

  getProjectCategory(project: ICompanyProjects): string {
    return this.language.isArabic()
      ? project.categoryNameAr
      : project.categoryNameEn;
  }
  getProjectTitle(project: ICompanyProjects): string {
  return this.language.isArabic()
    ? project.titleAr
    : project.titleEn;
}
  getProjectDesc(project: ICompanyProjects): string {
    return this.language.isArabic()
      ? project.descriptionAr
      : project.descriptionEn;
  }
  

  loadData() {
    this._ProjectService.getAllProjects().subscribe({
      next: (res) => {
        this.projects = res
      },
      error: (err) => {
        console.log(err);
      }
    });
    this._categoriesService.getAllCategory().subscribe({
      next: (res) => {
        this.categories = res
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadProject() {
    this.showAll = !this.showAll;
  }


}
