(function (angular) {

    angular.module('app')
        .controller('MenuCtrl', ['$scope', '$game', '$timeout',
            function ($scope, $game, $timeout) {
                $scope.username = '';
                $scope.players = $game.players;
                $scope.player = $game.me;
                $scope.$game = $game;
//                $scope.$watch('username', function () {
//                    if ($scope.username) {
//                        $scope.player.online = true;
//                    }
//                });

                $scope.setHandle = function () {
                    $game.setHandle($scope.username);
                };

                $scope.$watch('$game.me', function () {
                    $scope.player = $game.me;
                });

                $timeout(function () {
                    $scope.$apply();
                },5000);
            }]);

}(angular));