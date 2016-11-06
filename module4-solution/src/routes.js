(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');


        // *** Set up UI states ***
        $stateProvider
        // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/restaurant/templates/home.template.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/restaurant/templates/categories.template.html',
                controller: 'CategoriesListController as mainList',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/{categoryShortName}',
                templateUrl: 'src/restaurant/templates/items.template.html',
                controller: 'ItemsController as itemsCtrl',
                resolve: {
                    items: ['$stateParams','MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }],
                    categoryShortName: ['$stateParams', function ($stateParams) {
                        return $stateParams.categoryShortName;
                    }]
                }
            });
    }

})();