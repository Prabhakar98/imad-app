var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'u15eumt080',
    database: 'u15eumt080',
    host: 'u15eumt080.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}
var app = express();
app.use(morgan('combined'));


var articles = {
    'article-one': {
    title: 'Article One',
    heading: 'Article One',
    date: 'Feb 17 2018',
    content:  `<p>
               This is the for my first article. Doing some cool stuff and its very interesting.
           </p>
           <p>
               This is the for my first article. Doing some cool stuff and its very interesting.
           </p>
           <p>
               This is the for my first article. Doing some cool stuff and its very interesting.
           </p> `
},
    'article-two': {
        title: 'Article Two',
    heading: 'Article Two',
    date: 'Feb 17 2018',
    content:  `<p>
               This is the for my second article. Doing some cool stuff and its very interesting.
           </p>
           <p>
               This is the for my second article. Doing some cool stuff and its very interesting.
           </p>
           <p>
               This is the for my second article. Doing some cool stuff and its very interesting.
           </p> `
    },
    'article-three': {
         title: 'Article Three',
    heading: 'Article Three',
    date: 'Feb 17 2018',
    content:  `<p>
               This is the for my third article. Doing some cool stuff and its very interesting.
           </p>
           <p>
               This is the for my third article. Doing some cool stuff and its very interesting.
           </p>
           <p>
               This is the for my third article. Doing some cool stuff and its very interesting.
           </p> `
    }
};
function createTemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
var htmlTemplate = `
<html>
<head>
    <title>${title}</title>
    <meta name = "viewport" content="width=device-width, initial-scale=1" />
     <link href="/ui/style.css" rel="stylesheet" />
    </head>    
    <body>
        <div class="header">
       <div>
           <a href="/">Home</a>
       </div>
       <hr/>
       <h1>
          ${heading}
       </h1>
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

var pool = new Pool(config);
app.get('/test-db', function(req, res){
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result));
        }
    });
});
var counter = 0;
app.get('/counter', function(req, res)
{
    counter = counter + 1;
    res.send(counter.toString());
});
var names = [];
app.get('/submit-name', function(req, res)
{
    var name = req.query.name;
    names.push(name);
    
    res.send(JSON.stringify(result.rows));
});

app.get('/:articleName', function(req, res)
{
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
