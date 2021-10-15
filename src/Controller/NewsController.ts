import { Request, Response } from 'express';
import { News } from '../Data/Models/News.Model';
import { NewsService } from '../Services/NewsService';

let newsService = new NewsService();

export async function createNews(req: Request, res: Response) {
    try {
        let title = req.body.title;
        let content = req.body.content;
        let news = await newsService.create({ title, content });
        res.send({ news: news });
    } catch (err: any) {
        res.status(404).send({ message: err.message });
    }
}

export async function getAll(req: Request, res: Response) {
    let news = await newsService.all();
    res.send({ news: news });
}

export async function getByQuery(req: Request, res: Response) {
    let query = {
        $or: [
            { title: { $regex: req.params.q, $options: 'i' } },
            { content: { $regex: req.params.q, $options: 'i' } }
        ]
    };
    let news = await newsService.all(query);
    res.send(news);
}

export async function getById(req:Request, res: Response) {
    let news = await newsService.findByIdOrFail(req.params.id);
    res.send(news);
}

export async function editNews(req: Request, res: Response) {
    let id: string = req.params.id;
    let result = await newsService.update(id, { title: req.body.title, content: req.body.content });
    res.send(result);
}


export async function deleteNews(req: Request, res: Response) {
    let id: string = req.params.id;
    let result = await newsService.delete(id);
    res.send(result);
}