var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'Article One | Abhishek Jindal',
        heading: 'Article One',
        date: 'March 3,2018',
        content: `
            <p>
                This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.                    
            </p>
            <p>
                This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.                    
            </p>
            <p>
                This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.                    
            </p>
        `
    },
    'article-two': {
        title: 'Article Two | Abhishek Jindal',
        heading: 'Article Two',
        date: 'March 4,2018',
        content: `
            <p>
                This is the content of my second article.                
            </p>
        `},
    'article-three': {
        title: 'Article Third | Abhishek Jindal',
        heading: 'Article Third',
        date: 'March 5,2018',
        content: `
            <p>
                This is the content of my third article.                
            </p>
        `},
};

function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <div>
                    <h3>${heading}</h3>
                </div>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var config = {
    user:'abhishek1036cse16',
    database:'abhishek1036cse16',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_password,
};

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    pool.query('SELECT * FROM test', function (err, result) {
        if (err){
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var names = [];
//app.get('/submit-name/:name', function (req, res) {
app.get('/submit-name', function (req, res) { // url: /submit-name?name=XXXXXXX
    //get the names from the request
    //var name = req.params.name;
    var name = req.query.name;
    
    names.push(name);
    //JSON
    res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res){
  //articleName == article-one
  //articles[articleName] == {} content object for article one
  var articleName = req.params.articleName;  
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
