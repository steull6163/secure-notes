import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SecureNote } from 'src/app/app.model';
import { SecureNotesService } from 'src/app/services/securenotes.service';

@Component({
  selector: 'app-securenotes',
  templateUrl: './securenotes.component.html',
  styleUrls: ['./securenotes.component.css']
})
export class SecurenotesComponent implements OnInit {

  secureNotesDataSource = new MatTableDataSource<SecureNote>();
  columnsToDisplay = ["title", "note"];

  constructor(private secuteNotesService: SecureNotesService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  private getNotes() {
    console.log("SecurenotesComponent#getNotes");
    this.secuteNotesService.getNotes().subscribe(notes => {
      console.log("received " + notes.length + " notes");
      this.secureNotesDataSource.data = notes;
    });
  }
}
