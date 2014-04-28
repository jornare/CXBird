(function(angular, io){
  var socket = io.connect('http://localhost');

    angular.module('app')
        .service('$socket', function(){

            return socket;

            });

}(angular, io));