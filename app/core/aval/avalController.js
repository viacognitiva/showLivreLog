(function () {
    'use strict';

    angular.module('app.aval', ['ngAnimate','ngSanitize','ui.bootstrap','cgBusy','app.avalService'])
        .controller('avalController', avalController);

    avalController.$inject = ['$rootScope','$scope','$log','$http','$uibModal','$window','avalService'];

    function avalController($rootScope,$scope,$log,$http,$uibModal,$window,avalService) {

        var vm = this;
        vm.detalhes = detalhes;
        //vm.sort_by  = sort_by;
        //vm.showDown = showDown;
        //vm.showUp = showUp;
        //vm.showAlert = showAlert;

        vm.items = [];

        //vm.sortType     = 'nome';
        //vm.sortReverse  = true;
        $rootScope.showInfo = false;

        buscar();

        function buscar() {
            $scope.myPromise = avalService.getDados().then(function(data) {
                vm.items = data;
            });
        }

        function detalhes(item) {
            console.log(item.id)



        }




    }

})();