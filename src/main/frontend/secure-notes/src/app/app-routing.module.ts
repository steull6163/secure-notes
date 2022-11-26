import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurenotesDialog } from './securenotes-dialog/securenotes-dialog.component';

const routes: Routes = [
  { path: '', component: SecurenotesDialog }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
