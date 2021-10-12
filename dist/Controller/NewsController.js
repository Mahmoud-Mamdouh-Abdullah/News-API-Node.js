"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.editNews = exports.getByQuery = exports.getByID = exports.getAll = exports.createNews = void 0;
var News = /** @class */ (function () {
    function News(id, title, content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
    return News;
}());
var id = 4;
var newsList = [
    new News(1, 'Liv vs MCT', 'the result was 2-2'),
    new News(2, 'Egypt vs Liberia', 'result 2-0'),
    new News(3, 'Real Madrid vs FCB', 'the match ended 4-0 for RM')
];
function createNews(req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var news = new News(id, title, content);
    newsList.push(news);
    id++;
    res.send(news);
}
exports.createNews = createNews;
function getAll(req, res) {
    res.send(newsList);
}
exports.getAll = getAll;
function getByID(req, res) {
    var id = parseInt(req.params.id);
    var news = newsList.filter(function (news) { return news.id == id; })[0];
    if (news == undefined) {
        res.send({
            msg: "no such id"
        });
    }
    res.send(news);
}
exports.getByID = getByID;
function getByQuery(req, res) {
    res.send(newsList.filter(function (news) { return news.title.toLowerCase().includes(req.params.q.toLowerCase())
        || news.content.toLowerCase().includes(req.params.q.toLowerCase()); }));
}
exports.getByQuery = getByQuery;
function editNews(req, res) {
    var id = parseInt(req.params.id);
    var news = newsList.filter(function (news) { return news.id == id; })[0];
    news.title = req.body.title;
    news.content = req.body.content;
    res.send('Updated Successfylly');
}
exports.editNews = editNews;
function deleteNews(req, res) {
    var id = parseInt(req.params.id);
    var news = newsList.filter(function (news) { return news.id == id; });
    var index = newsList.indexOf(news[0]);
    newsList.splice(index, 1);
    res.send('Deleted Sucessfully');
}
exports.deleteNews = deleteNews;
