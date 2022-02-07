import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  private subs = new Subscription();

  evenNumbers: Array<number> = [];
  oddNumbers: Array<number> = [];
  squares: Array<number> = [];

  pizzas$ = of([
    "Salami", "Quattro Formagi", "Diavolo"
  ]);
  
  helloWorld$ = new Observable<string>(observer => {
    observer.next('H');
    observer.next('e');
    observer.next('l');
    observer.next('l');
    observer.next('o');
    observer.next(' ');
    observer.next('W');
    observer.next('o');
    observer.next('r');
    observer.next('l');
    observer.next('d');
    observer.complete();
  });

  integers$ = new Observable<number>(observer => {
    for(let n = 1; n <= 10; n++) {
      observer.next(n);
    }
    observer.complete();
  });

  ngOnInit(): void {
    this.subs.add(
      this.helloWorld$.pipe(
        // all operators go in here
        tap(letter => console.log(letter))
      ).subscribe());

    this.subs.add(this.integers$.pipe(
      filter(x => x%2 == 0)
    ).subscribe({
      next: n => this.evenNumbers.push(n)
    }));

    this.subs.add(this.integers$.pipe(
      filter(x => x%2 == 1)
    ).subscribe({
      next: n => this.oddNumbers.push(n)
    }));

    this.subs.add(this.integers$.pipe(
      map(x => x ** 2)
    ).subscribe({
      next: n => this.squares.push(n)
    }));


    this.subs.add(this.integers$.pipe(
      filter(x => x%2 == 0),
      map(x => x ** 2),
      tap(x => console.log(x))
    ).subscribe());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

