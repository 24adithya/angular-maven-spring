'use strict';
(function () {

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(['$routeProvider', '$locationProvider', function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'homeController',
                templateUrl: 'home/home.html',
                controllerAs: 'ctrl'
            })

            .when('/login', {
                controller: 'loginController',
                templateUrl: 'login/login.html',
                controllerAs: 'ctrl'
            })

            .when('/register', {
                controller: 'registerController',
                templateUrl: 'register/register.html',
                controllerAs: 'ctrl'
            })
           .otherwise({ redirectTo: '/login' });

    }]).run(['$rootScope', '$location', '$cookieStore', '$http', function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }]);
})();