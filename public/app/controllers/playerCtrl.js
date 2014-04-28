(function(angular){


    angular.module('app')
        .controller('PlayerCtrl', ['$scope', '$game', '$socket', function($scope, $game, $socket){


            $scope.fly = $game.fly;
            }]);

}(angular));