import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SecureNote } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class  SecureNotesService {
  
  private host: any;
  private apiUrl: string = "/rest/note"; // "http://localhost:8080/rest/note";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient,
    private route: ActivatedRoute) {
      this.host = route.firstChild?.outlet;
    }

  getSecureNotes(): Observable<SecureNote[]> {
    console.log("SecureNotesService#getSecureNotes -> " + this.apiUrl);
    return this.http.get<SecureNote[]>(this.apiUrl, this.httpOptions);
  }

  getSecureNote(id: number): Observable<SecureNote> {
    console.log("SecureNotesService#getSecureNote -> " + this.apiUrl + "/" + id);
    return this.http.get<SecureNote>(this.apiUrl + "/" + id, this.httpOptions);
  }

  createSecureNote(secureNote: SecureNote): Observable<SecureNote> {
    console.log("SecureNotesService#createSecureNote -> " + this.apiUrl);
    secureNote.note = this.encrypt(secureNote.note);
    console.log(this.route.url);
    return this.http.post<SecureNote>(this.apiUrl, secureNote, this.httpOptions);
  }

  updateSecureNote(secureNote: SecureNote): Observable<SecureNote> {
    console.log("SecureNotesService#updateSecureNotes -> " + this.apiUrl);
    secureNote.note = this.encrypt(secureNote.note);
    return this.http.put<SecureNote>(this.apiUrl, secureNote, this.httpOptions);
  }

  deleteSecureNote(id: number): void {
    console.log("SecureNotesService#deleteSecureNotes -> " + this.apiUrl + "/" + id);
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