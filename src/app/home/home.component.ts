import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}
  private firstObsSubscription: Subscription;
  ngOnInit() {
    // //Analyzing Angular Observables
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    // Building a Custom Observable
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          // Errors & (Completion)
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("Count is greater 3!"));
        }
        count++;
      }, 1000);
    });

    // (Errors) & Completion
    this.firstObsSubscription = customIntervalObservable.subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        console.log("Completed!");
      }
    );

    // customIntervalObservable.subscribe((data) => {
    //   console.log(data);
    // });
  }
  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
