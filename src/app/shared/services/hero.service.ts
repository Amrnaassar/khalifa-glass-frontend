import { Injectable } from '@angular/core';

export interface IHero{
  id:number
  title:string
  text:string
  img:string
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heroItems:IHero[] = [
  {
    id: 1,
    title: 'hero.slides.slide1.title',
    text: 'hero.slides.slide1.text',
    img: 'assets/images/hero/hero1.png'
  },
  {
    id: 2,
    title: 'hero.slides.slide2.title',
    text: 'hero.slides.slide2.text',
    img: 'assets/images/hero/hero2.png'
  },
  {
    id: 3,
    title: 'hero.slides.slide3.title',
    text: 'hero.slides.slide3.text',
    img: 'assets/images/hero/hero3.png'
  }
];
  constructor() { }
  getAllHeroItems():IHero[]{
    return this.heroItems;
  }
}
