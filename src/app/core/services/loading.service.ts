import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private requests = 0;

  private loadingSubject = new BehaviorSubject(false);

  loading$ = this.loadingSubject.asObservable();

  show() {

    this.requests++;

    this.loadingSubject.next(true);

  }

  hide() {

    this.requests--;

    if (this.requests <= 0) {

      this.requests = 0;

      this.loadingSubject.next(false);

    }

  }

}