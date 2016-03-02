/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('login.controller', [])
            .controller('loginController', ['$scope', '$login', "$location",
                function ($scope, $login, $location) {
                    var that = this;
                    this.master = {};

                    this.update = function (user) {
                        this.master = angular.copy(user);
                    };

                    this.reset = function () {
                        this.user = angular.copy(this.master);
                    };

                    this.submitForm = function () {
                        // check to make sure the form is completely valid
                        if ($scope.userForm.$valid) {
                            if (that.master.username) {
                                if (that.master.password) {
                                    $login.log({username: that.master.username,
                                        password: that.master.password});
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                    $scope.$on('logedIn', function (event, data) {
                        if ($.isEmptyObject(data)) {
                            alert("Something goes wrong, check your data again...");
                        } else {
                            $location.path("/");
                        }

                    });

                    this.reset();
                }]);
})();