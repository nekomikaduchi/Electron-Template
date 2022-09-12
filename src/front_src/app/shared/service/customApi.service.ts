import { Injectable } from '@angular/core';
import { APIService } from '../../API.service';

@Injectable({
  providedIn: 'root',
})
export class CustomApiService extends APIService {}
