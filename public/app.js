var app = angular.module('calmadoro', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

$stateProvider
  .state('home', {
  url: '/home',
  controller: 'TimeCtrl',
  templateUrl: './Templates/home.html'
  })
  .state('about', {
  url: '/about',
  templateUrl: './Templates/about.html'
  });

  $urlRouterProvider.otherwise('/home');

}]);