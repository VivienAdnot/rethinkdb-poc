var express = require('express');
var bodyParser = require('body-parser');
var rethinkdb = require('rethinkdb');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.send({'serverLive' : true});
});

// app.post('/create_authors', function(req, res) {
//     rethinkdb.db('test').tableCreate('authors').run(connection, function(err, result) {
//         if (err) throw err;
//         console.log(JSON.stringify(result, null, 2));

//         res.setHeader('Content-Type', 'application/json');
//         res.send(JSON.stringify({tableCreation : 'ok'}));
//     })
// });

// app.post('/insert_data', function(req, res) {
//     rethinkdb.table('authors').insert([
//         { name: "William Adama", tv_show: "Battlestar Galactica",
//           posts: [
//             {title: "Decommissioning speech", content: "The Cylon War is long over..."},
//             {title: "We are at war", content: "Moments ago, this ship received word..."},
//             {title: "The new Earth", content: "The discoveries of the past few days..."}
//           ]
//         },
//         { name: "Laura Roslin", tv_show: "Battlestar Galactica",
//           posts: [
//             {title: "The oath of office", content: "I, Laura Roslin, ..."},
//             {title: "They look like us", content: "The Cylons have the ability..."}
//           ]
//         },
//         { name: "Jean-Luc Picard", tv_show: "Star Trek TNG",
//           posts: [
//             {title: "Civil rights", content: "There are some words I've known since..."}
//           ]
//         }
//     ]).run(connection, function(err, result) {
//         if (err) throw err;
//         res.send(result);
//     })
// });

app.get('/authors', function(req, res) {
    rethinkdb.db('test').table('authors').run(connection, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw error;
            res.send(result);
        })
    })
});

app.get('/authors/:name', function(req, res) {
    rethinkdb.table('authors').filter(rethinkdb.row('name').eq(req.params.name))
        .run(connection, function(err, cursor) {
            if (err) throw err;
            
            cursor.toArray(function(err, result) {
                if (err) throw err;
                res.send(result);
            });
        })
});

app.get('/activeAuthors', function(req, res) {
    rethinkdb.table('authors').filter(rethinkdb.row('posts').count().gt(2))
        .run(connection, function(err, cursor) {
            if (err) throw err;
            cursor.toArray(function(err, result) {
                if (err) throw err;
                res.send(result);
            })
        })
});

app.get('/authorsById/:id', function(req, res) {
    rethinkdb.table('authors').get(req.params.id).run(connection, function(err, result) {
        if (err) throw err;
        res.send(result);
    })
});

app.post('/authors', function(req, res) {
    rethinkdb.table('authors').insert(req.body).run(connection, function(err, result) {
        if (err) throw err;
        res.send(result);
    })
});

app.put('/authors/:id', function(req, res) {
    rethinkdb.table('authors')
        //.filter(rethinkdb.row('name').eq('William Adama'))
        .get(req.params.id)
        .update(req.body)
        .run(connection, function(err, result) {
            if (err) throw err;
            res.send(result);
        })
})

var connection = null;
rethinkdb.connect({host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;

    rethinkdb.table('authors').changes()
    .run(connection, function(err, cursor) {
        if (err) throw err;
        cursor.each(function(err, row) {
            if (err) throw err;
            console.log("===== CHANGE DETECTED =====");
            console.log(JSON.stringify(row, null, 2));
        })
    });

    app.listen(8089);
});



//app.listen(8089);