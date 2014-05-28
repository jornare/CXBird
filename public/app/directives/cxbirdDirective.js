(function(angular, RGBColor, cxbird){
 

    angular.module('app')
        .directive('cxbird', function() {
            return {
                    restrict:'E',
                    scope: {
                        game:'='
                    },
                    link: function(scope, element, attrs){
                        //var playerImg = document.createElement('img');
                        //playerImg.src = '../../img/computasLogo.png';
                        var canvas = document.createElement('canvas');
                        canvas.setAttribute('id','canvas');
                        canvas.setAttribute('width','100%');
                        canvas.setAttribute('height','100%');
                        canvas.width="800";
                        canvas.height="600";
                        element[0].appendChild(canvas);
                        scope.cxbird = new cxbird.Game(canvas.getContext('2d'), scope.game);
                       // new GameObjectManager().startupGameObjectManager();
                        scope.cxbird.start();

                        scope.$on('$destroy', function() {
                            scope.cxbird.stop();
                            delete scope.cxbird;
                        });
                    }
                };
            });

}(angular, RGBColor, window.cxbird));










