(function(angular){

     angular.module('app')
        .controller('HighscoresCtrl', ['$scope', '$game', function($scope, $game){
            $scope.highscores = $game.highscores;
            }]);

}(angular));