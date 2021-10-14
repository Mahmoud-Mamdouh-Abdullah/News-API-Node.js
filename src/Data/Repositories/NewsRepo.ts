import { News } from "../Models/News.Model";
import { BaseRepo } from "./BaseRepo";


export class NewsRepo extends BaseRepo<News> {
    collectionName: string = 'news-collection';
}

