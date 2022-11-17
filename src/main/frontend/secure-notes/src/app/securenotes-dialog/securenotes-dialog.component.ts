import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SecureNote } from '../app.model';
import { SecureNotesService } from '../services/securenotes.service';

const KLICK: string = "Klick...";

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
  database: boolean = false;
  titles: string[] = [];
  displayedNote: string  = "";
  notesForm: FormGroup;
  notes: SecureNote[] = [];
  clickTitle: string = KLICK;
  secureNotesDataSource = new MatTableDataSource<SecureNote>();
  columnsToDisplay = ["title", "note"];

  constructor(private fb: FormBuilder,
    private router: Router,
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
    this.secureNotesService.getTitles().subscribe(titles => {
      this.titles = titles;
      this.titles.push("NEW");
    }); 
  }

  get() {
    this.notesForm.controls["note"].setValue("");
    const selectedTitle = this.notesForm.controls["title"].value;
    console.log("SecurenotesDialog#get " + selectedTitle);
    this.secureNotesService.get(selectedTitle).subscribe(secureNote => {
      const text = this.secureNotesService.decrypt(secureNote.note);
      this.notesForm.controls["note"].setValue(text, { emitModelToViewChange: true });
      this.changed = false;
      this.note = true;
    });
  }

  put() {
    console.log("SecurenotesDialog#put " + this.notesForm.controls["title"].value);
    // TODO: validate form
    this.secureNotesService.put(this.notesForm.value);
    this.reset()
  }

  post() {
    console.log("SecurenotesDialog#post " + this.notesForm.controls["title"].value);
    // TODO: validate form
    this.secureNotesService.post(this.notesForm.value).subscribe(note => {
      this.notes.push(note);
      const NEW = this.titles.pop();
      this.titles.push(note.title);
      this.titles.push(NEW!);
      this.reset();      
    });      
  }
    
  delete() {
    console.log("SecurenotesDialog#delete " + this.notesForm.controls["title"].value);
    const selectedTitle = this.notesForm.controls["title"].value;
    const secureNote = this.notes.find(secureNote => secureNote.title === selectedTitle);
    if (secureNote && secureNote.id) {
      this.secureNotesService.delete(secureNote.id);
    }
    this.notes = this.notes.filter(note => note.title !== selectedTitle);
    this.reset();
  }

  toggleView(event: MatCheckboxChange) {  
    console.log("SecurenotesDialog#toggleView"); 
    const secureNote = this.notesForm.value;    
    if (event.checked) {
      // encrypt
      this.displayedNote = this.secureNotesService.encrypt(secureNote!.note);
      this.notesForm.controls["note"].setValue(this.displayedNote, { emitModelToViewChange: true });     
    } else {
      // decrypt
      this.displayedNote = this.secureNotesService.decrypt(this.notesForm.controls["note"].value);
      this.notesForm.controls["note"].setValue(this.displayedNote, { emitModelToViewChange: true });
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

  toggleDbView() {
    console.log("SecurenotesDialog#toggleDbView");
    this.secureNotesService.getNotes().subscribe(notes => {
      this.secureNotesDataSource.data = notes;
      this.database = !this.database;
      this.notes = notes;
    });
  }

  private reset() {
    console.log("SecurenotesDialog#reset");
    this.clickTitle = KLICK;
    this.notesForm.controls["title"].setValue("");
    this.notesForm.controls["note"].setValue("");
    this.database = false;
    this.changed = false;
    this.note = false;
    this.new = false;
  }
}
