var angular = require('./lib/angular');

var myApp = angular.module('myApp', []);

myApp.directive('todoList', function() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'todoController',
      controllerAs: 'vm',
      templateUrl: '/templates/todoList.html'
    };
})

myApp.controller('todoController', function($scope, todoService) {
  var vm = this;

  todoService.getTodoList().then(function(response) {
    vm.todoList = response.data;
  });

  vm.addTodo = function addTodo(newVal) {
    todoService.addTodo(newVal);
  };

});

myApp.service('todoService', function($http) {
  var todoList = ['Laundry'];

  function getTodoList() {
    return $http.get('/todo');
  }

  function addTodo(newItem) {
    todoList.push(newItem);
  }

  return {
    getTodoList: getTodoList,
    addTodo: addTodo
  };
});
