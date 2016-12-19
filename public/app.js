var app = angular.module('calmadoro', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  
$stateProvider
    .state('home', {
    url: '/home',
    controller: 'TimeCtrl',
    templateUrl: './templates/partial-home.html'
    })
    .state('home.spotify', {
    url: '/spotify',
    controller: 'TimeCtrl',
    templateUrl:'./templates/partial-music-spotify.html'
    })
    .state('home.youtube', {
    url: '/youtube',
    controller: 'TimeCtrl',
    templateUrl:'./templates/partial-music-youtube.html'
    })    
    .state('home.radio', {
    url: '/radio',
    controller: 'TimeCtrl',
    templateUrl:'./templates/partial-music-radio.html'
    })
   
    $urlRouterProvider.otherwise('/home');

}]);