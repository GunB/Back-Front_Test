(function () {
    angular.module('employees.directive', ['ngRoute'])

            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/employees', {
                        templateUrl: 'app/employees/employees.html',
                        controller: 'employeesController',
                        controllerAs: 'employeesCtrl'
                    });
                }]);
})();