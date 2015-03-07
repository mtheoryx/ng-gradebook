(function () {
    'use strict';
    var ngGradebookApp = angular.module('ngGradebookApp', []);
    ngGradebookApp.constant('_', window._);
    ngGradebookApp.run(['$rootScope', function ($rootScope) {
        $rootScope._ = window._;
    }]);
    ngGradebookApp.controller('StudentController', ['$scope', '_', function ($scope, _) {
        
    }]);
})();