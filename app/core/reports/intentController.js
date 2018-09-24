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

        var pieOptions = {
            series: {
                pie: {
                    show: true
                }
            },
            grid: {
                hoverable: true
            },
            tooltip: true,
            tooltipOpts: {
                content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                shifts: {
                    x: 20,
                    y: 0
                },
                defaultTheme: false
            }
        };
        var pieData = [];
        /*
        var pieData = [
            {
                label: "Sales 1",
                data: 21,
                color: "#d3d3d3"
            },
            {
                label: "Sales 2",
                data: 3,
                color: "#bababa"
            },
            {
                label: "Sales 3",
                data: 15,
                color: "#79d2c0"
            },
            {
                label: "Sales 4",
                data: 52,
                color: "#1ab394"
            }
        ];
        */


        $rootScope.showInfo = false;

        buscar();

        function buscar() {
            $scope.myPromise = getJson();
        }

        function getJson() {

            return intentService.getDados().then((result) => {
                vm.doughnutData = result;
                vm.pieData = intentService.getData(result);
            }).catch((err) => {
                console.log(err);
            });

        }

        vm.doughnutOptions = doughnutOptions;
        vm.pieOptions = pieOptions;
        vm.pieData = pieData;

    }

})();