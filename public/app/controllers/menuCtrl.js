(function(angular){

    angular.module('app')
        .controller('MenuCtrl', ['$scope', '$players',
            function($scope, $players){
                $scope.username='';
                $scope.players = $players;
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