import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private title = inject(Title);
  private meta = inject(Meta);
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);


  private currentPage = '';

  constructor() {

    this.translate.onLangChange.subscribe(() => {

      if (this.currentPage) {
        this.updateSeo(this.currentPage);
      }

    });

  }


  updateSeo(page: string) {

    this.currentPage = page;

    const prefix = `seo.${page}`;

    this.translate.get([
      `${prefix}.title`,
      `${prefix}.description`,
      `${prefix}.keywords`
    ])
    .subscribe(translations => {


      const title =
        translations[`${prefix}.title`];

      const description =
        translations[`${prefix}.description`];

      const keywords =
        translations[`${prefix}.keywords`];


      const url = this.document.location.href;


      /*
        Basic SEO
      */

      this.title.setTitle(title);


      this.meta.updateTag({
        name: 'description',
        content: description
      });


      this.meta.updateTag({
        name: 'keywords',
        content: keywords
      });


      /*
        Open Graph
      */

      this.meta.updateTag({
        property: 'og:title',
        content: title
      });


      this.meta.updateTag({
        property: 'og:description',
        content: description
      });


      this.meta.updateTag({
        property: 'og:type',
        content: 'website'
      });


      this.meta.updateTag({
        property: 'og:url',
        content: url
      });


      this.meta.updateTag({
        property: 'og:site_name',
        content: 'Khalifa Glass'
      });

      /*
        Twitter Card
      */

      this.meta.updateTag({
        name: 'twitter:card',
        content: 'summary_large_image'
      });


      this.meta.updateTag({
        name: 'twitter:title',
        content: title
      });


      this.meta.updateTag({
        name: 'twitter:description',
        content: description
      });



      /*
        Canonical
      */

      this.setCanonicalURL(url);


    });

  }



  private setCanonicalURL(url: string) {

    let link: HTMLLinkElement | null =
      this.document.querySelector(
        'link[rel="canonical"]'
      );


    if (!link) {

      link =
        this.document.createElement('link');

      link.setAttribute(
        'rel',
        'canonical'
      );

      this.document.head.appendChild(link);

    }


    link.setAttribute(
      'href',
      url
    );

  }


}