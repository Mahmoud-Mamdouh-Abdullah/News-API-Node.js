let cnt = 1;
getAll();

const addRow = function (news) {
    let row = document.createElement('tr');
    row.classList.add('row');
    let id = document.createElement('td');
    id.innerText = news.count;
    id.classList.add('col-lg-4');
    let title = document.createElement('td');
    title.innerText = news.title;
    title.classList.add('col-lg-4');
    let content = document.createElement('td');
    content.innerText = news.content;
    content.classList.add('col-lg-4');
    row.appendChild(id);
    row.appendChild(title);
    row.appendChild(content);
    document.querySelector('#tbody').appendChild(row);
}

const addIdToSelect = (id, count) => {
    let select = document.querySelector('#select');
    let option = document.createElement('option');
    option.value = id;
    option.innerText = count;
    select.appendChild(option);
}

async function getAll() {
    cnt = 1;
    document.querySelector('#tbody').innerText = '';
    let select = document.querySelector('#select');
    select.innerText = '';
    try {
        const res = await fetch('/news', {
            headers: {
                token:"xGbI5NHMdMSusgmodK7Rqms97iTjSuXS2rRNw1c7OfA="
            }
        });
        let newsList = await res.json();
        console.log(newsList);
        newsList.news.forEach(news => {
            news.count = cnt;
            addIdToSelect(news._id, news.count);
            addRow(news);
            cnt++;
        });
    } catch (err) {
        console.log(`err = ${err}`);
    }
}

async function addNews() {
    let news = {
        title: document.querySelector('#title').value,
        content: document.querySelector('#content').value
    }

    console.log(news);
    try {
        const req = await fetch('/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(news)
        });
        const res = await req.json();
        res.news.count = cnt;
        document.querySelector('#title').value = '';
        document.querySelector('#content').value = '';
        addIdToSelect(res.news.count);
        addRow(res.news);
    } catch (err) {
        console.log(err);
    }
}

const getByQuery = async function (query) {
    try {
        const res = await fetch(`news/query/${query}`);
        const newsList = await res.json();
        document.querySelector('#tbody').innerText = '';
        document.querySelector('#select').innerHTML = '';
        let count = 1;
        newsList.forEach(news => {
            news.count = count;
            addRow(news);
            addIdToSelect(news._id, news.count);
            count ++;
        });
        console.log(newsList);
    } catch (err) {
        console.log(err);
    }
}

const deleteNews = async function () {
    let id = document.querySelector('#select').value;
    try {
        const res = await fetch(`news/${id}`, {
            method: 'DELETE'
        });
        const resText = await res.text();
        console.log(resText);
        getAll();
    } catch (err) {
        console.log(err);
    }
}

var query = document.getElementById("query");
query.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        document.querySelector('#error-id').classList.add('d-none');
        if (query.value.length == 0 || query.value == null) {
            getAll();
        } else {
            getByQuery(query.value);
        }
    }
});

const updateOnServer = async function () {
    let id = document.querySelector('#select').value;
    let news = {
        title: document.querySelector('#title').value,
        content: document.querySelector('#content').value
    }
    console.log(id);
    try {
        const res = await fetch(`/news/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(news)
        });
        const resText = await res.text();
        console.log(resText);
        document.querySelector('#add').classList.remove('d-none');
        document.querySelector('#update').classList.add('d-none');
        document.querySelector('#title').value = '';
        document.querySelector('#content').value = '';
        getAll();
        document.querySelector('#tbody').scrollIntoView();
    } catch (err) {
        console.error(err);
    }
}

async function updateNews() {
    document.querySelector('#top-page').scrollIntoView();
    let id = document.querySelector('#select').value;
    try {
        const res = await fetch(`news/${id}`);
        const news = await res.json();
        document.querySelector('#title').value = news.title;
        document.querySelector('#content').value = news.content;
        document.querySelector('#add').classList.add('d-none');
        document.querySelector('#update').classList.remove('d-none');
        document.querySelector('#cancel').classList.remove('d-none');
        console.log(news);
    } catch (err) {
        console.log(err);
    }

}

function cancelUpdate() {
    document.querySelector('#add').classList.remove('d-none');
    document.querySelector('#update').classList.add('d-none');
    document.querySelector('#cancel').classList.add('d-none');
    document.querySelector('#title').value = '';
    document.querySelector('#content').value = '';
}

