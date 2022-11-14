import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SecureNote } from '../app.model';
import { SecureNotesService } from '../services/securenotes.service';

@Component({
  selector: 'app-securenotes-dialog',
  templateUrl: './securenotes-dialog.component.html',
  styleUrls: ['./securenotes-dialog.component.css']
})
export class SecurenotesDialog implements OnInit {

  new: boolean = false;
  raw: boolean = false;
  note: boolean = false;
  title: boolean = false;
  changed: boolean = false;
  titles: string[] = [];
  displayedNote: string  = "";
  notesForm: FormGroup;
  notes: SecureNote[] = [];
  clickTitle: string = "Klick...";

  constructor(private fb: FormBuilder,
    private secureNotesService: SecureNotesService) {
    this.notesForm = this.fb.group({
      title: [],
      note: [],
      raw: []
    });
    this.notesForm.controls["title"].valueChanges.subscribe(value => {
      if ("NEW" === value) {
        this.prepareNew();
      }
    });
    this.notesForm.controls["note"].valueChanges.subscribe(value => {
      if (this.displayedNote == "") {
        this.displayedNote = value;
      }
      if (this.displayedNote !== value) {
        this.changed = true;
      }
    });
   }

  ngOnInit(): void {
    console.log("SecurenotesDialog#ngOnInit");
    this.secureNotesService.getSecureNotes().subscribe(notes => {
      this.notes = notes;
      this.notes.forEach(note => this.titles.push(note.title));
      this.titles.push("NEW");
    });    
  }

  get() {
    console.log("SecurenotesDialog#get");
    this.notesForm.controls["note"].setValue("");
    const selectedTitle = this.notesForm.controls["title"].value;
    const secureNote = this.notes.find(secureNote => secureNote.title === selectedTitle);
    if (secureNote) {
      const text = this.secureNotesService.getClearText(secureNote.note);
      this.notesForm.controls["note"].setValue(text, { emitModelToViewChange: true });
      this.changed = false;
      this.note = true;
    }
  }

  put() {
    console.log("SecurenotesDialog#put");
    // TODO: validate form
    this.secureNotesService.updateSecureNote(this.notesForm.value);
  }

  post() {
    console.log("pSecurenotesDialog#ost");
    // TODO: validate form
    this.secureNotesService.createSecureNote(this.notesForm.value).subscribe(note => {
      if (note) {
        this.notes.push(note);
      }
      this.ngOnInit();
    });
  }
    
  delete() {
    console.log("SecurenotesDialog#delete");
    const selectedTitle = this.notesForm.controls["title"].value;
    const secureNote = this.notes.find(secureNote => secureNote.title === selectedTitle);
    if (secureNote && secureNote.id) {
      this.secureNotesService.deleteSecureNote(secureNote.id);
    }
    this.notes = this.notes.filter(note => note.title !== selectedTitle);
  }

  showRaw(event: MatCheckboxChange) {  
    console.log("SecurenotesDialog#showRaw"); 
    const secureNote = this.notesForm.value;    
    if (event.checked) {
      // encrypt
      this.displayedNote = this.secureNotesService.encrypt(secureNote!.note);
      this.notesForm.controls["note"].setValue(this.displayedNote, { emitModelToViewChange: true });     
    } else {
      this.displayedNote = this.notes.find(note => {
        note => note.title === this.notesForm.controls["title"].value}
        ));

      this.notesForm.controls["note"].setValue(this.s, { emitModelToViewChange: true });
    }   
    this.raw = event.checked;
    this.changed = false;
  }

  prepareNew() {
    console.log("SecurenotesDialog#prepareNew");
    this.notesForm.controls["note"].setValue("");
    this.notesForm.controls["title"].setValue("");
    this.clickTitle = "";
    this.new = true;
  }

}
