'use strict';

/* Filter ��������� �������� ����\����� � � ����������� �� ����� ������ ������*/

angular.module('fsFilters', []).filter('checkmark', function() {
    return function(input) {
        return input ? '\ud83d\udcc4' : '\ud83d\udcc2';
    };
});

