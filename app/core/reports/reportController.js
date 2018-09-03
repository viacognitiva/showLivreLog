(function () {
    'use strict';

    angular.module('app.reports', ['ngAnimate','ngSanitize','ui.bootstrap','cgBusy','app.reportService','app.chatService'])
        .controller('reportController', reportController);

    reportController.$inject = ['$rootScope','$scope','$log','$http','$uibModal','$window','reportService','chatService'];

    function reportController($rootScope,$scope,$log,$http,$uibModal,$window,reportService,chatService) {

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
            labels: ["00h","01h","02h","03h","04h","05h","06h","07h","08h","09h","10h","11h",
                     "12h","13h","14h","15h","16h","17h","18h","19h","20h","21h","22h","23h"],
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
            reportService.getUserDia(new Date()).then(function(dados) {

                barDataDia = {
                    labels: ["00h","01h","02h","03h","04h","05h","06h","07h","08h","09h","10h","11h",
                             "12h","13h","14h","15h","16h","17h","18h","19h","20h","21h","22h","23h"],
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
                vm.qtdAcessoDia =reportService.getQtdAcessoUserDia();

            });

            reportService.getAno().then(function(dados) {

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
                vm.qtdAcessoMes = reportService.getQtdAcessoMesAtual();

            });

            return chatService.getChat().then(function() {
                $rootScope.totalInter = chatService.retornaQdt();
                $rootScope.totalChat = chatService.retornaQdtChat();
            });
        }

        vm.barDataDia = barDataDia;
        vm.barDataAno = barDataAno;
        vm.barOptions = barOptions;

    }

})();