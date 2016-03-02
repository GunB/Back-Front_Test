/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('employees.controller', [])
            .controller('employeesController', ['$employees', '$scope', function ($employees, $scope) {

                    var that = this;

                    this.show_data = function () {
                        if ($(that.data).size() === 0) {
                            that.data = $employees.get_users();
                            return;
                        }
                        if ($(that.data).size() > 0) {
                            that.show = that.data;
                        }
                    };

                    this.data = [];
                    this.show = [];
                    this.more = false;
                    this.show_data();

                    var onCall = $scope.$on('objectsGetted', function (e, data) {
                        if (data.service === "$employees") {
                            onCall();
                            that.data = data.data;
                            that.show_data();
                        }
                    });

                }]);
})();