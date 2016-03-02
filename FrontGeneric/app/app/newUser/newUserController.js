/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('newUser.controller', [])
            .controller('newUserController', ['$scope', '$employees', "$location",
                function ($scope, $employees, $location) {
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
                        if ($scope.newUser.$valid) {
                            if (that.master.email) {
                                if (that.master.password) {
                                    $employees.set_new_user(that.master);
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                    $scope.$on('objectCreated', function (event, data) {
                        if (data.service === "$employees") {
                            data = data.data;
                            if ($.isEmptyObject(data)) {
                                $location.path("/");
                            } else {
                                alert("The user already exists, check your data again...");
                            }
                        }
                    });

                    this.reset();
                }]);
})();