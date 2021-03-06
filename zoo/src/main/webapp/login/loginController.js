'use strict';
(function () {
    angular
        .module('app')
        .controller('loginController', ['$location', 'authenticationService', 'flashService' , function ($location, AuthenticationService, FlashService) {
        var ctrl = this;
 
        ctrl.login = login;
 
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
 
        function login() {
            ctrl.dataLoading = true;
            AuthenticationService.Login(ctrl.username, ctrl.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(ctrl.username, ctrl.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    ctrl.dataLoading = false;
                }
            });
        }
    }]);
 
})();