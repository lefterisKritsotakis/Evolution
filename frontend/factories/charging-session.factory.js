(function () {
    'use strict';

    angular.module('evolution')
        .factory('ChargingSessionFactory', factory);

    factory.$inject = ['$http', 'Api'];

    function factory($http, Api) {

        const api = Api.api;

        return {
            create: create,
            getChargingSessionsPerUser: getChargingSessionsPerUser
        };

        //////// Public
        function create(data) {
            return $http.post(api, data);
        }

        function getChargingSessionsPerUser(userId, options) {
            return $http.get(api + '/SessionsPerUser/' + userId + (options ? '?datetimeFrom=' + options.dateFrom + '&datetimeTo=' + options.dateTo : ''));
        }


    }
})();