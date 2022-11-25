import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Keys } from '../app.model';

import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  const publicKey = "-----BEGIN PUBLIC KEY-----\r\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyuMmxpbP2ZuCEyXKiO20\r\nts8D8MuEb7xZyDj7piLrb3O17Rce7qE24IKzFl+ZElxVDH4bqPu7RlGRvKpe5Jcq\r\njDVEqFlMR3sJRwgWDGL3cNESPVAiRVJToUp0O9FGjXF4l+y8W2jL64UXKS4H2HbS\r\n2CkNMe3bX/tb9OkukE/5DBk26b5eaLwcrOi7cbW053AVJf9EDKWrHcOwlyg5lAmj\r\ngj7qKQ/hkDKrH4PqJIfZl43PXnxzNNCA5Q+CbJnvGctw5ew2zq2liHVTHNI/gcQt\r\nOxnJ6sPimguDp8t9686vWQPaySfNznMwa0MPxJc/OYirpJt8+HvS8fyY9VK6C1cs\r\nr8TlqZ7xw5AfyR7hyoNYNGlHWKe2v7Ftp1M4c56iXlGmnoPBtLAURCV8d58UnCDG\r\ndT6FHeDu5aNrhHQ7BHMAeWZfG0B+4NX9fwIVD+A4i+JIx040r1AJgUdjwWc6zVFR\r\nsU+PvhpkxN6BcMPd+CLEoq76d8mxfegJBFThI7XLqF4FpRpNwrEUsieaAL5qFv6l\r\n51uq9k+l6yXKInpy5201IYx8RfaYk+6DrjQTCFx0lpDyQyvDQ0A+q3TKgPLOTsZN\r\nc1tmUeUgHRwBScHFyL/+t9B/9A7WsqMJ2vDqJ9Jzss+83wCRXgYuifiyIvUj+XhA\r\nUtsPdd/QuRhBJsWeJX98xysCAwEAAQ==\r\n-----END PUBLIC KEY-----\r\n";
  const privateKey = "-----BEGIN RSA PRIVATE KEY-----\r\n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\r\n-----END RSA PRIVATE KEY-----\r\n";
  const MESSAGE = "With client-side encryption there is no possibility to decrypt the files on the server, e.g.in case of a phishing attack, because only encrypted key material is stored there.The key that encodes the data never leaves the user''s computer in plain text.If client - side encryption is used, it is impossible to decrypt the files in case of an attack on the server, because the key is held by the owner.Therefore, hacks on servers are not considered as data mishaps and the notification rules of the GDPR do not apply.This means that you save the cost of data failure notifications and possible fines, maintain your reputation and protect the privacy of your employees and customers.Since all files are encrypted on the user''s end device, only unreadable data can be known.These are not considered personal data or data mishaps.Fines are therefore avoided.";
  const CIPHER = "{\"v\":\"hybrid-crypto-js_0.2.4\",\"iv\":\"t1rnBWYAenHiVuj1bc/CyKR1OAIntZUOcM7pRQg9DN0=\",\"keys\":{\"bb:b1:c2:6c:06:85:7d:70:35:8b:f5:57:fc:d5:6d:3e:d0:0d:3b:c5\":\"IIe1aCt7eqShxj6g7y+tk4Mo4fVC9mrphqNiIAhR8qWJ0TuG0oRtK+pflJuYuthnsaROw8la745qrwJQ0yoEczYGeiHDKL7sIRcVFPGH3pzZ/3ETVxT/t4IDGjdzG0fna1ayb9brpg1bvueOBcne26itMs5bhrCs4w/1Sy76IeYGhFOA0XNs6ZXM3f7dHrIkTBH6s6f6a+VxZiqhzP+thTqPmxrBr5qd5fVcw6Wha7nal/rVt2nHOF0fMmol4LhdOwg6IOn/rPnPt04PAgRB66UV3DyiJECP4yzJIsv+YB6rOYwRJdU1kF2S4PDfEda1cFV9pjaQzAXToRrk0DAzwPeosz/D/uiotmbxzIOB0A8tvYks2vKCcHenErPVBJ5Gfm0Q8x5JV+Dy2nbgdyISHiymIgBR4kZnMttx/YYlfC9QlWcUT1+9kXAEVkrlgcrdIbR/M4VIonZDZ4T18sLvgX7VKb+2jgb1XlkhV5ZyJZXfDOfJKj76dRtk98EKi7DLVPdU7tHviPDzaCUEwodulIe6Eo9QtneQD+cmvMT8rSV/0EcntSZuNR75MpUPMp3qtJ8PNUtVy9apJFlHeVsi50WTxMkMpBrbn9AjcND/5kPxUhAiL0R+U9iOuIneCVSFOBx/zGvTD27eFEgT3gqH3p3m4aONq1igAvRD3jI6UkQ=\"},\"cipher\":\"j9lj3zf+xu22IEyoa2rS4FQbc+geHi9g9i4sWcX4SNz9uSleZscIDHLmkFMSIu6IQBRjvfhZ6MHkGGgeWWlxvi3FAEV7rYnyAkOxHpmdmDYzirKZvvAvadlY43T/xBZAPA2GyM5W+y+HAYSQKNsE1GHTcr9KUAMUTxurlJH/UEe3bdywP+Yu5yhEGfj/5KTHaV0CMA6+lmHujcCJBxSQe827xVkT2V7AiPkED+Ha/nMWVdDiQExt0aA0tDxA+OYOA/9+6rhMuY/z42I3t84Fg/7ZVaom41o932ZsB8imJehsJY/dqNf7TzH4N1Nwzg1OpHmTeejUzFXfIrR1TNOvc0KsvA/hcZnibSb8sIHTuhh2p/t11KDqXNHc2ZGhSpHcdAet++Ki8rRqoJ7Voy61zZydqnrE7xKikOJLkJZJ1xTbG2j93UTXw1i9UiH8ylk15GdJfyX5OYNXUi8NagBK4R1sxIgvtnFDj9Q5OzLfdkKuHxErJuoLuKiCthO0WiYPtw5VG6VtpuSRuv3bRCNW76bKST2SPAxZVkajAhY2RVgtKMv4TnwIoyK6auUFpWWKxD+VfINPYXRF4tDEZTc7GuvAkHQsg5+ctZYJUCKaimAGLPYOMdovtHkA20/fi2iHi6cusUs8Fvj/LRaEXBmB0b3V+G85Y9gHjXvIgpeoPZMybpEeVS2cdpHUr9OU+g5rfGza54GL1lOe+9bH7lTDrXuBph7Tm5TeN7Z3BFegef2Hnhw8YHpTklptdPqqYa+YWts6GDfBCHADaHdc334kQZeydUcd/UmJ0phefS70Uzkm5JAeiMMrJGomNnsWKNKHicNfsbEKPj/UJfu5BApbnHl07BWpC58BC8TNJQH9zLa6Ikv40FNaoWtjVlH436WFnfeGLDP+ffKI8sKmgKqCAcdICaskwVf+pqC+mstw0nF0pUZDdwmGOe8htPdfTIBasgajiBIcKIqnJkgw8m1wlWMteean0cZABHJkLrQLnQ2iA68dju23jS9pkHrF8v5hs9HccRBeO2+4Lq9OnyM9xfRw/Dcu+KDC2TVa+IKGnLALKuamW7z7ce1xeCtn/NRm5wlt2K+4SQuhyEds8R90zEeE5TP2lakckVYtzWNqkmxWzcUkWaVNwgGaCW6/Dykf\"}"

  let service: CryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoService);
    service.http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should decrypt', () => {
    let keys: Keys = new Keys();
    keys.privateKey = privateKey;
//    service.setKeys(keys);
    let cipher = service.encrypt(MESSAGE);
    expect(service.decrypt(cipher)).toEqual(MESSAGE);
  });

  it('should encrypt', () => { 
    let keys: Keys = new Keys();
    keys.publicKey = publicKey;
//    service.setKeys(keys);
    let message = service.decrypt(CIPHER);
    expect(service.encrypt(message)).toEqual(CIPHER);
  });
});

