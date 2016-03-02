/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('navbar.directive', [])
            .directive('navbarShop', function () {
                return {
                    restrict: 'A',
                    templateUrl: 'app/navbar/navbar.html',
                    controller: 'navbarController',
                    controllerAs: 'navbarCtrl'
                };
            });
})();