import { Request, Response } from "express";

class News {
    constructor(public id: number, public title: string, public content: string) {
    }
}

let id = 4;
let newsList: News[] = [
    new News(1, 'Liv vs MCT', 'the result was 2-2'),
    new News(2, 'Egypt vs Liberia', 'result 2-0'),
    new News(3, 'Real Madrid vs FCB', 'the match ended 4-0 for RM')
];

export function createNews(req: Request, res: Response) {
    let title = req.body.title;
    let content = req.body.content;
    let news = new News(id, title, content);
    newsList.push(news);
    id++;
    res.send(news);
}

export function getAll(req: Request, res: Response) {
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
}