import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { API } from '../constants/api.constants';
  import { CreateQuoteRequest } from '../models/create-quote-request.model';
import { UserQuote } from '../models/user-quote.model';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private readonly http = inject(HttpClient);

  createQuote(request: CreateQuoteRequest): Observable<any> {

    const formData = new FormData();

    formData.append('FullName', request.fullName);
    formData.append('Email', request.email);
    formData.append('Phone', request.phone);
    formData.append('Location', request.location);
    formData.append('Service', request.service);
    formData.append('ProjectType', request.projectType);

    if (request.budget) {
      formData.append('Budget', request.budget);
    }

    formData.append('ContactMethod', request.contactMethod);
    formData.append('Message', request.message);

    request.images?.forEach(image => {
      formData.append('Images', image);
    });

    return this.http.post(API.BASE_API_URL + API.QUOTES.CREATE, formData);
  }


  getMyQuotes():Observable<UserQuote[]>{
        return this.http.get<UserQuote[]>(API.BASE_API_URL + API.QUOTES.MY_QUOTES);
  }

   getAllQuotes(): Observable<Quote[]> {

    return this.http.get<Quote[]>(
      API.BASE_API_URL + API.QUOTES.GET_ALL
    );

  }



  updateStatus(
    id: string,
    status: number
  ): Observable<any> {

    return this.http.put(
      `${API.BASE_API_URL}${API.QUOTES.UPDATE_STATUS}/${id}/status`,
      {
        status
      }
    );

  }



  deleteQuote(id: string): Observable<any> {

    return this.http.delete(
      `${API.BASE_API_URL}${API.QUOTES.DELETE}/${id}`
    );

  }

}