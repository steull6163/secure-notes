import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SecureNote } from '../app.model';
import { SecureNotesService } from '../services/securenotes.service';

const CLICK: string = "Click...";
const CHOICES: string[] = ["> RAW", "> CLEAR"];

@Component({
  selector: 'app-securenotes-dialog',
  templateUrl: './securenotes-dialog.component.html',
  styleUrls: ['./securenotes-dialog.component.css']
})
export class SecurenotesDialog implements OnInit {
  @ViewChild('titleinput') titleinput: ElementRef | undefined;
  @ViewChild('getbutton') getbutton: ElementRef | undefined;

  new: boolean = false;
  raw: boolean = false;
  note: boolean = false;
  choosen: boolean = false;
  changed: boolean = false;
  showDatabase: boolean = false;

  title: string = "";
  noteBox: string = "";
  titleBox: string = "";
  clickBox: string = CLICK;
  viewChoice: string = CHOICES[0];
  choices: string[] = [];

  displayedtitle: string = "";
  displayedNote: string = "";
  selectedNote: SecureNote[] = [];
  notes: SecureNote[] = [];

  notesForm: FormGroup;
  columnsToDisplay = ["title", "note"];
  secureNotesDataSource = new MatTableDataSource<SecureNote>();

  constructor(private fb: FormBuilder,
    private router: Router,
    private secureNotesService: SecureNotesService) {
    this.notesForm = this.fb.group({
      choice: [],
      title: [],
      note: [],
      raw: []
    });  
    this.notesForm.controls["title"].valueChanges.subscribe(value => {
      if (this.displayedtitle == "") {
        this.displayedtitle = value;
      }
      if (value == "") {
        this.new = false;
      } else {
        this.changed = this.displayedtitle !== value;
      }
    });
    this.notesForm.controls["note"].valueChanges.subscribe(value => {
      if (this.displayedNote == "") {
        this.displayedNote = value;
      }
      if (!this.raw) {
        this.changed = this.displayedNote !== value;
      }
    });
   }

  ngOnInit(): void {
    console.log("SecurenotesDialog#ngOnInit");
    this.secureNotesService.getTitles().subscribe(titles => {
      this.choices = titles;
      this.choices.push("NEW");
    }); 
  }

  get() {
    this.notesForm.controls["note"].setValue("");
    const choice = this.notesForm.controls["choice"].value;
    console.log("SecurenotesDialog#get " + choice);
    this.secureNotesService.get(choice).subscribe(secureNote => {
      const text = this.secureNotesService.decrypt(secureNote.note);
      this.notesForm.controls["title"].setValue(choice);
      this.notesForm.controls["note"].setValue(text, { emitModelToViewChange: true });
      this.notesForm.controls["choice"].setValue("");
      this.selectedNote.push(secureNote);
      this.titleBox = "Title";
      this.noteBox = "Note";
      this.title = choice;
      this.choosen = false;
      this.changed = false;
      this.note = true;
    });
  }

  put() {
    console.log("SecurenotesDialog#put " + this.notesForm.controls["title"].value);
    const note = this.selectedNote.pop();
    if (note) {
      const selectedNode: SecureNote = note as SecureNote;
      selectedNode.note = this.notesForm.controls["note"].value;
      selectedNode.title = this.notesForm.controls["title"].value;
      this.choices.splice(this.choices.indexOf(this.displayedtitle), 1);
      this.secureNotesService.put(selectedNode).subscribe(secureNote => {
        const text = this.secureNotesService.decrypt(secureNote.note);
        this.notesForm.controls["title"].setValue(secureNote.title);
        this.notesForm.controls["note"].setValue(text, { emitModelToViewChange: true });
        this.selectedNote.push(secureNote);
        const NEW = this.choices.pop();
        this.choices.push(secureNote.title);
        this.choices.push(NEW!);
        this.changed = false;
        this.updateDB();
      });
    }
  }

  post() {
    console.log("SecurenotesDialog#post " + this.notesForm.controls["title"].value);
    const secureNote: SecureNote = new SecureNote();
    secureNote.title = this.notesForm.controls["title"].value;
    secureNote.note = this.notesForm.controls["note"].value;
    this.secureNotesService.post(secureNote).subscribe(secureNote => {
      this.selectedNote.push(secureNote);
      const NEW = this.choices.pop();
      this.choices.push(secureNote.title);
      this.choices.push(NEW!);
      this.changed = false;
      this.note = true;
      this.new = false;
      this.updateDB();     
    });      
  }
    
  delete() {
    console.log("SecurenotesDialog#delete " + this.notesForm.controls["title"].value);
    const selectedNode: SecureNote = this.selectedNote[0];
    this.choices.splice(this.choices.indexOf(selectedNode.title), 1);
    this.secureNotesService.delete(selectedNode.id!).subscribe(result => {
      if (result) {
        this.selectedNote = [];
        this.updateDB();
        this.reset();
      }
    });
  }

  choose(choice: string) {
    this.reset();
    this.choosen = true;
    if (choice.trim() === "NEW") {
      this.prepareNew();
    } else {
      if (this.getbutton) {
        this.getbutton!.nativeElement.focus();
      }
    }
  }

  prepareNew() {
    console.log("SecurenotesDialog#prepareNew");
    this.notesForm.controls["note"].setValue("");
    this.notesForm.controls["choice"].setValue("");
    this.titleinput!.nativeElement.focus();
    this.clickBox = CLICK;
    this.choosen = false;
    this.changed = false;
    this.new = true;
  }

  toggleEncryption() {
    console.log("SecurenotesDialog#toggleView");
    const selectedNote = this.selectedNote[0];
    this.raw = !this.raw;
    const change = this.changed;
    if (this.raw) {
      // encrypt (get original value)
      this.notesForm.controls["note"].setValue(selectedNote.note);
      this.notesForm.controls["note"].disable();
      this.viewChoice = CHOICES[1];
    } else {
      // decrypt
      this.displayedNote = this.secureNotesService.decrypt(selectedNote.note);
      this.notesForm.controls["note"].setValue(this.displayedNote);
      this.notesForm.controls["note"].enable();
      this.viewChoice = CHOICES[0];
    }
    if (this.changed !== change) {
      console.log("changed: " + this.changed);
      this.changed = change;
    }
  }

  toggleDbView() {
    console.log("SecurenotesDialog#toggleDbView");
    this.showDatabase = !this.showDatabase;
    if (this.showDatabase) {
      this.updateDB();
    }
  }

  private updateDB() {
    console.log("SecurenotesDialog#updateDB");
    this.secureNotesService.getNotes().subscribe(notes => {
      this.secureNotesDataSource.data = notes;
      this.notes = notes;
    });
  }

  reset() {
    console.log("SecurenotesDialog#reset");
    this.notesForm.controls["title"].setValue("");
    this.displayedtitle = "";
    this.notesForm.controls["note"].setValue("");
    this.displayedNote = "";
    this.viewChoice = CHOICES[0];
    this.clickBox = CLICK;
    this.titleBox = "";
    this.noteBox = "";
    this.changed = false;
    this.note = false;
    this.new = false;
    this.raw = false;
  }
}
