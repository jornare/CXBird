(function(angular){


    angular.module('app')
        .controller('PlayerCtrl', ['$scope', '$game', '$socket', function($scope, $game, $socket){
            $scope.$game = $game;
            $scope.fly = $game.fly;
            $scope.color = 'gray';
            $scope.$watch('$game.me', function (me) {
                if (me) {
                    $game.play();
                    $scope.color = me.color;
                }
            });

            $scope.$on('$destroy', function () {
                $game.stopPlay();
            });

        }]);

}(angular));