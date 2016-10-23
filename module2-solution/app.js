(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
        toBuyList.buyItem = function (index) {
            ShoppingListCheckOffService.buyItem(index);
        }

    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBoughtList = this;

        alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        service.toBuy = initToBuyList();
        service.bought = [];

        service.buyItem = function buyItem(index) {
            service.bought.push(service.toBuy[index]);
            service.toBuy.splice(index, 1);
        }

        function initToBuyList() {
            return [{name: "cookies", quantity: 10},
                {name: "extra long spaghetti packets", quantity: 8},
                {name: "skimmed milk bottles", quantity: 3},
                {name: "vanilla pecan ice-cream boxes", quantity: 4},
                {name: "green lemons", quantity: 6},
                {name: "soda bottles", quantity: 12},
                {name: "agave syrup bottles", quantity: 2}];
        }

        service.getToBuyItems = function () {
            return service.toBuy;
        };

        service.getBoughtItems = function () {
            return service.bought;
        };

    }
})();