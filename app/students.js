(function () {
    'use strict';
    angular.module('ngGradebookApp')
        .controller('Students', ['$scope', '$timeout', '$q', 'GradesSvc', function ($scope, $timeout, $q, GradesSvc) {

            //Variables
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
            $scope.grades = {};

            //Methods
            $scope.addStudent = addStudent;
            $scope.deleteStudent = deleteStudent;
            $scope.clearAddFormValidation = clearAddFormValidation;
            $scope.editStudent = editStudent;
            $scope.cancelEdit = cancelEdit;
            $scope.updateStudent = updateStudent;
            $scope.clearStudentListFormValidation = clearStudentListFormValidation;
            $scope.isEditingItem = isEditingItem;
            $scope.calculateGrades = calculateGrades;

            //Initialization
            $scope.calculateGrades();

            //Events
            $scope.$on('update', function() {
              $scope.calculateGrades();
            });

            function addStudent() {
                if ($scope.addStudentForm.$valid) {
                    $scope.students.push({
                        firstName:$scope.student.firstName,
                        lastName:$scope.student.lastName,
                        grade:$scope.student.grade
                    });
                    $scope.student = null;
                    $timeout(function () {
                        $scope.$emit('update');
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

            function updateStudent(student, $index) {
                if ($scope.updateStudentsForm.$valid && $scope.updateStudentsForm.$dirty) {

                    $scope.students[$index] = student;
                    $scope.clearStudentListFormValidation();
                    $scope.isEditing = false;
                    $scope.itemEdited = false;

                    $timeout(function() {
                      $scope.$emit('update');
                    }, 0);

                }
            }

            function clearStudentListFormValidation() {
                $scope.updateStudentsForm.$setPristine();
                $scope.updateStudentsForm.$setUntouched();
            }

            function isEditingItem($index) {
                return $index === $scope.itemEdited;
            }

            function calculateGrades() {
                var getAllGradeStats = GradesSvc.getAllGradeStats($scope.students);
                getAllGradeStats.then(function (data) {
                    $scope.grades.avg = data[0];
                    $scope.grades.min = data[1];
                    $scope.grades.max = data[2];
                });
            }
        }]);
})();