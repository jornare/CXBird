(function(angular){

    angular.module('app', ['ngRoute'])
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
              otherwise({
                redirectTo: '/'
              });
        }]);

}(angular));