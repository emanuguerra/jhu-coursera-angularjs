(function () {
    "use strict";

    angular.module('common')
        .service('UserService', UserService);


    function UserService() {
        var service = this;

        service.save = function save(user) {
            service.user = user;
            console.log(service.user);
        }

        service.getUserData = function getUserData() {
            return service.user;
        }

    }

})();
