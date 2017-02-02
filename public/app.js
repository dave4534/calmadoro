var app = angular.module('calmadoro', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

$stateProvider
  .state('home', {
  url: '/home',
  controller: 'TimeCtrl',
  templateUrl: './Templates/home.html'
  })
  // .state('home.spotify', {
  // url: '/spotify',
  // controller: 'TimeCtrl',
  // templateUrl:'./Templates/spotify.html'
  // })
  // .state('home.youtube', {
  // url: '/youtube',
  // controller: 'TimeCtrl',
  // templateUrl:'./Templates/youtube.html'
  // });

  $urlRouterProvider.otherwise('/home');

}]);