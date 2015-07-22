'use strict';

/* Controllers */

var fsApp = angular.module('fsApp', [
    'ngRoute',
    'fsControllers',
    'fsFilters'
]);

var fsControllers = angular.module('fsControllers', []);

//��������������:
//function Go(field){
//    alert(field);
//}
//
//fsControllers.controller('MyFormController', ['$scope', function($scope) {
//    $scope.add = function(field) {
//        var MainPath = field;
//        alert(MainPath);
//    };
//}]);

//var path = document.getElementsByName("field_ip");
//path1 = path.value();

var MainPath = 'http://localhost:8000/C://';

//���������� ��� 1 ����
var path1 = MainPath;

fsControllers.controller('fsListCtrl_1', ['$scope', '$http',
    function ($scope, $http) {

        $http.get(MainPath).success(function (data) {
            $scope.docs = data;
            $scope.track1 = MainPath.substring(MainPath.length - 4);
        });

        $scope.NewList1 = function (doc) {
            path1 = path1 + doc.name + '/';
            $http.get(path1).success(function (data) {
                $scope.docs = data;
                $scope.track1 = path1.substring(MainPath.length - 4);
            }).error(function (data, status) {
                $scope.docs = 'Request failed';
            });
        }

        $scope.PreviousList1 = function () {
            //���� �� ��� � �����
            if (path1 == MainPath) {
                $http.get(MainPath).success(function (data) {
                    $scope.docs = data;
                    $scope.track1 = MainPath.substring(MainPath.length - 4);
                });
            } else {
                path1 = path1.substring(0, path1.length - 1);//������� ��������� ������ � ������(��� ����)
                var i = path1.lastIndexOf('/');//���� ������ ���������� ������� ����� � ������
                //����� ������� �� �� ����������� �����.
                // ����� substring(start, end) ���������� ��������� � ������� start ��, �� �� �������, end.
                path1 = path1.substring(0, i + 1);

                $http.get(path1).success(function (data) {
                    $scope.docs = data;
                    $scope.track1 = path1.substring(MainPath.length - 4);
                }).error(function (data, status) {
                    $scope.docs = 'Request failed';
                });

            }
        }
    }]);

//���������� ��� 2 ����
var path2 = MainPath;

fsControllers.controller('fsListCtrl_2', ['$scope', '$http',
    function ($scope, $http) {

        $http.get(MainPath).success(function (data) {
            $scope.docs = data;
            $scope.track2 = MainPath.substring(MainPath.length - 4);
        });

        $scope.NewList2 = function (doc) {
            path2 = path2 + doc.name + '/';
            $http.get(path2).success(function (data) {
                $scope.docs = data;
                $scope.track2 = path2.substring(MainPath.length - 4);
            }).error(function (data, status) {
                $scope.docs = 'Request failed';
            });
        }

        $scope.PreviousList2 = function () {
            //���� �� ��� � �����
            if (path2 == MainPath) {
                $http.get(MainPath).success(function (data) {
                    $scope.docs = data;
                    $scope.track2 = MainPath.substring(MainPath.length - 4);
                });
            } else {
                path2 = path2.substring(0, path2.length - 1);//������� ��������� ������ � ������(��� ����)
                var i = path2.lastIndexOf('/');//���� ������ ���������� ������� ����� � ������
                //����� ������� �� �� ����������� �����.
                // ����� substring(start, end) ���������� ��������� � ������� start ��, �� �� �������, end.
                path2 = path2.substring(0, i + 1);

                $http.get(path2).success(function (data) {
                    $scope.docs = data;
                    $scope.track2 = path2.substring(MainPath.length - 4);
                }).error(function (data, status) {
                    $scope.docs = 'Request failed';
                });

            }
        }
    }]);