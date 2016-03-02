/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    angular.module('getByRegularAttribute.filter', ['ngRoute'])
            .filter('getByRegularAttribute', function () {
                return function (array, regular, attribute) {
                    var patt = new RegExp(regular);
                    attribute = attribute ? attribute : "id";
                    var out = [];
                    for (var i = 0; i < $(array).size(); i++) {
                        if (patt.test(array[i][attribute]))
                            out.push(array[i]);
                    }
                    return out;
                };
            });
})();