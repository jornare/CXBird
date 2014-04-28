(function(angular){

    angular.module('app')
        .controller('MenuCtrl', ['$scope', '$game',
            function($scope, $game){
                $scope.username='';
                $scope.players = $game.players;
                $scope.player={
                    online: false,
                    highscore:0
                    }
                $scope.$watch('username', function(){
                    if($scope.username){
                        $scope.player.online=true;
                    }
                });

            }]);

}(angular));