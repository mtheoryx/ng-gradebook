(function () {
    'use strict';
    angular.module('ngGradebookApp')
        .controller('Students', ['$scope', '$timeout', '$q', 'StudentsSvc', 'GradesSvc', function ($scope, $timeout, $q, StudentsSvc, GradesSvc) {

            //Variables
            $scope.isEditing = false;
            $scope.itemEdited = false;
            $scope.newField = {};
            $scope.grades = {};

            //Methods
            $scope.getStudents = getStudents;
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
            $scope.getStudents();

            function addStudent() {
                if ($scope.addStudentForm.$valid) {
                    var addStudentPromise = StudentsSvc.addStudent($scope.student);
                    addStudentPromise.then(function (data) {
                        $scope.students = data;
                        $scope.student = null;
                        $scope.clearAddFormValidation();
                        $scope.calculateGrades();
                    });
                }
            }

            function deleteStudent($index) {
                var deleteStudentPromise = StudentsSvc.deleteStudent($index);
                deleteStudentPromise.then(function (data) {
                    $scope.students = data;
                    $scope.calculateGrades();
                });
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
                    var updateStudentPromise = StudentsSvc.updateStudent(student, $index);
                    updateStudentPromise.then(function (data) {
                        $scope.students = data;
                        $scope.clearStudentListFormValidation();
                        $scope.isEditing = false;
                        $scope.itemEdited = false;
                        $scope.calculateGrades();
                    });
                }
            }

            function clearStudentListFormValidation() {
                $scope.updateStudentsForm.$setPristine();
                $scope.updateStudentsForm.$setUntouched();
            }

            function isEditingItem($index) {
                return $index === $scope.itemEdited;
            }

            function getStudents() {
                var studentsSvcPromise = StudentsSvc.getStudents();
                studentsSvcPromise.then(function (data) {
                    $scope.students = data;
                    $scope.calculateGrades();
                });
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