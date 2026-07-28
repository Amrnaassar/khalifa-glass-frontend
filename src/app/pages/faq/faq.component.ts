import { Component, inject } from '@angular/core';
import { SectionHeaderComponent } from "../../shared/components/section-header/section-header.component";
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-faq',
  imports: [SectionHeaderComponent, TranslatePipe],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FAQComponent {

  private authService=inject(AuthService);

  faqItems = [
    {
      id: 0,
      question: 'faq.questions.installation.question',
      answer: 'faq.questions.installation.answer'
    },
    {
      id: 1,
      question: 'faq.questions.warranty.question',
      answer: 'faq.questions.warranty.answer'
    },
    {
      id: 2,
      question: 'faq.questions.quote.question',
      answer: 'faq.questions.quote.answer'
    },
    {
      id: 3,
      question: 'faq.questions.pricing.question',
      answer: 'faq.questions.pricing.answer'
    },
    {
      id: 4,
      question: 'faq.questions.support.question',
      answer: 'faq.questions.support.answer'
    }
  ];


  activeFaq: number | null = 0;


  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? null : index;
  }

  goToContact(): void {
     this.authService.goIfLogged('/Contact');
  }


}
