import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

import {
  CompanyProjectsService,
  ICompanyProjects
} from '../../../shared/services/company-projects.service';

import {
  ICompanyCategory,
  CompanyCategoryService
} from '../../../shared/services/company-category.service';

import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-our-projects-section',
  standalone: true,
  imports: [
    SectionHeaderComponent,
    CommonModule,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './our-projects-section.component.html',
  styleUrl: './our-projects-section.component.scss'
})
export class OurProjectsSectionComponent implements OnInit {

  projects: ICompanyProjects[] = [];
  categories: ICompanyCategory[] = [];

  constructor(
    private _ProjectService: CompanyProjectsService,
    private _categoriesService: CompanyCategoryService,
    public language: LanguageService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this._ProjectService.getAllProjects().subscribe({
      next: (res) => {
        this.projects = res;
      },
      error: (err) => {
        console.error('Failed to load projects:', err);
      }
    });

      this._categoriesService.getAllCategory().subscribe({
        next: (res) => {
          this.categories = res;
        },
        error: (err) => {
          console.error('Failed to load categories:', err);
        }
      });

  }

  getCategoryName(category: ICompanyCategory): string {
    return this.language.isArabic()
      ? category.nameAr
      : category.nameEn;
  }

  getProjectTitle(project: ICompanyProjects): string {
    return this.language.isArabic()
      ? project.titleAr
      : project.titleEn;
  }

  getProjectCategory(project: ICompanyProjects): string {
    return this.language.isArabic()
      ? project.categoryNameAr
      : project.categoryNameEn;
  }
  getProjectDescription(project: ICompanyProjects): string {
    return this.language.isArabic()
      ? project.descriptionAr
      : project.descriptionEn;
  }

}