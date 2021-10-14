import { Request, Response } from 'express';
import { News } from '../Data/Models/News.Model';
import { NewsService } from '../Services/NewsService';

let newsService = new NewsService();

export async function createNews(req: Request, res: Response) {
    try {
        let title = req.body.title;
        let content = req.body.content;
        let news = await newsService.create({ title, content });
        res.send({news:news});
    } catch (err: any) {
        res.status(404).send({ message: err.message });
    }
}

/*export function getAll(req: Request, res: Response) {
    res.send(newsList);
}

export function getByID(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);
    let news = newsList.filter(news => news.id == id)[0];
    if (news == undefined) {
        res.send({
            msg: "no such id"
        });
    }
    res.send(news);
}

export function getByQuery(req: Request, res: Response) {
    res.send(newsList.filter(news => news.title.toLowerCase().includes(req.params.q.toLowerCase())
        || news.content.toLowerCase().includes(req.params.q.toLowerCase())));
}

export function editNews(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);
    let news = newsList.filter(news => news.id == id)[0];
    news.title = req.body.title;
    news.content = req.body.content;
    res.send('Updated Successfylly');
}


export function deleteNews(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);
    let news = newsList.filter(news => news.id == id);
    let index = newsList.indexOf(news[0]);
    newsList.splice(index, 1);
    res.send('Deleted Sucessfully');
}*/