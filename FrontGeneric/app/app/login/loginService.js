/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    angular.module('login.service', ['ngRoute'])
            .service('$login', ["$rootScope", "$location", "$filter", "$http",
                function ($rootScope, $location, $filter, $http) {

                    var key = '8hu8fWMCIhCXyq0U4TP0CMJ9waHkCGNcsrqok8zS';
                    var key_name = '/X-API-KEY/';

                    var get_key = function () {
                        return key_name + key;
                    };

                    var get_root = function () {
                        return 'http://localhost/BackGeneric/index.php/';
                    };

                    var log = {};
                    var log_obj;

                    var login = function (obj_log) {
                        log_obj = obj_log;
                        //$employees.get_users();



                        var root = get_root();

                        var get_object = function () {
                            $http({
                                method: 'POST',
                                url: root + 'Log/in' + get_key(),
                                data: $.param({username: log_obj.username, password: log_obj.password}),
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }).then(function successCallback(response) {
                                // this callback will be called asynchronously
                                // when the response is available
                                $rootScope.$broadcast('objectsGetted',
                                        {data: response.data, service: "$login"});

                            }, function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });
                        };

                        get_object();

                        var offCallMeFn = $rootScope.$on("objectsGetted", function (event, data) {
                            if (data.service === "$login") {
                                data = data.data;
                                offCallMeFn();
                                var users = data;
                                //var found = $filter('getByAttribute')(users, log_obj.email, "email");
                                var found = data;
                                if (found) {
                                    log = found;
                                }
                                $rootScope.$broadcast('logedIn', found);
                            }
                        });
                    };

                    return {
                        get_log: function () {
                            return log;
                        },
                        log: function (log_object) {
                            login(log_object);
                            return;
                        },
                        is_log: function () {
                            return !$.isEmptyObject(log);
                        },
                        logoff: function () {
                            log = {};
                            $location.path("/");
                            return true;
                        },
                        get_key: function () {
                            return get_key();
                        },
                        get_root: function () {
                            return get_root();
                        }
                    };
                }]);
})();