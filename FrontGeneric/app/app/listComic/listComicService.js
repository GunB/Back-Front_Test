/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    angular.module('listComic.service', ['ngRoute'])
            .service('$listComic', ["$http", "$rootScope", "$filter", "$login",
                function ($http, $rootScope, $filter, $login) {
                    var objects = [];
                    var on_fly = [{
                            id: 0,
                            title: "ONTHEFLY"
                        }];

                    var root = $login.get_root();

                    var get_objects = function () {
                        $http({
                            method: 'GET',
                            url: root + 'Products/all' + $login.get_key()
                        }).then(function successCallback(response) {
                            // this callback will be called asynchronously
                            // when the response is available
                            objects = on_fly.concat(response.data);
                            $rootScope.$broadcast('objectsGetted',
                                    {data: objects.slice(0), service: "$listComic"});

                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });
                    };

                    var create_new_on_fly = function (new_object) {
                        get_objects();
                        var offCallMeFn = $rootScope.$on("objectsGetted", function (e, data) {
                            if (data.service === "$listComic") {
                                offCallMeFn();
                                var found = $filter('getByAttribute')(objects, new_object.title, "title");
                                //console.log(found, objects, new_object);
                                if (!found) {
                                    on_fly.push(new_object);
                                }
                                $rootScope.$broadcast('objectCreated',
                                        {data: found, service: "$listComic"});
                            }
                        });
                    };

                    var search_regularly = function (regular) {
                        get_objects();
                        var offCallMeFn = $rootScope.$on("objectsGetted", function (e, data) {
                            if (data.service === "$listComic") {
                                offCallMeFn();
                                var found = $filter('getByRegularAttribute')(objects, regular, "title");
                                //console.log(found, objects, new_object);
                                $rootScope.$broadcast('objectSearched',
                                        {data: found, service: "$listComic"});
                            }
                        });
                    };

                    return {
                        get_comics: function () {
                            get_objects();
                        },
                        get_comic: function (id) {
                            return objects.slice(0)[id];
                        },
                        set_new_comic: function (new_object) {
                            create_new_on_fly(new_object);
                        },
                        search_comic: function (regular) {
                            search_regularly(regular);
                        }
                    };
                }]);
})();