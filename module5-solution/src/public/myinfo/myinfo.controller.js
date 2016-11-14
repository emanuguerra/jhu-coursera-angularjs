(function () {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['user','menuItem'];
    function MyInfoController(user, menuItem) {
        var $ctrl = this;

        $ctrl.user = user;
        $ctrl.menuItem = menuItem;

    }

})();