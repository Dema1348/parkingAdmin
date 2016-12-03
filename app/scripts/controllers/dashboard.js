'use strict';

angular.module('app')
  .controller('DashboardCtrl', function($scope, $state,store,HOST) {
    var vm = this;
    vm.data={};
    vm.data.user=store.get('user');
    vm.data.gauge=34;
    vm.sort=sort;
    vm.data.pagos=[]

     getPagos();
     getEstadoPagos();

    function getPagos() {
      new SwaggerClient({
      url: HOST,
      usePromise: true
      }).then(function(client) {
      	console.log(client);
        client.Reserva.reservaPagadas({api_key:store.get('user').token})
          .then(function(result) {
           console.dir(result.obj);
           vm.data.pagos=result.obj;
           vm.data.totalPagos=calcularTotal(vm.data.pagos);
          })
          .catch(function(error) {
            console.dir(error);
          })
          .finally(function() {
          	$scope.$apply();
          });
      });

    }



    function getEstadoPagos() {
      new SwaggerClient({
      url: HOST,
      usePromise: true
      }).then(function(client) {
        console.log(client);
        client.Reserva.reservaEstados({api_key:store.get('user').token})
          .then(function(result) {
           console.dir(result.obj);
           var result=result.obj;
           var total=(result.aprovados*100)/(result.aprovados+result.reprovados);
           vm.data.totalAprovados=total;
           vm.data.aprovados=(result.aprovados*100)/(result.total);
           vm.data.reprovados=(result.reprovados*100)/(result.total);
           vm.data.pendientes=(result.pendientes*100)/(result.total);
          })
          .catch(function(error) {
            console.dir(error);
          })
          .finally(function() {
            $scope.$apply();
          });
      });

    }

    function  calcularTotal(array){
      var total=0;
      for (var i = 0; i < array.length; i++) {
         total+=array[i].total;
      };
      return total;
    };


    function sort(keyname){
    	console.log(keyname);
        vm.data.sortKey = keyname;  
        vm.data.reverse = !vm.data.reverse; 
    }



  });
