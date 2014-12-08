;(function(){
  'use strict';
  angular.module('AddressBook', ['ngRoute'])
 .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'view/table.html',
        controller: 'ToDoController',
        controllerAs: 'doCont'
      })
      .when('/new', {
        templateUrl: 'view/form.html',
        controller: 'ToDoController',
        controllerAs: 'doCont'
      })
      .otherwise({redirectTo: '/'});
    })


    .controller('ToDoController',function($http){
      var vm = this;
      $http.get('https://sondatodolist.firebaseio.com/.json')
        .success(function(data){
          vm.contact = data;
        })
        .error(function(err){
          console.log(err)
        });

      vm.addtoList = function(){
        $http.post('https://sondatodolist.firebaseio.com/.json', vm.newcontact)
        .success(function(data){
          vm.contact[data.name] = vm.newcontact;
          vm.newcontact = _defaultContact();
        })
        .error(function(err){
          console.log(err)
        });
      };

      vm.removeTodo = function(contactID){
        var url = 'https://sondatodolist.firebaseio.com/'+ contactID + '.json';
        console.log(contactID)
        console.log(list)
        $http.delete(url)
        .success(function(){
          delete vm.contact[contactID]
        })
        .error(function(err){
          console.log(err)
        });
      };

      function _defaultContact(){
        return {
          name: ''
        }
      }

    });
}());
