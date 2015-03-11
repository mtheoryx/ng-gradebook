(function () {
    'use strict';
    angular.module('ngGradebookApp')
        .factory('StudentsSvc', ['$q', function ($q) {
            var mockStudents = [
              {firstName: 'Joe', lastName: 'Schmoe', grade: 50},
              {firstName: 'Michael ', lastName: 'Lieberman', grade: 97},
              {firstName: 'Steven ', lastName: 'Romano', grade: 80},
              {firstName: 'Patricia ', lastName: 'Rundell', grade: 95},
              {firstName: 'Olive ', lastName: 'Castleman', grade: 100}
            ];
            return {
                getStudents: function () {
                    var deferred = $q.defer();

                    deferred.resolve(mockStudents);

                    return deferred.promise;
                },
                deleteStudent: function (studentIndex) {
                    console.log(studentIndex);
                    var deferred = $q.defer();

                    mockStudents.splice(studentIndex, 1);

                    deferred.resolve(mockStudents);

                    return deferred.promise;
                },
                addStudent: function (student) {
                    var deferred = $q.defer();

                    mockStudents.push({
                        firstName:student.firstName,
                        lastName:student.lastName,
                        grade:student.grade
                    });

                    deferred.resolve(mockStudents);

                    return deferred.promise;
                },
                updateStudent: function (student, studentIndex) {
                    var deferred = $q.defer();

                    mockStudents[studentIndex] = student;

                    deferred.resolve(mockStudents);

                    return deferred.promise;
                }
            };
        }]);
})();