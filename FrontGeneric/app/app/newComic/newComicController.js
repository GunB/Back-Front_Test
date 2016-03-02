/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('newComic.controller', [])
            .controller('newComicController', ['$scope', '$listComic', "$location",
                function ($scope, $listComic, $location) {
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
                        if ($scope.newComic.$valid) {
                            if (that.master.title) {
                                if (that.master.body) {
                                    $listComic.set_new_comic(that.master);
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                    $scope.$on('objectCreated', function (event, data) {
                        if (data.service === "$listComic") {
                            data = data.data;
                            if ($.isEmptyObject(data)) {
                                $location.path("/");
                            } else {
                                alert("The comic already exists, check your data again...");
                            }
                        }
                    });

                    this.reset();
                }]);
})();