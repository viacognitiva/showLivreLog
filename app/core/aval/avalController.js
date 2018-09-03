(function () {
    'use strict';

    angular.module('app.aval', ['ngAnimate','ngSanitize','ui.bootstrap','cgBusy','app.avalService'])
        .controller('avalController', avalController);

    avalController.$inject = ['$rootScope','$scope','$log','$http','$uibModal','$mdDialog','$window','avalService'];

    function avalController($rootScope,$scope,$log,$http,$uibModal,$mdDialog,$window,avalService) {

        var vm = this;
        vm.detalhes = detalhes;
        vm.sort_by  = sort_by;
        vm.showDown = showDown;
        vm.showUp = showUp;
        vm.detConversa = detConversa;

        vm.items = [];

        vm.sortType     = 'data';
        vm.sortReverse  = true;
        $rootScope.showInfo = false;

        buscar();
        sort_by('data');

        function buscar() {
            $scope.myPromise = avalService.getDados().then(function(data) {
                vm.items = data;
            });
        }

        function detalhes(item) {

            return avalService.getDetalheUser(item).then(function(data) {
                modalDetalhe('lg',data);
            });

        }

        function modalDetalhe(size,data) {

            if(data.length > 0) {

                $uibModal.open({
                    scope: $scope,
                    animation: true,
                    controllerAs: '$ctrl',
                    templateUrl: 'core/navigation/modalDetalhe.html',
                    controller: 'modalDetalheController',
                    windowClass: 'custom-dialog tabelaDetalhe',
                    backdrop:false,
                    size: size,
                    resolve: {
                        valLista: function(){
                            return data;
                        }
                    }
                }).closed.then(function(){
                    //buscar();
                });

            } else {
                showAlert('Sem registros.','Viabot');
            }

        }

        function sort_by(newSortingOrder) {
            vm.sortReverse = (vm.sortType === newSortingOrder) ? !vm.sortReverse : false;
            vm.sortType = newSortingOrder;
        }

        function showDown(newSortingOrder) {
            return vm.sortType == newSortingOrder && !vm.sortReverse;
        }

        function showUp(newSortingOrder) {
            return vm.sortType == newSortingOrder && vm.sortReverse;
        }

        function showAlert(texto, titulo) {

            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title(titulo)
                    .textContent(texto)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                    .targetEvent('$event')
            );


        }

        function detConversa(item){
            showAlert(item.comentarioFull,'Comentário');
        }

    }

})();