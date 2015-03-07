(function() {
    'use strict';
    angular.module('ngGradebookApp')
        .filter('percentage', ['$filter', function ($filter) {
            return function (input, decimals) {
                return $filter('number')(input, decimals) + '%';
            };
        }]);
})();