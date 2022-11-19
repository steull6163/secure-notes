import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecureNote } from '../app.model';
import { DecryptPipe, EncryptPipe } from '../crypt/enctypt-decrytp.pipe';

@Injectable({
  providedIn: 'root'
})
export class  SecureNotesService {
  
  private apiUrl: string = "/rest/note"; // "http://localhost:8080/rest/note";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient,
    private encryptPipe: EncryptPipe,
    private decryptPipe: DecryptPipe) {
  }

  getTitles(): Observable<string[]> {
    console.log("SecureNotesService#getTitles -> " + this.apiUrl + "/titles");
    return this.http.get<string[]>(this.apiUrl + "/titles", this.httpOptions);
  }

  getNotes(): Observable<SecureNote[]> {
    console.log("SecureNotesService#getNotes -> " + this.apiUrl);
    return this.http.get<SecureNote[]>(this.apiUrl, this.httpOptions);
  }

  get(title: string): Observable<SecureNote> {
    console.log("SecureNotesService#get -> " + this.apiUrl + "/" + title);
    return this.http.get<SecureNote>(this.apiUrl + "/" + title, this.httpOptions);
  }

  post(secureNote: SecureNote): Observable<SecureNote> {
    secureNote.note = this.encrypt(secureNote.note);
    console.log("SecureNotesService#post -> " + this.apiUrl + " " + secureNote.title);
    return this.http.post<SecureNote>(this.apiUrl, secureNote, this.httpOptions);
  }

  put(secureNote: SecureNote): Observable<SecureNote> {
    secureNote.note = this.encrypt(secureNote.note);
    console.log("SecureNotesService#put -> " + this.apiUrl + " " + secureNote.title);
    return this.http.put<SecureNote>(this.apiUrl + "/" + secureNote.id, secureNote, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    console.log("SecureNotesService#delete -> " + this.apiUrl + "/" + id);
    return this.http.delete(this.apiUrl + "/" + id, this.httpOptions);
  }

  decrypt(note: string): string {
    console.log("SecureNotesService#decrypt");
    return this.decryptPipe.transform(note);
  }

  private encrypt(note: string): string {
    console.log("SecureNotesService#encrypt");
    return this.encryptPipe.transform(note);
  }
}