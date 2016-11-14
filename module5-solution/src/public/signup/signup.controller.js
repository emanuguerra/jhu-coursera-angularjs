(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', '$q', 'UserService'];
    function SignUpController(MenuService, $q, UserService) {
        var $ctrl = this;
        $ctrl.user = UserService.getUserData();
        $ctrl.registrationCompleted = false;

        $ctrl.register = function register() {
            var promise = MenuService.getMenuItem($ctrl.user.favoriteDish);

            promise.then(function success(response) {
                UserService.save($ctrl.user);
                $ctrl.invalidFavoriteDish = false;
                $ctrl.registrationCompleted = true;
            })
                .catch(function (error) {
                    $ctrl.invalidFavoriteDish = true;
                    $ctrl.registrationCompleted = false;
                });
        }
    }

})();