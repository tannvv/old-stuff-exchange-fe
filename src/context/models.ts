export class UserFirebase {
    displayName: string;
    email: string;
    photoURL: string;

    constructor(displayName: string | null, email: string | null, photoURL: string | null) {
        this.displayName = displayName ?? '';
        this.email = email ?? '';
        this.photoURL = photoURL ?? '';
    }
}
