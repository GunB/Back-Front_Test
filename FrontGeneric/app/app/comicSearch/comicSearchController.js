/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('comicSearch.controller', [])
            .controller('comicSearchController', ['$scope', '$listComic', "$routeParams",
                function ($scope, $listComic, $routeParams) {

                    this.search = $routeParams.search;

                    var search_pattern = "" + this.search + "";
                    $listComic.search_comic(search_pattern);

                    var that = this;
                    this.show = [];

                    $scope.$on('objectSearched', function (event, data) {
                        if (data.service === "$listComic") {
                            data = data.data;
                            that.show = data;
                        }
                    });
                }]);
})();