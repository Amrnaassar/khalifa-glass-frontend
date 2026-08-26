import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import {
  CompanyCategoryService,
  ICompanyCategory
} from '../../shared/services/company-category.service';

import {
  CompanyProjectsService,
  ICompanyProjects
} from '../../shared/services/company-projects.service';

import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { LanguageService } from '../../core/services/language.service';
import { AlertService } from '../../core/services/alert.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-our-projects',
  imports: [
    SectionHeaderComponent,
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './our-projects.component.html',
  styleUrl: './our-projects.component.scss'
})
export class OurProjectsComponent implements OnInit {

  projects: ICompanyProjects[] = [];
  categories: ICompanyCategory[] = [];

  showAll = false;
  selectedCategoryId = 0;

  constructor(
    private _ProjectService: CompanyProjectsService,
    private _categoriesService: CompanyCategoryService,
    private language: LanguageService,
    private alertService: AlertService,
    private seoService :SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSeo('projects');
    this.loadData();
  }

  getCategoryName(category: ICompanyCategory): string {
    return this.language.isArabic()
      ? category.nameAr
      : category.nameEn;
  }

  filterProjects(categoryId: number): void {
    this.selectedCategoryId = categoryId;

    // كل مرة يرجع لأول 3
    this.showAll = false;
  }

  get displayedProjects(): ICompanyProjects[] {
    const filteredProjects =
      this.selectedCategoryId === 0
        ? this.projects
        : this.projects.filter(
            project =>
              project.categoryId === this.selectedCategoryId
          );

    return this.showAll
      ? filteredProjects
      : filteredProjects.slice(0, 3);
  }

  get hasMoreProjects(): boolean {
    const filteredProjects =
      this.selectedCategoryId === 0
        ? this.projects
        : this.projects.filter(
            project =>
              project.categoryId === this.selectedCategoryId
          );

    return filteredProjects.length > 3;
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

  loadData(): void {
    this._ProjectService
      .getAllProjects()
      .subscribe({
        next: res => {
          this.projects = res;
        },

        error: () => {
          this.alertService.error(
            'Loading Failed',
            'Failed to load projects. Please try again.'
          );
        }
      });

    this._categoriesService
      .getAllCategory()
      .subscribe({
        next: res => {
          this.categories = res;
        },

        error: () => {
          this.alertService.error(
            'Loading Failed',
            'Failed to load project categories. Please try again.'
          );
        }
      });
  }

  loadProject(): void {
    this.showAll = !this.showAll;
  }
}