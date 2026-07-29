import { Injectable } from '@angular/core';

export interface IGallery{
  id:number
  title:string
  catId:number
  image:string
  large:boolean
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

   gallery:IGallery[] = [
  {
    id: 1,
    title: 'Luxury Villa',
    catId: 1,
    image: 'assets/images/gallery/gallery-1.jpg',
    large: false
  },
  {
    id: 2,
    title: 'Corporate Office',
    catId: 1,
    image: 'assets/images/gallery/gallery-2.jpg',
    large: true
  },
  {
    id: 3,
    title: 'Glass Partition',
    catId: 2,
    image: 'assets/images/gallery/gallery-3.jpg',
    large: false
  },
  {
    id: 4,
    title: 'Modern Building',
    catId: 2,
    image: 'assets/images/gallery/gallery-4.jpg',
    large: false
  },
  {
    id: 5,
    title: 'Meeting Room',
    catId: 3,
    image: 'assets/images/gallery/gallery-5.jpg',
    large: false
  },
  {
    id: 6,
    title: 'Villa Entrance',
    catId: 4,
    image: 'assets/images/gallery/gallery-6.jpg',
    large: true
  }
];
  constructor() { }
  getAllGallery():IGallery[]{
    return this.gallery;
  }
}
