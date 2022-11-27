export class SecureNote {
    id?: number;
    title: string;
    note: string;

    constructor() {
        this.title = "";
        this.note = "";
    }
}

export class Keys {
    id?: number;
    publicKey: string;
    privateKey: string;

    constructor() {
        this.publicKey = "";
        this.privateKey = "";
    }

} 