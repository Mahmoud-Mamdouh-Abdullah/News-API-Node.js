import { BaseModel } from "../../Core/Database/BaseModel";

export class News extends BaseModel {
    _id?: string;
    title: string;
    content: string;

    constructor(title: string, content: string) {
        super();
        this.title = title;
        this.content = content;
    }
}