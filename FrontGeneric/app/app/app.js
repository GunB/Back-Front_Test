(function () {

// Declare app level module which depends on views, and components
    angular.module('myApp', [
        'ngRoute',
        'navbar.directive',
        'navbar.controller',
        'login.directive',
        'login.controller',
        'login.service',
        'listComic.directive',
        'listComic.controller',
        'listComic.service',
        'comic.directive',
        'comic.controller',
        'newUser.directive',
        'newUser.controller',
        'newComic.directive',
        'newComic.controller',
        'employees.directive',
        'employees.controller',
        'employees.service',
        'comicSearch.directive',
        'comicSearch.controller',
        'getByAttribute.filter',
        'getByRegularAttribute.filter'
    ])
            .run(function ($rootScope, $location, $login) {

                // register listener to watch route changes
                $rootScope.$on("$routeChangeStart", function (event, next, current) {

                    if (next.templateUrl === "app/newUser/newUser.html") {
                        return;
                    }

                    if (!$login.is_log()) {
                        // no logged user, we should be going to #login
                        if (next.templateUrl === "app/login/login.html") {
                            // already going to #login, no redirect needed
                        } else {
                            // not going to #login, we should redirect now
                            $location.path("/login");
                        }
                    } else {
                        if (next.templateUrl === "app/login/login.html") {
                            $location.path("/list");
                        }
                    }
                });
            })
            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.otherwise({redirectTo: '/login'});
                }]);
})();