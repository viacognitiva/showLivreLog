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

        var barDataDia = {
            labels: ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00",
                     "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
            datasets: [
                {
                    label: "Horários de Acesso",
                    fillColor: "rgba(220,220,220,0.8)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                }
            ]
        };

        var barDataAno = {
            labels: ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"],
            datasets: [
                {
                    label: "Quantidade de Acessos",
                    fillColor: "rgba(220,220,220,0.8)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data:[0,0,0,0,0,0,0,0,0,0,0,0]
                }
            ]
        };

        $rootScope.showInfo = false;

        buscar();

        function buscar(){
            $scope.myPromise = getJson();
        }

        function getJson() {
            reportService.getDia(new Date()).then(function(dados) {

                barDataDia = {
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

                vm.barDataDia = barDataDia;
                vm.qtdHorasDia =reportService.getQdtHorasDia();

            });

            return reportService.getAno().then(function(dados) {

                barDataAno = {
                    labels: ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"],
                    datasets: [
                        {
                            label: "Quantidade de Acessos",
                            fillColor: "rgba(220,220,220,0.8)",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data:dados
                        }
                    ]
                };

                vm.barDataAno = barDataAno;
                vm.qtdHorasMes = reportService.getQtdHorasMes();

            });
        }

        vm.barDataDia = barDataDia;
        vm.barDataAno = barDataAno;
        vm.barOptions = barOptions;

    }

})();