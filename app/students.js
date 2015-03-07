(function () {
    'use strict';
    angular.module('ngGradebookApp')
        .controller('Students', ['$scope', '$timeout', function ($scope, $timeout) {
            $scope.students = [
              {firstName: 'Joe', lastName: 'Schmoe', grade: 50},
              {firstName: 'Michael ', lastName: 'Lieberman', grade: 97},
              {firstName: 'Steven ', lastName: 'Romano', grade: 80},
              {firstName: 'Patricia ', lastName: 'Rundell', grade: 95},
              {firstName: 'Olive ', lastName: 'Castleman', grade: 100}
            ];

            $scope.addStudent = addStudent;

            function addStudent() {
                $scope.students.push({
                    firstName:$scope.student.firstName,
                    lastName:$scope.student.lastName,
                    grade:$scope.student.grade
                });
                $scope.student = null;
                $timeout(function () {
                    $scope.$emit('save');
                }, 0);
            }

        }]);
})();