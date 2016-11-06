(function () {
    "use strict";
    angular.module('data').
        service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    MenuDataService.$inject = ['$http', 'ApiBasePath', '$q'];
    function MenuDataService($http, ApiBasePath, $q) {
        var service = this;

        service.getAllCategories = function getAllCategories() {
            var response = $http({
                method: 'GET',
                url: ApiBasePath + '/categories.json'
            });
            return response;
        };

        service.getItemsForCategory = function getItemsForCategory(categoryShortName) {
            var response = $http({
                method: 'GET',
                url: ApiBasePath + '/menu_items.json',
                params:{"category": categoryShortName}
            });
            return response;
        };
    }
})();