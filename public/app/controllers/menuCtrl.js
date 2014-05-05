(function (angular) {

    angular.module('app')
        .controller('MenuCtrl', ['$scope', '$game',
            function ($scope, $game) {
                $scope.username = '';
                $scope.players = $game.players;
                $scope.player = $game.me;
//                $scope.$watch('username', function () {
//                    if ($scope.username) {
//                        $scope.player.online = true;
//                    }
//                });

                $scope.setHandle = function () {
                    $game.setHandle($scope.username);
                    $game.me.online = true;
                };

            }]);

}(angular));