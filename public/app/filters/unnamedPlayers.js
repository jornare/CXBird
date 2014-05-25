(function (angular) {

    angular.module('app')
        .filter('unnamedPlayers', function ($filter) {
            return function (elements) {
                return $filter("filter")(elements, function (element) {
                    return element.handle !== "";
                });
            };
        });

}(angular));