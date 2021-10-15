import { ObjectId } from "bson";
import { News } from "../Data/Models/News.Model";
import { NewsRepo } from "../Data/Repositories/NewsRepo";

let newsRepo = new NewsRepo();

export class NewsService {


    all(filter: Object = {}) {
        return newsRepo.findAll(filter);
    }

    async create(data: { title: string, content: string }) {
        let news = new News(data.title, data.content);
        let newsId = (await newsRepo.insert(news))?.toString() || '';
        return this.findByIdOrFail(newsId);
    }

    delete(id: string) {
        let res = newsRepo.delete(id);
        return res;
    }

    async update(id: string, data: { title: string, content: string }) {
        try {
            let news = await this.findByIdOrFail(id);
            if (data.title === undefined || data.title.length === 0) {
                data.title = news.title;
            }
            if (data.content === undefined || data.content.length === 0) {
                data.content = news.content;
            }
            let newNews = new News(data.title, data.content);
            newNews._id = news._id;
            let result = await newsRepo.update(id, newNews);
            return result;
        } catch (err: any) {
            throw new Error(err.toString());
        }

    }

    findById(id: string) {
        return newsRepo.findById(id);
    }

    async findByIdOrFail(id: string): Promise<News> {
        let news = await this.findById(id);
        if (news)
            return news;

        throw new Error("missing or invalid Id")
    }
}