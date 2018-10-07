import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TranslateProvider {

  data: any = {};

  constructor(private http: HttpClient) { }

  use(lang: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const langPath = `assets/i18n/${lang || 'en'}.json`;
      this.http.get<{}>(langPath).subscribe(
        translation => {
          this.data = Object.assign({}, translation || {});
          resolve(this.data);
        },
        error => {
          console.error(error);
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
}
