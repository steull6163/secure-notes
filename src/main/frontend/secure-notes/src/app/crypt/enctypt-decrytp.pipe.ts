import { Pipe, PipeTransform } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const key = 'TUc0emRqRXpkdw==';

@Pipe({name: 'encrypted'})
export class EncryptPipe implements PipeTransform {
  enctypted: string = "";
  transform(decrypted: string) {
    if (decrypted) {
      this.enctypted = CryptoJS.AES.encrypt(decrypted, key).toString();
    }
    return this.enctypted;
  }
}

@Pipe({name: 'decrypted'})
export class DecryptPipe implements PipeTransform {
  dectypted: string = "";
  transform(encrypted: string) {
    if (encrypted) {
      const decrypted = CryptoJS.AES.decrypt(encrypted, key);
      this.dectypted = decrypted.toString(CryptoJS.enc.Utf8);
    }
    return this.dectypted;
  }
}