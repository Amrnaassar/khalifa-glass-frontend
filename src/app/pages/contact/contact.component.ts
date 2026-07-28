import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactService } from '../../core/services/contact.service';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SectionHeaderComponent,
    TranslatePipe
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  private fb = inject(FormBuilder);
  constructor(
    private authService: AuthService,
    private contactService: ContactService,
    private alertService: AlertService) {

  }
  isLoading = false;



  contactForm = this.fb.group({

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

  subject: ['', [
    Validators.required,
    Validators.minLength(5)
  ]],

  message: ['', [
    Validators.required,
    Validators.minLength(10)
  ]]

});

get f() {
  return this.contactForm.controls;
}



  submit() {

    if (this.contactForm.invalid) {

      this.contactForm.markAllAsTouched();
      console.log("invalid submit");
      return;
    }


    this.isLoading = true;


    const data = this.contactForm.value;


    this.contactService.sendMessage(data as any)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.isLoading = false;

          this.alertService.success(
            'Success',
            res.message
          );

          this.contactForm.reset();

        },


        error: (err) => {

          console.log(err);

          this.isLoading = false;

          this.alertService.error(
            'Error',
            err.error?.message ?? 'Something went wrong'
          );
        }

      });

  }

}