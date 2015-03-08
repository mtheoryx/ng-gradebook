(function () {
    'use strict';
    angular.module('ngGradebookApp')
        .factory('GradesSvc', ['$q', function ($q) {

            var allGrades = function (students) {
                var grades = [];
                angular.forEach(students, function(value) {
                  grades.push(value.grade);
                });
                return grades;
            };

            return {
                getAverageGrade: function (students) {
                    var deferred = $q.defer();
                    var averageGrades = _.sum(allGrades(students))/allGrades(students).length;

                    deferred.resolve(averageGrades);

                    return deferred.promise;
                },
                getMinimumGrade: function (students) {
                    var deferred = $q.defer();
                    var minGrade = _.min(allGrades(students));

                    deferred.resolve(minGrade);

                    return deferred.promise;
                },
                getMaxiumumGrade: function (students) {
                    var deferred = $q.defer();
                    var maxGrade = _.max(allGrades(students));

                    deferred.resolve(maxGrade);

                    return deferred.promise;
                },
                getAllGradeStats: function (students) {
                    var deferred = $q.defer();
                    var averagePromise = this.getAverageGrade(students);
                    var minPromise = this.getMinimumGrade(students);
                    var maxPromise = this.getMaxiumumGrade(students);

                    $q.all([averagePromise, minPromise, maxPromise]).then(function (data) {
                        deferred.resolve(data);
                    });

                    return deferred.promise;
                }
            };
        }]);
})();