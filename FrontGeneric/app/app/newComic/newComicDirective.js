(function () {
    angular.module('newComic.directive', ['ngRoute'])

            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/newComic', {
                        templateUrl: 'app/newComic/newComic.html',
                        controller: 'newComicController',
                        controllerAs: 'newComicCtrl'
                    });
                }]);
})();