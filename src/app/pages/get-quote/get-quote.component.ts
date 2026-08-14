import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { UserService } from '../../core/services/user.service';
import { QuoteService } from '../../core/services/quote.service';
import { AlertService } from '../../core/services/alert.service';
import { UserQuote } from '../../core/models/user-quote.model';
import { CompanyCategoryService, ICompanyCategory } from '../../shared/services/company-category.service';
import { CompanyServicesService, ICompanyService } from '../../shared/services/company-services.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { LanguageService } from '../../core/services/language.service';
@Component({
  selector: 'app-get-quote',
  standalone: true,
  imports: [SectionHeaderComponent, ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './get-quote.component.html',
  styleUrl: './get-quote.component.scss'
})
export class GetQuoteComponent implements OnInit {

  private fb = inject(FormBuilder);

  userQuotes?: UserQuote[];
  services: ICompanyService[] = [];
  categories: ICompanyCategory[] = [];

  selectedFiles: File[] = [];
  imagePreviews: string[] = [];

  quoteForm = this.fb.group({

    fullName: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    phone: ['', [
      Validators.required,
      Validators.pattern(/^(?:\+966|966|0)?5[0-9]{8}$/)
    ]],

    location: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    service: ['', Validators.required],

    projectType: ['', Validators.required],

    budget: ['', Validators.required],

    contactMethod: ['WhatsApp', Validators.required],

    message: ['', [
      Validators.required,
      Validators.minLength(10)
    ]]
  });

  // shortcut للفورم
  get f() {
    return this.quoteForm.controls;
  }

  constructor(
    private userService: UserService,
    private quoteService: QuoteService,
    private alertService: AlertService,
    private ourServices: CompanyServicesService,
    private categoryService: CompanyCategoryService,
    private language:LanguageService
  ) {
    this.services = this.ourServices.getAllServices();
    
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.userService.getCurrentUser().subscribe({
      next: (u) => {
        this.quoteForm.patchValue({
          fullName: u.fullName,
          email: u.email
        });
      }
    });

    this.quoteService.getMyQuotes().subscribe({
      next: (q) => this.userQuotes = q
    });

    this.categoryService.getAllCategory().subscribe({
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
  // =============================
  // Upload Images
  // =============================
  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    const remainingSlots = 5 - this.selectedFiles.length;

    if (remainingSlots <= 0) {
      this.alertService.error('Maximum Images', 'You can upload maximum 5 images only.');
      input.value = '';
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);

    filesToAdd.forEach(file => {
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => this.imagePreviews.push(reader.result as string);
      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  // =============================
  // Submit
  // =============================
  submit(): void {

    if (this.quoteForm.invalid) {
      this.quoteForm.markAllAsTouched();
      return;
    }

    this.quoteService.createQuote({
      fullName: this.quoteForm.value.fullName!,
      email: this.quoteForm.value.email!,
      phone: this.quoteForm.value.phone!,
      location: this.quoteForm.value.location!,
      service: this.quoteForm.value.service!,
      projectType: this.quoteForm.value.projectType!,
      budget: this.quoteForm.value.budget ?? '',
      contactMethod: this.quoteForm.value.contactMethod!,
      message: this.quoteForm.value.message!,
      images: this.selectedFiles
    }).subscribe({

      next: () => {
        this.quoteForm.reset({
          contactMethod: 'WhatsApp'
        });

        this.selectedFiles = [];
        this.imagePreviews = [];
        this.loadData();
        this.alertService.success(
          'Request Sent Successfully',
          'Thank you for contacting Khalifa Glass.'
        );
      },

      error: () => {
        this.alertService.error(
          'Submission Failed',
          'Please try again later.'
        );
      }
    });
  }
}