import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { GalleryService, IGallery } from '../../shared/services/gallery.service';
import { CompanyCategoryService, ICompanyCategory } from '../../shared/services/company-category.service';

@Component({
  selector: 'app-gallery',
  imports: [SectionHeaderComponent, TranslatePipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  selectedCategoryId = 0;
  gallery: IGallery[];
  categories: ICompanyCategory[];

  constructor(private galleryService: GalleryService,private catService:CompanyCategoryService) {
    this.gallery = galleryService.getAllGallery();
    this.categories=catService.getAllCategory();
  }

  getCategoryName(catId: number): string {
  return this.categories.find(cat => cat.id === catId)?.name ?? '';
}
  filterGallery(categoryId: number) {
    this.selectedCategoryId = categoryId;
  }

  get displayedGallery() {

    const filteredGalley =
      this.selectedCategoryId === 0
        ? this.gallery
        : this.gallery.filter(
          project => project.catId === this.selectedCategoryId
        );

    return filteredGalley;
      
  }

}
