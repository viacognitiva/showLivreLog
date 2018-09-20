(function () {
    'use strict';

    angular.module('app.intents', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'cgBusy', 'app.intentService'])
        .controller('intentController', intentController);

    intentController.$inject = ['$rootScope', '$scope', 'intentService'];

    function intentController($rootScope, $scope, intentService) {

        var vm = this;

        var doughnutData = [];
        var doughnutOptions = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            percentageInnerCutout: 45, // This is 0 for Pie charts
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false
        };
        $rootScope.showInfo = false;

        buscar();

        function buscar() {
            $scope.myPromise = getJson();
        }

        function getJson() {

            return intentService.getDados().then((result) => {
                vm.doughnutData = result;
            }).catch((err) => {
                console.log(err);
            });

        }

        vm.doughnutOptions = doughnutOptions;

    }

})();