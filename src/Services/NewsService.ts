import { ObjectId } from "bson";
import { News } from "../Data/Models/News.Model";
import { NewsRepo } from "../Data/Repositories/NewsRepo";

let newsRepo = new NewsRepo();

export class NewsService {

    async create(data: { title: string, content: string }) {
        let news = new News(data.title, data.content);
        let newsId = (await newsRepo.insert(news))?.toString() || '';
        return this.findByIdOrFail(newsId);
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