getAll();

const addRow = function (news) {
    let row = document.createElement('tr');
    row.classList.add('row');
    let id = document.createElement('td');
    id.innerText = news.id;
    id.classList.add('col-lg-2');
    let title = document.createElement('td');
    title.innerText = news.title;
    title.classList.add('col-lg-5');
    let content = document.createElement('td');
    content.innerText = news.content;
    content.classList.add('col-lg-5');
    row.appendChild(id);
    row.appendChild(title);
    row.appendChild(content);
    document.querySelector('#tbody').appendChild(row);
}

const addIdToSelect = (id) => {
    let select = document.querySelector('#select');
    let option = document.createElement('option');
    option.value = id;
    option.innerText = id;
    select.appendChild(option);
}

async function getAll() {
    document.querySelector('#tbody').innerText = '';
    select.innerText = '';
    try {
        const res = await fetch('/news');
        let newsList = await res.json();
        console.log(newsList);
        newsList.forEach(news => {
            addIdToSelect(news.id);
            addRow(news);
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
        addIdToSelect(res.id);
        addRow(res);
    } catch (err) {
        console.log(err);
    }
}

const getByQuery = async function (query) {
    try {
        const res = await fetch(`news/query/${query}`);
        const newsList = await res.json();
        document.querySelector('#tbody').innerText = '';
        newsList.forEach(news => {
            addRow(news);
        });
        console.log(newsList);
    } catch (err) {
        console.log(err);
    }
}

const getByID = async function (id) {
    try {
        const res = await fetch(`news/${id}`);
        const news = await res.json();
        if (news.msg) {
            document.querySelector('#error-id').classList.remove('d-none');
            return;
        }
        document.querySelector('#tbody').innerText = '';
        addRow(news);
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
            if (isNaN(query.value)) {
                getByQuery(query.value);
            } else {
                getByID(query.value);
            }
        }
    }
});

const updateOnServer = async function () {
    let id = document.querySelector('#select').value;
    let news = {
        title: document.querySelector('#title').value,
        content: document.querySelector('#content').value
    }
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

