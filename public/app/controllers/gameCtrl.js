(function (angular) {


    angular.module('app')
        .controller('GameCtrl', ['$scope', '$game', '$socket', function ($scope, $game, $socket) {
            $scope.game = $game;
            $game.watchGame();

            $scope.players = $game.players.playing;

            $socket.on('updatePlayer', function (data) {
                $scope.players = $game.players.playing;
            });
        }]);

}(angular));