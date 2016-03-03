'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.set('view engine', 'jade');
app.set('views', './views');
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

app.get('/todo', function(req, res) {
  Task.findAll().then(function(todos) {
    res.format({
      'text/html': function() {
        if (!todos) {
          res.end('No todos');
        } else {
          res.end('All known todos: ' +
            todos.map(function(t) { return t.title; }));
        }
      },
      'application/json': function() {
          res.json(todos);
      }
    });
  });
});

app.post('/todo/new', function(request, response) {
  console.log(request.body);
  Task.create({ title: request.body.todo }).then(function(todo) {
    response.format({
      'text/html': function() {
        response.render('newTodo', { todo: todo });
      },
      'application/json': function() {
        response.json(todo);
      }
    })
  });
});

app.get('/users/register', function(request, response) {
  response.render('register');
});

// allow other modules to use the server
module.exports = app;
