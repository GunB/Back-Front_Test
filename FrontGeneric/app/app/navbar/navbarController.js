/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('navbar.controller', [])
            .controller('navbarController', ['$scope', '$login', '$location',
                function ($scope, $login, $location) {

                    //<editor-fold defaultstate="collapsed" desc="Funcionalidad de menu">
                    var menu_style = function () {
                        $("#nav-mobile").html($("#nav-main").html());
                        $("#nav-trigger span").click(function () {
                            if ($("nav#nav-mobile ul").hasClass("expanded")) {
                                $("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
                                $(this).removeClass("open");
                            } else {
                                $("nav#nav-mobile ul").addClass("expanded").slideDown(250);
                                $(this).addClass("open");
                            }
                        });
                    };
                    menu_style();

                    this.is_log = $login.is_log();
                    var that = this;

                    $scope.$on('logedIn', function () {
                        that.is_log = $login.is_log();
                    });

                    this.logoff = function () {
                        that.is_log = false;
                        $login.logoff();
                    };
                    //</editor-fold>

                    this.master = {};

                    this.update = function (user) {
                        this.master = angular.copy(user);
                    };

                    this.reset = function () {
                        this.user = angular.copy(this.master);
                    };

                    this.submitForm = function () {
                        // check to make sure the form is completely valid
                        if ($scope.search.$valid) {
                            if (that.master.search) {
                                $location.path("/comicSearch/" + that.master.search);
                                return true;
                            }
                        }
                        return false;
                    };

                    this.reset();
                }]);
})();