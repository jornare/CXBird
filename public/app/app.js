(function(angular){

    angular.module('app', ['ngRoute', 'ngAnimate'])
    .config(['$routeProvider',
        function($routeProvider){
            $routeProvider.
              when('/', {
                templateUrl: '/menu',
                controller: 'MenuCtrl'
              }).
              when('/menu', {
                templateUrl: '/menu',
                controller: 'MenuCtrl'
              }).
              when('/highscores', {
                templateUrl: '/highscores',
                controller: 'HighscoresCtrl'
              }).
              when('/game', {
                templateUrl: '/game',
                controller: 'GameCtrl'
              }).
              when('/player', {
                templateUrl: '/player',
                controller: 'PlayerCtrl'
              }).
              when('/raffle', {
                  templateUrl: '/raffle',
                  controller: 'RaffleCtrl'
              }).
              otherwise({
                redirectTo: '/'
              });
        }]);

}(angular));