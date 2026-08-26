import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

import {
  GalleryService,
  IGallery
} from '../../shared/services/gallery.service';

import {
  CompanyCategoryService,
  ICompanyCategory
} from '../../shared/services/company-category.service';

import { LanguageService } from '../../core/services/language.service';
import { AlertService } from '../../core/services/alert.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-gallery',
  imports: [
    SectionHeaderComponent,
    TranslatePipe
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {

  selectedCategoryId = 0;

  gallery: IGallery[] = [];
  categories: ICompanyCategory[] = [];

  constructor(
    private galleryService: GalleryService,
    private catService: CompanyCategoryService,
    private language: LanguageService,
    private alertService: AlertService,
    private seoService :SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSeo('gallery');
    this.loadData();
  }

  getCategoryName(catId: number): string {
    const category = this.categories.find(
      cat => cat.id === catId
    );

    return this.language.isArabic()
      ? category?.nameAr ?? ''
      : category?.nameEn ?? '';
  }

  filterGallery(categoryId: number): void {
    this.selectedCategoryId = categoryId;
  }

  getCategorytitle(category: ICompanyCategory): string {
    return this.language.isArabic()
      ? category.nameAr
      : category.nameEn;
  }

  loadData(): void {
    this.galleryService
      .getAllGallery()
      .subscribe({
        next: res => {
          this.gallery = res;
        },

        error: () => {
          this.alertService.error(
            'Loading Failed',
            'Failed to load gallery items. Please try again.'
          );
        }
      });

    this.catService
      .getAllCategory()
      .subscribe({
        next: res => {
          this.categories = res;
        },

        error: () => {
          this.alertService.error(
            'Loading Failed',
            'Failed to load gallery categories. Please try again.'
          );
        }
      });
  }

  get displayedGallery(): IGallery[] {
    return this.selectedCategoryId === 0
      ? this.gallery
      : this.gallery.filter(
          project =>
            project.categoryId === this.selectedCategoryId
        );
  }
}