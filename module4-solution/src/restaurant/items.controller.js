(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['items', 'categoryShortName'];
    function ItemsController(items, categoryShortName) {
        var mainList = this;
        console.log(items);
        mainList.items = items.data.menu_items;
        mainList.categoryShortName = categoryShortName;
    }

})();
