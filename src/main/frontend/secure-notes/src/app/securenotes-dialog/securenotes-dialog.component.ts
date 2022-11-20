import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
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
  choosen: boolean = false;
  noteInitial: boolean = true;
  noteChanged: boolean = false;
  titleInitial: boolean = true;
  titleChanged: boolean = false;

  showGET: boolean = false;
  showPUT: boolean = false;
  showPOST: boolean = false;
  showDELETE: boolean = false;
  showDatabase: boolean = false;
  showEncryptionChoice: boolean = false;

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
  notesDataSource = new MatTableDataSource<SecureNote>();
  columnsToDisplay = ["title", "note"];

  constructor(private fb: FormBuilder,
    private secureNotesService: SecureNotesService) {
    this.notesForm = this.fb.group({
      choice: [],
      title: [],
      note: [],
      raw: []
    });  
    this.notesForm.controls["title"].valueChanges.subscribe(value => {
      if (value != "" && this.titleInitial) {
        this.displayedtitle = value;
        this.titleInitial = false;
      }
      this.calculateButtonStates(value as string, "title");     
    });
    this.notesForm.controls["note"].valueChanges.subscribe(value => {
      if (value != "" && this.noteInitial) {
        this.displayedNote = value;
        this.noteInitial = false;
      }
      this.calculateButtonStates(value as string, "note");      
    });
  }

  ngOnInit(): void {
    console.log("SecurenotesDialog#ngOnInit");
    this.secureNotesService.getTitles().subscribe(titles => {
      this.choices = titles;
      this.choices.push("NEW");
    });
  }

  choose(choice: string) {
    this.choosen = true;
    if (choice.trim() === "NEW") {
      this.prepareNew();
    } else {
      this.setButtonStates(true, false, false, false, false);
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
    this.setButtonStates(false, false, false, false, false);
    this.clickBox = CLICK;
    this.new = true;
  }

  private calculateButtonStates(value: string, formelement: string): void {
    console.log("SecurenotesDialog#calculateButtonStates " + formelement);
    if (this.choosen) {
      this.setButtonStates(true, false, false, false, false);
    }
    if (this.new) {
      if (this.notesForm.controls["title"].value != "") {
        this.setButtonStates(false, false, true, false, false);
      } else {
        this.setButtonStates(false, false, false, false, false);
      }
    } else {
      if (formelement === "title") {
        if (value != this.displayedtitle && value != "") {
          this.titleChanged = true;
          this.setButtonStates(false, true, false, false, true);
        } else {
          if (!this.noteChanged) {
            this.setButtonStates(false, false, false, true, true);
          }
          this.titleChanged = false;
        }
      }
      if (formelement === "note") {
        if (value != this.displayedNote && !this.raw) {
          this.noteChanged = true;
          this.setButtonStates(false, true, false, false, true);
        } else {
          if (!this.titleChanged) {
            this.setButtonStates(false, false, false, true, true);
          }
          this.noteChanged = false;
        }
      }
    }
  }

  private setButtonStates(getState: boolean, putState: boolean, postState: boolean, deleteState: boolean, encryptState: boolean): void {
    console.log("SecurenotesDialog#setButtonStates");
    this.showGET = getState;
    this.showPUT = putState;
    this.showPOST = postState;
    this.showDELETE = deleteState
    this.showEncryptionChoice = encryptState;
  }

  toggleEncryption() {
    console.log("SecurenotesDialog#toggleEncryption");
    const selectedNote = this.selectedNote[0];
    this.raw = !this.raw;
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
      this.notesDataSource.data = notes;
      this.notes = notes;
    });
  }

  reset() {
    console.log("SecurenotesDialog#reset");
    this.notesForm.controls["title"].setValue("");
    this.notesForm.controls["note"].setValue("");
    this.displayedtitle = "";
    this.displayedNote = "";
    this.viewChoice = CHOICES[0];
    this.clickBox = CLICK;
    this.titleBox = "";
    this.noteBox = "";
    this.new = false;
    this.raw = false;
    this.setButtonStates(false, false, false, false, false);
  }
  

  /********************** REST Service *********************/

  get() {
    console.log("SecurenotesDialog#get " + this.notesForm.controls["choice"].value);
    const choice = this.notesForm.controls["choice"].value;
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
      this.setButtonStates(false, false, false, true, true);
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
      this.new = false;
      this.updateDB();
    });
  }

  delete() {
    console.log("SecurenotesDialog#delete " + this.notesForm.controls["title"].value);
    const selectedNode: SecureNote = this.selectedNote[0];
    this.secureNotesService.delete(selectedNode.id!).subscribe(result => {
      if (result) {
        this.choices.splice(this.choices.indexOf(selectedNode.title), 1);
        this.selectedNote = [];
        this.updateDB();
        this.reset();
      }
    });
  }

}
