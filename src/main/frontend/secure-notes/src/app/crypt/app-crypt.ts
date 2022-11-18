import { Component, OnInit } from '@angular/core';
import { DecryptPipe, EncryptPipe } from './enctypt-decrytp.pipe';

@Component({
  selector: 'app-crypt',
  templateUrl: './app-crypt.html',
  styleUrls: ['./app-crypt.css']
})
export class AppCrypt implements OnInit {

    private publicKey: string = "";
    private privateKey: string = "";

    constructor(private encryptPipe: EncryptPipe,
        private decryptPipe: DecryptPipe) {}

    ngOnInit(): void {
        this.publicKey = "";
        this.privateKey = "";
    }

    private initialise() {
        
    }

    public encrypt(text: string): string {
        const encrypted = this.encryptPipe.transform(text);
        return encrypted!;
    }

    public decrypt(text: string): string {
        const decrypted = this.decryptPipe.transform(text);
        return decrypted!;
    }
}