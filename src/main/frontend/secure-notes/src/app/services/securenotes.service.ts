import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecureNote } from '../app.model';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class  SecureNotesService {
  
  private apiUrl: string = "/rest/note";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient,
    private cryptoService: CryptoService) {
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
    if (secureNote.note) {
      secureNote.note = this.cryptoService.encrypt(secureNote.note);
    }
    console.log("SecureNotesService#post -> " + this.apiUrl + " " + secureNote.title);
    return this.http.post<SecureNote>(this.apiUrl, secureNote, this.httpOptions);
  }

  put(secureNote: SecureNote): Observable<SecureNote> {
    secureNote.note = this.cryptoService.encrypt(secureNote.note);
    console.log("SecureNotesService#put -> " + this.apiUrl + " " + secureNote.title);
    return this.http.put<SecureNote>(this.apiUrl + "/" + secureNote.id, secureNote, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    console.log("SecureNotesService#delete -> " + this.apiUrl + "/" + id);
    return this.http.delete(this.apiUrl + "/" + id, this.httpOptions);
  }

}