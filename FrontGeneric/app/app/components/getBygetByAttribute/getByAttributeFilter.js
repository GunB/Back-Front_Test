/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('getByAttribute.filter', ['ngRoute'])
            .filter('getByAttribute', function () {
                return function (array, element, attribute) {
                    attribute = attribute ? attribute : "id";
                    var i = 0, len = $(array).size();
                    for (; i < len; i++) {
                        if (array[i][attribute] == element) {
                            return array[i];
                        }
                    }
                    return null;
                };
            });
})();