(function (angular) {

    angular.module('app')
        .filter('unnamed', function ($filter) {
            return function (elements) {
                return $filter("filter")(elements, function(element) {
                    console.log(element);
                    return element.handle !== "";
                });
            };
        });

}(angular));