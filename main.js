;(function(){
  'use strict';
  angular.module('todoList',[])
    .controller('ToDoController',function($http){
      var vm = this;
      $http.get('https://sondatodolist.firebaseio.com/')
        .success(function(data){
          vm.tasks = data;
        })
        .error(function(err){
          console.log(err)
        });

      vm.addtoList = function(){
        $http.post('https://sondatodolist.firebaseio.com/', vm.newtodo)
        .success(function(data){
          vm.tasks[data.name] = vm.newtodo;
        })
        .error(function(err){
          console.log(err)
        });
      };

        vm.removeTodo = function(item){
          var url = 'https://sondatodolist.firebaseio.com/' + '.json';
          $http.delete(url)
          .success(function(){
            delete vm.tasks[todo]
          })
          .error(function(err){
            console.log(err)
          });

      }
    });
}());
