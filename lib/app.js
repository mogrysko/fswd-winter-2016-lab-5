'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    redis = require('connect-redis'),
    app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(cookieParser());

// to extract form data from POST bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var RedisStore = redis(session);
app.use(session({
  secret: 'Shhhhh!',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore()
}));

app.use(function(request, response, next) {
  request.session.lastRequest = new Date();
  response.locals.username = request.session.username || 'world';
  next();
});

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
  Task.create({ title: request.body.todo }).then(function(todo) {
    response.format({
      'text/html': function() {
        response.render('newTodo', { todo: todo });
      },
      'application/json': function() {
        response.redirect('/todo');
      }
    })
  });
});

app.get('/users/register', function(request, response) {
  response.render('register');
});

app.post('/users/new', function(request, response) {
  request.session.username = request.body.username;
  request.session.save(function() {
    response.redirect('/');
  });
});

if (process.env.NODE_ENV === 'development') {
  require('express-debug')(app);
}

// allow other modules to use the server
module.exports = app;
