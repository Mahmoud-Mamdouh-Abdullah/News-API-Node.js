import { BaseModel } from "../../Core/Database/BaseModel";

export class User extends BaseModel{
    _id?: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string
    age: number | string;

    constructor(firstName: string, lastName: string, password: string, email: string, age: number | string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.age = age;
    }
}