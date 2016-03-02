var angular = require('./lib/angular');

var myApp = angular.module('myApp', []);

myApp.directive('todoList', function() {
    return {
      restrict: 'E',
      controller: 'todoController',
      controllerAs: 'vm',
      templateUrl: '/templates/todoList.html'
    };
})

myApp.controller('todoController', function($scope, todoService) {
  var vm = this;

  vm.todoList = todoService.getTodoList();
});

myApp.service('todoService', function() {
  var todoList = ['Laundry'];

  function getTodoList() {
    return todoList;
  }

  return {
    getTodoList: getTodoList
  };
});
