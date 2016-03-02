/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    angular.module('employees.service', ['ngRoute'])
            .service('$employees', ["$http", "$rootScope", "$filter", "$login", 
                        function ($http, $rootScope, $filter, $login) {
                    var objects = [];
                    var on_fly = [{
                            email: "heinerangarita@gmail.com",
                            password: "123456"
                        }];

                    var root = $login.get_root();

                    var get_objects = function () {
                        $http({
                            method: 'GET',
                            url: root + 'User/users/' + $login.get_key()
                        }).then(function successCallback(response) {
                            // this callback will be called asynchronously
                            // when the response is available
                            objects = on_fly.concat(response.data);
                            $rootScope.$broadcast('objectsGetted',
                                    {data: objects.slice(0), service: "$employees"});

                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });
                    };

                    var create_new_on_fly = function (new_object) {
                        get_objects();
                        var offCallMeFn = $rootScope.$on("objectsGetted", function (e, data) {
                            if (data.service === "$employees") {
                                offCallMeFn();
                                var found = $filter('getByAttribute')(objects, new_object.email, "email");
                                //console.log(found, objects, new_object);
                                if (!found) {
                                    on_fly.push(new_object);
                                }
                                $rootScope.$broadcast('objectCreated',
                                        {data: found, service: "$employees"});
                            }
                        });
                    };

                    return {
                        get_users: function () {
                            get_objects();
                        },
                        get_user: function (id) {
                            return objects.slice(0)[id];
                        },
                        set_new_user: function (obj_log) {
                            create_new_on_fly(obj_log);
                        }
                    };
                }]);
})();