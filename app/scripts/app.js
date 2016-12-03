'use strict';
angular
  .module('app', [
    'ui.router',
    'ngAnimate',
    'angular-storage',
    'ui.gravatar',
    'ui.bootstrap',
    'gridshore.c3js.chart',
    'angularUtils.directives.dirPagination',
    'ngJsonExportExcel',
     'angularMoment'

  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          controllerAs:'vm'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl',
          controllerAs:'vm'
        })
          .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/overview.html',
            controllerAs:'vm'
          })
          .state('reports', {
            url: '/reports',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reports.html',
            controllerAs:'vm'
          });

  })
  .constant('HOST',"http://localhost:10010/api-docs");
