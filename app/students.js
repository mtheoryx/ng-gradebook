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
            $scope.isEditing = false;
            $scope.itemEdited = false;
            $scope.newField = {};

            $scope.addStudent = addStudent;
            $scope.deleteStudent = deleteStudent;
            $scope.clearAddFormValidation = clearAddFormValidation;
            $scope.editStudent = editStudent;
            $scope.cancelEdit = cancelEdit;
            $scope.clearStudentListFormValidation = clearStudentListFormValidation;
            $scope.isEditingItem = isEditingItem;

            function addStudent() {
                if ($scope.addStudentForm.$valid) {
                    $scope.students.push({
                        firstName:$scope.student.firstName,
                        lastName:$scope.student.lastName,
                        grade:$scope.student.grade
                    });
                    $scope.student = null;
                    $timeout(function () {
                        $scope.$emit('save');
                        $scope.clearAddFormValidation();
                    }, 0);
                }
            }

            function deleteStudent($index) {
                $scope.students.splice($index, 1);
            }

            function clearAddFormValidation() {
                $scope.addStudentForm.$setPristine();
                $scope.addStudentForm.$setUntouched();
            }

            function editStudent(student, $index) {
                $scope.newField = angular.copy(student);
                $scope.$emit('editing');
                $scope.isEditing = true;
                $scope.itemEdited = $index;
            }

            function cancelEdit($index) {
                $scope.students[$index] = $scope.newField;
                $scope.newField = {};
                $scope.isEditing = false;
                $scope.itemEdited = false;
                $scope.clearStudentListFormValidation();
            }

            function clearStudentListFormValidation() {
                $scope.updateStudentsForm.$setPristine();
                $scope.updateStudentsForm.$setUntouched();
            }

            function isEditingItem($index) {
                return $index === $scope.itemEdited;
            }

        }]);
})();