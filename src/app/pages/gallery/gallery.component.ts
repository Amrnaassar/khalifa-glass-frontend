import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-gallery',
  imports: [SectionHeaderComponent,TranslatePipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  gallery = [
  {
    id: 1,
    title: 'Luxury Villa',
    category: 'Residential',
    image: 'assets/images/gallery/gallery-1.jpg',
    large: false
  },
  {
    id: 2,
    title: 'Corporate Office',
    category: 'Office',
    image: 'assets/images/gallery/gallery-2.jpg',
    large: true
  },
  {
    id: 3,
    title: 'Glass Partition',
    category: 'Interior',
    image: 'assets/images/gallery/gallery-3.jpg',
    large: false
  },
  {
    id: 4,
    title: 'Modern Building',
    category: 'Exterior',
    image: 'assets/images/gallery/gallery-4.jpg',
    large: false
  },
  {
    id: 5,
    title: 'Meeting Room',
    category: 'Office',
    image: 'assets/images/gallery/gallery-5.jpg',
    large: false
  },
  {
    id: 6,
    title: 'Villa Entrance',
    category: 'Residential',
    image: 'assets/images/gallery/gallery-6.jpg',
    large: true
  }
];
}
