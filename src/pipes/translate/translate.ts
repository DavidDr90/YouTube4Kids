import { Pipe, PipeTransform } from '@angular/core';
import { TranslateProvider } from '../../providers/translate/translate';


@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  
  constructor(private translate: TranslateProvider) { }
  
  transform(key: any): any {
    return this.translate.data[key] || key;
  }
  
}