(function(angular){


    angular.module('app')
        .controller('GameCtrl', ['$scope', '$game', function($scope, $game){
            $scope.game = $game;
            $game.watchGame();
        }]);

}(angular));