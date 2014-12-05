;(function(){
  'use strict';
  angular.module('todoList',[])
    .controller('ToDoController',function(){
      var vm = this;
      vm.todo = [
        {
          title: 'Finish this App',
          deadline: 'ASAP',
          priority: 'high',
          desc: 'app to learn angular'
        },
        {
          title: 'Finish this Bapp',
          deadline: 'ASAP',
          priority: 'high',
          desc: 'app to learn Bapp'
        },
        {
          title: 'Finish this Lap',
          deadline: 'ASAP',
          priority: 'high',
          desc: 'app to learn angular'
        }
      ];

      vm.addtoList = function(){
        vm.todo.push(vm.newtodo);
        vm.newtodo = null;

      };
        vm.removeTodo = function(item){
        var index = vm.todo.indexOf(item);
        vm.todo.splice(index,1);
      }
    });
}());
