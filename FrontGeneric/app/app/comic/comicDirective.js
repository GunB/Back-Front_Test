(function () {
    angular.module('comic.directive', ['ngRoute'])

            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/comic/:id', {
                        templateUrl: 'app/comic/comic.html',
                        controller: 'comicController',
                        controllerAs: 'comicCtrl'
                    }).when('/comic/:id/:search', {
                        templateUrl: 'app/comic/comic.html',
                        controller: 'comicController',
                        controllerAs: 'comicCtrl'
                    });
                }]);
})();