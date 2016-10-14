(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunchMenu = '';
        $scope.message = '';
        console.log('Controller loaded');

        function empty(value) {
            return value;
        }

        function lessThanFourItems() {
            var array = $scope.lunchMenu.split(',').filter(empty);
            return array.length < 4;
        }

        $scope.checkMenu = function checkMenu() {
            if (!$scope.lunchMenu) {
                $scope.message = 'Please enter data first';
            } else if (lessThanFourItems()) {
                $scope.message = 'Enjoy!';
            } else {
                $scope.message = 'Too much!';
            }
        }

    }
})();