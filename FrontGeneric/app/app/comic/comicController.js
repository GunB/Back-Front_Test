/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('comic.controller', [])
            .controller('comicController', ['$routeParams', '$location', '$listComic', '$rootScope',
                function ($routeParams, $location, $listComic, $rootScope) {
                    this.goList = function () {
                        $location.path('/list');
                    };

                    var that = this;

                    var comic_id = parseInt($routeParams.id);
                    var comic_search = $routeParams.search;

                    var show_comic = function () {

                        if (comic_search) {
                            $listComic.search_comic(comic_search);
                            var offCallMeFn = $rootScope.$on("objectSearched", function (e, data) {
                                if (data.service === "$listComic") {
                                    offCallMeFn();
                                    data = data.data;
                                    that.comic = data[comic_id];
                                    console.log(data, that.comic, comic_id);
                                }
                            });
                        } else {
                            that.comic = $listComic.get_comic(comic_id);
                        }

                    };

                    show_comic();

                }]);
})();