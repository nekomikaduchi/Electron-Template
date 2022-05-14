import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  text: string = '';

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.subscription = this.loadingService.textSub.subscribe(
      (text: string) => {
        this.text = text;
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
