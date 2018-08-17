(function () {
    'use strict';

    angular.module('app.reports', ['ngAnimate','ngSanitize','ui.bootstrap','cgBusy','app.reportService'])
        .controller('reportController', reportController);

    reportController.$inject = ['$rootScope','$scope','$log','$http','$uibModal','$window','reportService'];

    function reportController($rootScope,$scope,$log,$http,$uibModal,$window,reportService) {

        var vm = this;

        var barOptions = {
            scaleBeginAtZero : true,
            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(0,0,0,.05)",
            scaleGridLineWidth : 1,
            barShowStroke : true,
            barStrokeWidth : 2,
            barValueSpacing : 5,
            barDatasetSpacing : 1
        };

        var barData = {
            labels: ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00",
                "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
            datasets: [
                {
                    label: "Horários de Acesso",
                    fillColor: "rgba(220,220,220,0.8)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                }
            ]
        };

        $rootScope.showInfo = false;

        buscar();

        function getJson() {
            return reportService.getDia(new Date()).then(function(dados) {

                barData = {
                    labels: ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00",
                        "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
                    datasets: [
                        {
                            label: "Horários de Acesso",
                            fillColor: "rgba(220,220,220,0.8)",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data:dados
                        }
                    ]
                };

                //barData.datasets[0].data = dados;
                vm.barData = barData;

            });
        }

        function buscar(){
            $scope.myPromise = getJson();
        }

        vm.barData = barData;
        vm.barOptions = barOptions;

    }

})();