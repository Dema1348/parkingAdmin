'use strict';

angular.module('app')
  .controller('LoginCtrl', function($state,store,HOST,$scope) {
    var vm = this;
    vm.doLogin= doLogin;
    vm.closeAlert=closeAlert;
    vm.formLogin={};
    vm.data = {};
    vm.alert=null;
  
   function closeAlert(index) {
      vm.alert=null;
  };
 
    function doLogin() {
      
      console.log("Entrado al sistema");
   
      new SwaggerClient({
      url: HOST,
      usePromise: true
      }).then(function(client) {
        console.log(client);
        client.Auth.loginAdminF({credenciales: vm.data.credenciales})
          .then(function(result) {
            store.set('user', result.obj)
            $state.go('dashboard');
          })
          .catch(function(error) {
            vm.alert=error.obj.message;
          })
          .finally(function() {
            $scope.$apply();
          });;
      });

    };


     

  });
