;(function(){
  'use strict';
  angular.module('AddressBook', ['ngRoute','mgcrea.ngStrap'])
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
      .when('/:id', {
        templateUrl: 'view/show.html',
        controller: 'ShowController',
        controllerAs:'show'
      })
      .when('/:id/edit', {
        templateUrl: 'view/form.html',
        controller: 'EditController',
        controllerAs: 'doCont'
      })
      .otherwise({redirectTo: '/'});
    })

    .factory('contactFactory', function($http, $location){
      function getContact(id, cb){
        var url = 'https://sondatodolist.firebaseio.com/' + id + '.json'
        $http.get(url)
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log(err);
          });
      }

      function editContact(id, newcontact){
        var url = 'https://sondatodolist.firebaseio.com/' + id + '.json'
        $http.put(url, newcontact)
        .success(function(data){
          $location.path('/');
        })
        .error(function(err){
          console.log(err);
        });
      }

      function getAllContacts(cb){
        $http.get('https://sondatodolist.firebaseio.com/.json')
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log(err)
          });
      }

      function addContact(anothercontact, cb){
        $http.post('https://sondatodolist.firebaseio.com/.json', anothercontact)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err)
        });
      };

      function removeContact(contactID, cb){
        var url = 'https://sondatodolist.firebaseio.com/'+ contactID + '.json';
        $http.delete(url)
        .success(function(){
          cb();
        })
        .error(function(err){
          console.log(err)
        });
      };

      return {
        getContact: getContact,
        editContact: editContact,
        getAllContacts: getAllContacts,
        addContact: addContact,
        removeContact: removeContact
      };
    })


   .controller('ShowController', function($routeParams, contactFactory){
      var vm = this;
      var id = $routeParams.id;
      contactFactory.getContact(id, function(data){
        vm.contact = data;
      });
    })

    .controller('EditController', function($routeParams, contactFactory){
       var vm = this;
       var id = $routeParams.id;
       contactFactory.getContact(id, function(data){
         vm.newcontact = data;
       })

        vm.addtoList = function(){
          contactFactory.editContact(id, vm.newcontact)
        };
     })

    .controller('ToDoController',function(contactFactory){
      var vm = this;
      contactFactory.getAllContacts(function(data){
        vm.contact = data;
      })

      vm.addtoList = function(){
        contactFactory.addContact(vm.newcontact, function(data){
          vm.contact[data.name] = vm.newcontact;
          vm.newcontact = _defaultContact();
        });
      };

      vm.removeTodo = function(contactID){
        contactFactory.removeContact(contactID, function(){
          delete vm.contact[contactID]
        })
      };

      function _defaultContact(){
        return {
          name: ''
        }
      }

    });
}());
