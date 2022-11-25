import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crypt, RSA } from 'hybrid-crypto-js';
import * as CryptoJS from 'crypto-js';
import { Keys } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private apiUrl: string = "/rest/note";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private crypt = new Crypt();
  // for AES decryption of private key
  private encryptedPassword: string = "1234567890";
  // should come from server
  private publicKey = "-----BEGIN PUBLIC KEY-----\r\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyuMmxpbP2ZuCEyXKiO20\r\nts8D8MuEb7xZyDj7piLrb3O17Rce7qE24IKzFl+ZElxVDH4bqPu7RlGRvKpe5Jcq\r\njDVEqFlMR3sJRwgWDGL3cNESPVAiRVJToUp0O9FGjXF4l+y8W2jL64UXKS4H2HbS\r\n2CkNMe3bX/tb9OkukE/5DBk26b5eaLwcrOi7cbW053AVJf9EDKWrHcOwlyg5lAmj\r\ngj7qKQ/hkDKrH4PqJIfZl43PXnxzNNCA5Q+CbJnvGctw5ew2zq2liHVTHNI/gcQt\r\nOxnJ6sPimguDp8t9686vWQPaySfNznMwa0MPxJc/OYirpJt8+HvS8fyY9VK6C1cs\r\nr8TlqZ7xw5AfyR7hyoNYNGlHWKe2v7Ftp1M4c56iXlGmnoPBtLAURCV8d58UnCDG\r\ndT6FHeDu5aNrhHQ7BHMAeWZfG0B+4NX9fwIVD+A4i+JIx040r1AJgUdjwWc6zVFR\r\nsU+PvhpkxN6BcMPd+CLEoq76d8mxfegJBFThI7XLqF4FpRpNwrEUsieaAL5qFv6l\r\n51uq9k+l6yXKInpy5201IYx8RfaYk+6DrjQTCFx0lpDyQyvDQ0A+q3TKgPLOTsZN\r\nc1tmUeUgHRwBScHFyL/+t9B/9A7WsqMJ2vDqJ9Jzss+83wCRXgYuifiyIvUj+XhA\r\nUtsPdd/QuRhBJsWeJX98xysCAwEAAQ==\r\n-----END PUBLIC KEY-----\r\n";
  private privateKey = "-----BEGIN RSA PRIVATE KEY-----\r\n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\r\n-----END RSA PRIVATE KEY-----\r\n";

  constructor(public http: HttpClient) { 
    // get keys from server
//    this.getKeys();
  }

  public encrypt(message: string): string {
    console.log("CrypteService#encrypt");
    let cipher: string = "";
    if (message) {
      cipher = this.crypt.encrypt(this.publicKey, message);
    }
    return cipher;
  }

  public decrypt(cipher: string): string {
    console.log("CrypteService#decrypt");
    let message: string = "";
    if (cipher && cipher.startsWith("{")) {
      message = this.crypt.decrypt(this.privateKey, cipher).message;
    }
    return message;
  }

  public getKeys(): void {
    console.log("CrypteService#getKeys");
    this.http.get<Keys>(this.apiUrl + "/keys", this.httpOptions).subscribe(keys => {
      if (keys) {
        this.setKeys(keys);
      }
    });
  }

  /**
   * The keys object contains the unencrypted public key and 
   * the AES encrypted and base64 encoded private key. 
   */
  private setKeys(keys: Keys): void {
    console.log("CrypteService#setKeys");
    this.publicKey = keys.publicKey;
/*  
      does not wok...

      // to AES
      let aesKey: string = CryptoJS.AES.encrypt(this.privateKey, this.encryptedPassword).toString();
      // to Base64
      let base64Data = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(aesKey));
      // and back
      let clearData = CryptoJS.enc.Base64.parse(base64Data).toString(CryptoJS.enc.Utf8);
     
      let rsa = new RSA();
      rsa.generateKeyPairAsync().then((keypair: { publicKey: any; privateKey: any; }) => {
        this.publicKey = keypair.publicKey;
        this.privateKey = keypair.privateKey;
        let aesKey: string = CryptoJS.AES.encrypt(this.privateKey, this.encryptedPassword).toString();
        let base64Data = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(aesKey));
        let clearData = CryptoJS.enc.Base64.parse(base64Data).toString(CryptoJS.enc.Utf8);
        let privateKeyy = CryptoJS.AES.decrypt(clearData, this.encryptedPassword).toString(CryptoJS.enc.Utf8);
      }); 
*/
/*
      // de-base64 and decrypt the key
      let enctyptedPK = CryptoJS.enc.Base64.parse(keys.privateKey).toString(CryptoJS.enc.Utf8);
      let privateKey = CryptoJS.AES.decrypt(enctyptedPK, this.encryptedPassword);
      this.privateKey = keys.privateKey; //privateKey.toString(CryptoJS.enc.Utf8);
*/        
  }
  
}