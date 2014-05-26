(function(angular, io){
  var socket = io.connect('http://' + location.host);

    angular.module('app')
        .service('$socket', function(){

            return socket;

            });

}(angular, io));