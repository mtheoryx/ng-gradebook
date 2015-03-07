(function () {
    'use strict';
    angular.module('ngGradebookApp')
        .directive('focusOnSave', function () {
            return {
                restrict: 'A',
                link: function (scope, el) {
                    scope.$on('save', function () {
                        el[0].focus();
                    });
                }
            };
        });
})();