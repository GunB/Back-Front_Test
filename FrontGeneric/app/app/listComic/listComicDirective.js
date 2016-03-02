(function () {
    angular.module('listComic.directive', ['ngRoute'])

            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/list', {
                        templateUrl: 'app/listComic/listComic.html',
                        controller: 'listComicController',
                        controllerAs: 'listComicCtrl'
                    });
                }]);
})();