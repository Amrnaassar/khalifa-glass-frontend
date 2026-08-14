import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { GalleryService, IGallery } from '../../shared/services/gallery.service';
import { CompanyCategoryService, ICompanyCategory } from '../../shared/services/company-category.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-gallery',
  imports: [SectionHeaderComponent, TranslatePipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {

  selectedCategoryId = 0;
  gallery: IGallery[] = [];
  categories: ICompanyCategory[] = [];

  constructor(private galleryService: GalleryService,
    private catService: CompanyCategoryService,
    private language: LanguageService) {
  }
  ngOnInit(): void {
    this.loadData();
  }

  getCategoryName(catId: number): string {
    return this.language.isArabic() ? (this.categories.find(cat => cat.id === catId)?.nameAr ?? '') : (this.categories.find(cat => cat.id === catId)?.nameEn ?? '');
  }

  filterGallery(categoryId: number) {
    this.selectedCategoryId = categoryId;
  }
  getCategorytitle(category: ICompanyCategory): string {
    return this.language.isArabic()
      ? category.nameAr
      : category.nameEn;
  }
  loadData() {
    this.galleryService.getAllGallery().subscribe({
      next: (res) => {
        this.gallery = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.catService.getAllCategory().subscribe({
      next: (res) => {
        this.categories = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  get displayedGallery() {

    const filteredGalley =
      this.selectedCategoryId === 0
        ? this.gallery
        : this.gallery.filter(
          project => project.categoryId === this.selectedCategoryId
        );

    return filteredGalley;

  }

}
