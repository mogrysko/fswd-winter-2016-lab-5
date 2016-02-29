'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

<<<<<<< HEAD
app.set('view engine','jade');
app.set('views','./views')
=======
app.set('view engine', 'jade');
app.set('views', './views');
>>>>>>> upstream/master
app.use(express.static('public'));

// to extract form data from POST bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(request, response) {
  response.render('index');
});

app.get('/hi/:name', function(request, response) {
  var str = 'Hello, ' + request.params.name + ' ' + request.query.lastName + '!';

  if (request.query.inseam) {
    var inseam = request.query.inseam;

    if (inseam < 26) {
      str += ' How is the weather down there?';
    } else if (inseam > 34) {
      str += ' Wow, you are tall!';
    } else {
      str += ' And I understand your inseam is ' + inseam + ' inches';
    }
  }

  response.end(str);
});

var Task = require('../models').Task;
<<<<<<< HEAD
app.post('/todo/new', function(request, response) {
  Task.create({ title: request.body.todo }).then(function(todo) {
    response.render('newTodo', {todo: todo});
  });
});

// app.get('/todos', function(request, response) {
//   Task.findAll().then(function(todos){
//     console.log(todos);
//     if (!todos) {
//       response.end('No todos')
//     }
//     else {
//       response.end(todos.map(function(t) { return t.title; }));
//     }
//   });
// });
=======

app.get('/todo', function(req, res) {
  Task.findAll().then(function(todos) {
    console.log(todos);
    if (!todos) {
      res.end('No todos');
    } else {
      res.end('All known todos: ' +
        todos.map(function(t) { return t.title; }));
    }
  });
});

app.post('/todo/new', function(request, response) {
  Task.create({ title: request.body.todo }).then(function(todo) {
    response.render('newTodo', { todo: todo });
  });
});

>>>>>>> upstream/master


// allow other modules to use the server
module.exports = app;
