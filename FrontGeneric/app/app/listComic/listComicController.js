/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('listComic.controller', [])
            .controller('listComicController', ['$listComic', '$scope', function ($listComic, $scope) {

                    var that = this;

                    this.show_data = function () {
                        if ($(that.data).size() === 0) {
                            that.data = $listComic.get_comics();
                            return;
                        }
                        if ($(that.data).size() <= max_data && $(that.data).size() > 0) {
                            that.show = that.data;
                            that.more = false;
                        } else {
                            var cont = 0;
                            while (cont < max_data && $(that.data).size() > 0) {
                                that.show.push(that.data.shift());
                                cont++;
                            }
                            that.more = $(that.data).size() > 0;
                        }
                    };

                    this.data = [];
                    this.show = [];
                    this.more = false;
                    var max_data = 9;
                    this.show_data();

                    var onCall = $scope.$on('objectsGetted', function (e, data) {
                        if (data.service === "$listComic") {
                            onCall();
                            that.data = data.data;
                            that.show_data();
                        }
                    });

                }]);
})();