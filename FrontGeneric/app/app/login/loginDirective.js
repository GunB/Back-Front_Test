(function () {
    angular.module('login.directive', ['ngRoute'])

            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/login', {
                        templateUrl: 'app/login/login.html',
                        controller: 'loginController',
                        controllerAs: 'loginCtrl'
                    });
                }]);
})();