import { createHmac } from 'crypto';


export class EncryptPassword {
    private plainPassword: string;

    constructor(password: string) {
        this.plainPassword = password;
    }

    encrypt(): string {
        return createHmac("sha256", "sdohfjhsdofppioqweipqw89789713/1-23/")
            .update(this.plainPassword).digest("base64");
    }
}