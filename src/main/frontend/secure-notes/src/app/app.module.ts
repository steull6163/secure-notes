import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurenotesComponent } from './securenotes/securenotes.component';
import { SecurenotesDialog } from './securenotes-dialog/securenotes-dialog.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { EncryptPipe, DecryptPipe } from './crypt/enctypt-decrytp.pipe';
import { NgxWebstorageModule } from 'ngx-webstorage';
//import { } from 'rsa-aes-hybrid';

@NgModule({
  declarations: [
    AppComponent,
    SecurenotesComponent,
    SecurenotesDialog,
  ],
  imports: [
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    
  ],
  providers: [ EncryptPipe, DecryptPipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
