(function () {
    'use strict';

    angular.module('evolution')
        .controller('sessionProgressController', controller);

    controller.$inject = ['$rootScope', '$scope', '$interval', 'Utils', 'ChargingSessionFactory'];

    function controller($rootScope, $scope, $interval, Utils, ChargingSessionFactory) {
        const vm = this;
        vm.endPayment = endPayment;
        vm.stopSession = stopSession;

        init();

        //////// Public

        function endPayment() {
            if (!Utils.validateForm(vm.form)) {
                return;
            }

            $scope.closeThisDialog();
        }

        function stopSession() {
            $interval.cancel(vm.intervalFun);
            vm.session.endTime = moment(vm.session.startTime).add((moment(vm.session.endTime)
                .diff(moment(vm.session.startTime)) * (vm.data.progress / 100)),'milliseconds')
                .format('YYYY-MM-DD HH:mm:ss');
            vm.session.energyRequested = vm.data.energyDelivered;
            vm.session.energyDelivered = vm.data.energyDelivered;
            vm.session.sessionStopped = true;
            vm.session.cost = (vm.data.progress / 100) * vm.session.cost;
            vm.session.totalCost = vm.session.cost;
            vm.data.cost = vm.session.totalCost;
            vm.isCompleted = true;
            ChargingSessionFactory.create(vm.session).then(() => {
                $rootScope.$broadcast('reload-sessions');
            });
        }

        //////// Private

        function init() {
            vm.data = angular.copy($scope.ngDialogData.item);
            vm.session = $scope.ngDialogData.item;
            vm.isCompleted = $scope.ngDialogData.isCompleted;
            vm.data.progress = moment().diff(moment(vm.data.startTime), 'seconds') * 4 > 100 ? 100 : moment().diff(moment(vm.data.startTime), 'seconds') * 4;
            vm.data.energyDelivered = vm.isCompleted ? vm.data.energyRequested : (vm.data.energyRequested * parseFloat(vm.data.progress / 100)).toFixed(2);
            vm.intervalFun = $interval(() => {
                vm.data.progress = moment().diff(moment(vm.data.startTime), 'seconds') * 4 > 100 ? 100 : moment().diff(moment(vm.data.startTime), 'seconds') * 4;
                vm.data.energyDelivered = vm.isCompleted ? vm.data.energyRequested : (vm.data.energyRequested * parseFloat(vm.data.progress / 100)).toFixed(2);
            },1000);
            vm.page = 1;
        }
    }
})();