(function (angular) {


    angular.module('app')
        .controller('GameCtrl', ['$scope', '$game', '$socket', function ($scope, $game, $socket) {
            $scope.game = $game;
            $game.watchGame();

			$scope.players = $game.players.playing;
			$scope.highscores = $game.highscores;
			setInterval(function () {
				console.log($scope.highscores);
			}, 1000);
            //$socket.on('updatePlayer', function (data) {
            //    $scope.players = $game.players.playing;
            //});

            $scope.$on('$destroy', function () {
                $game.stopWatchGame();
            });

        }]);

}(angular));