// IIFE - isolate the scope of the components of app.js with an Immediately Invoked Function Expression
(function () {
    "use strict";

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    // App Controller
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;
        controller.found = [];
        controller.searchTerm = "";
        controller.message = "";

        controller.callMenuService = function callMenuService() {

            if (controller.searchTerm.trim().length > 0) {

                var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);

                promise.then(function success(response) {

                    if (response.length == 0) {
                        controller.message = "Nothing found";
                        controller.found = [];
                    } else {
                        controller.message = "";
                        controller.found = response;
                        console.log("Items found: " + response.length);
                    }
                });


            } else {
                controller.message = "Nothing found";
                controller.found = [];
            }
        }

        controller.removeItem = function (index) {
            console.log(index);
            controller.found.splice(index, 1);
        }
    }

    // Menu Service
    MenuSearchService.$inject = ['$http', 'ApiBasePath', '$q'];
    function MenuSearchService($http, ApiBasePath, $q) {
        var service = this;

        service.getAllMenuItems = function getAllMenuItems() {
            var response = $http({
                method: 'GET',
                url: ApiBasePath + '/menu_items.json'
            });
            return response;
        };

        service.getMatchedMenuItems = function (searchTerm) {
            var promise = service.getAllMenuItems();
            var deferred = $q.defer();
            var result = [];

            promise.then(function success(response) {
                var menuItems = response.data.menu_items;
                result = menuItems.filter(function (menuItem) {
                    return menuItem.description.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1;
                });
                deferred.resolve(result);
            })
                .catch(function (error) {
                    console.log(error);
                    deferred.reject(result);
                });

            return deferred.promise;
        };
    }


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;

    }

})
();
