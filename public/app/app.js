(function(angular){

    angular.module('app', ['ngTouch', 'ngRoute', 'ngAnimate'])
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


    if (document.addEventListener) {
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, false);
    } else {
        document.attachEvent('oncontextmenu', function () {
            window.event.returnValue = false;
        });
    }
}(angular));
