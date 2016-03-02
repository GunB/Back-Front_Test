(function () {
    angular.module('comicSearch.directive', ['ngRoute'])

            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/comicSearch/:search', {
                        templateUrl: 'app/comicSearch/comicSearch.html',
                        controller: 'comicSearchController',
                        controllerAs: 'comicSearchCtrl'
                    });
                }]);
})();