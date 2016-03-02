(function () {
    angular.module('newUser.directive', ['ngRoute'])

            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/newEmployee', {
                        templateUrl: 'app/newUser/newUser.html',
                        controller: 'newUserController',
                        controllerAs: 'newUserCtrl'
                    });
                }]);
})();