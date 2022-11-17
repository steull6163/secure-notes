import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SecureNote } from '../app.model';

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

  constructor(private http: HttpClient) {
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
    return this.http.put<SecureNote>(this.apiUrl, secureNote, this.httpOptions);
  }

  delete(id: number): void {
    console.log("SecureNotesService#delete -> " + this.apiUrl + "/" + id);
    this.http.delete(this.apiUrl + "/" + id, this.httpOptions);
  }

  encrypt(note: string): string {                       
    console.log("SecureNotesService#encrypt");
    const parts = note.split("_");
    if (parts.length == 2) {
      return "ENCRYPTED_" + parts[1];  
    }
    return "ENCRYPTED_" + note;
  }

  decrypt(note: string): string {
    console.log("SecureNotesService#decrypt");
    const parts = note.split("_");
    return "DECRYPTED_" + parts[1];
  }
}