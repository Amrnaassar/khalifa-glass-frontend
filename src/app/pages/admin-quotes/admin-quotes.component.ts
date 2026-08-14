import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteService } from '../../core/services/quote.service';
import { Quote } from '../../core/models/quote.model';
import { AlertService } from '../../core/services/alert.service';
import { API } from '../../core/constants/api.constants';


@Component({
  selector: 'app-admin-quotes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './admin-quotes.component.html',
  styleUrl: './admin-quotes.component.scss'
})
export class AdminQuotesComponent {


  private quoteService = inject(QuoteService);
  private alertService = inject(AlertService);


  quotes: Quote[] = [];

  filteredQuotes: Quote[] = [];



  baseUrl = API.BASE_URL;

  selectedStatus = -1;

  selectedQuote: Quote | null = null;

  showDetails = false;

  showImagePreview = false;

  selectedImage: string | null = null;



  statuses = [

    {
      id: -1,
      name: 'All'
    },

    {
      id: 0,
      name: 'Pending'
    },

    {
      id: 1,
      name: 'Viewed'
    },

    {
      id: 2,
      name: 'Contacted'
    },

    {
      id: 3,
      name: 'Completed'
    },

    {
      id: 4,
      name: 'Cancelled'
    }

  ];

  openStatusMenu: string | null = null;

  toggleStatusMenu(id: string) {
    this.openStatusMenu =
      this.openStatusMenu === id ? null : id;
  }

  changeStatus(id: string, status: number) {

    this.updateStatus(id, status);

    this.openStatusMenu = null;

  }



  ngOnInit(): void {

    this.loadQuotes();

  }




  loadQuotes(): void {


    this.quoteService
      .getAllQuotes()
      .subscribe({

        next: (res) => {


          this.quotes = res;


          this.filteredQuotes = res;


        },


        error: (err) => {

          console.log(err);

        }


      });


  }





  filterQuotes(status: number): void {


    this.selectedStatus = status;



    if (status === -1) {

      this.filteredQuotes = this.quotes;

      return;

    }



    this.filteredQuotes =
      this.quotes.filter(
        quote => quote.status === status
      );


  }





  getStatus(status: number): string {


    const statusList = [

      'Pending',

      'Viewed',

      'Contacted',

      'Completed',

      'Cancelled'

    ];


    return statusList[status];

  }

  getImages(images: string | null): string[] {


    if (!images) {

      return [];

    }


    return JSON.parse(images);


  }

  updateStatus(id: string, status: number): void {

    this.quoteService
      .updateStatus(id, status)
      .subscribe({

        next: () => {


          const quote = this.quotes
            .find(q => q.id === id);


          if (quote) {

            quote.status = status;

          }


          this.filterQuotes(this.selectedStatus);
          this.alertService.success(
            'Status Updated',
            'Quote status has been updated successfully.'
          );

        },


        error: (err) => {

          this.alertService.error(
            'Update Failed',
            'Failed to update quote status.'
          );


        }

      });


  }

  deleteQuote(id: string): void {


    this.alertService.confirm(
      'Delete Quote?',
      'Are you sure you want to delete this quote?'
    )
      .then(result => {


        if (!result.isConfirmed) {

          return;

        }



        this.quoteService
          .deleteQuote(id)
          .subscribe({

            next: () => {


              this.quotes =
                this.quotes.filter(
                  q => q.id !== id
                );


              this.filterQuotes(
                this.selectedStatus
              );



              this.alertService.success(
                'Deleted',
                'Quote deleted successfully.'
              );


            },


            error: () => {


              this.alertService.error(
                'Delete Failed',
                'Failed to delete quote.'
              );


            }

          });


      });


  }

  openDetails(quote: Quote): void {


    console.log(quote.imagePaths);
    this.selectedQuote = quote;

    this.showDetails = true;

  }



  closeDetails(): void {

    this.selectedQuote = null;

    this.showDetails = false;

  }

  openImage(image: string): void {


    this.selectedImage =
      image;


    this.showImagePreview = true;


  }



  closeImage(): void {


    this.selectedImage = null;


    this.showImagePreview = false;


  }



}