(function () {
    'use strict';

    angular.module('app.outros', ['ngAnimate','ngSanitize','ui.bootstrap','ngMaterial','ngStorage','cgBusy','app.outrosService'])
        .controller('outrosController', outrosController);

        outrosController.$inject = ['$rootScope','$scope','$log','$http','$uibModal','$window','$mdDialog','$localStorage','outrosService'];

        function outrosController($rootScope,$scope,$log,$http,$uibModal,$window,$mdDialog,$localStorage, outrosService) {

            var vm      = this;
            vm.buscar   = buscar;
            vm.sort_by  = sort_by;
            vm.showDown = showDown;
            vm.showUp   = showUp;
            vm.showAlert= showAlert;

            vm.modalEntidade    = modalEntidade;
            vm.toggleSelection  = toggleSelection;
            vm.modalIntencao    = modalIntencao;

            vm.mostrarbtnInt = false;
            vm.mostrarbtnEnt = false;
            vm.disableBtnTreinarIntencao = true;
            vm.disableBtnTreinarEntidade = true;
            vm.selection = [];

            vm.items = [];

            vm.sortType     = 'name';
            vm.sortReverse  = true;
            $rootScope.showInfo = false;

            buscar();

            function getJson() {
                return outrosService.getOutros().then(function(data) {
                    vm.items = data;
                });
            }

            function buscar() {
                $scope.myPromise = getJson();
            }

            function toggleSelection (id) {

                var idx = vm.selection.indexOf(id);

                if (idx > -1) {
                    vm.selection.splice(idx, 1);
                } else {
                    vm.selection.push(id);
                }

                if(vm.selection.length>0){
                    vm.disableBtnTreinarIntencao = false;
                    vm.disableBtnTreinarEntidade = false;
                } else {
                    vm.disableBtnTreinarIntencao = true;
                    vm.disableBtnTreinarEntidade = true;
                }
            }

            function sort_by(newSortingOrder) {
                vm.sortReverse = (vm.sortType === newSortingOrder) ? !vm.sortReverse : false;
                vm.sortType = newSortingOrder;
            }

            function showDown(newSortingOrder) {
                return vm.sortType == newSortingOrder && !vm.sortReverse
            }

            function showUp(newSortingOrder) {
                return vm.sortType == newSortingOrder && vm.sortReverse
            }

            function modalEntidade(size) {

                $uibModal.open({
                    scope: $scope,
                    animation: true,
                    controllerAs: '$ctrl',
                    templateUrl: 'core/navigation/modalEnt.html',
                    controller: 'modalController',
                    windowClass: 'custom-dialog',
                    backdrop:false,
                    size: size,
                    resolve: {
                        valBanco: function(){
                            return 'outros';
                        },
                        valPar: function(){
                            return 'entidade';
                        },
                        valSel: function () {
                           return vm.selection;
                         },
                         valItem: function(){
                            return vm.items;
                         }
                    }
                }).closed.then(function(){
                    buscar();
                });
            }

            function modalIntencao(size) {

                $uibModal.open({
                    scope: $scope,
                    animation: true,
                    controllerAs: '$ctrl',
                    templateUrl: 'core/navigation/modalInt.html',
                    controller: 'modalController',
                    windowClass: 'custom-dialog',
                    backdrop:false,
                    size: size,
                    resolve: {
                        valBanco: function(){
                            return 'outros';
                        },
                        valPar: function(){
                            return 'intencao';
                        },
                        valSel: function () {
                           return vm.selection;
                        },
                        valItem: function(){
                            return vm.items;
                        }
                    }
                }).closed.then(function(){
                    buscar();
                });
            }

            function showAlert(ev) {

                var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}}
                var data = {token: $localStorage.token};

                $http.post('/api/validate',JSON.stringify(data),config).then(function(response) {
                    var data = response.data;
                    console.log('retorno: ' + JSON.stringify(data));

                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Abrale')
                        .textContent($localStorage.token)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                    );

                });

            }

        }

})();