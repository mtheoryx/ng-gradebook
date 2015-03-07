(function () {
    'use strict';
    angular.module('ngGradebookApp')
        .run(['$rootScope', function ($rootScope) {
            $rootScope._ = window._;
            $rootScope.title = 'Grade Book';
        }]);
})();