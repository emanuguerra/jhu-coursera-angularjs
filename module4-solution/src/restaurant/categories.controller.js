(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoriesListController', CategoriesListController);

    CategoriesListController.$inject = ['items'];
    function CategoriesListController(items) {
        var mainList = this;
        console.log(items);
        mainList.items = items.data;
    }

})();
