import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Theme } from '../models/theme.model';
import { StyleManagerService } from './styling.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
  constructor(
    private http: HttpClient,
    private styleManagerService: StyleManagerService
  ) {}

  getThemeOptions(): Observable<Array<Theme>> {
    return this.http.get<Array<Theme>>('assets/styles/options.json');
  }

  setTheme(themeToSet: string): void {
    this.styleManagerService.setStyle(
        'theme',
        `${themeToSet}.css`
      );
  }
}
