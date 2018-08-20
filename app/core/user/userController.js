(function () {
    'use strict';

    angular.module('app.user', ['ngAnimate','ngSanitize','ui.bootstrap','ngMaterial','cgBusy','app.userService'])
        .controller('userController', userController);

        userController.$inject = ['$rootScope','$scope','$log','$http','$uibModal','$window','$mdDialog','userService'];

        function userController($rootScope,$scope,$log,$http,$uibModal,$window,$mdDialog,userService) {

            var vm = this;
            vm.sort_by  = sort_by;
            vm.showDown = showDown;
            vm.showUp = showUp;
            vm.showAlert = showAlert;

            vm.items = [];

            vm.sortType     = 'nome';
            vm.sortReverse  = true;
            $rootScope.showInfo = false;

            buscar();

            function showAlert(ev) {

                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Abrale')
                    .textContent('Teste prompt.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
                );
            };

            function getJson() {
                return userService.getUser().then(function(data) {
                    vm.items = data;
                });
            };

            function buscar() {
                $scope.myPromise = getJson();
            };

            function sort_by(newSortingOrder) {
                vm.sortReverse = (vm.sortType === newSortingOrder) ? !vm.sortReverse : false;
                vm.sortType = newSortingOrder;
            };

            function showDown(newSortingOrder) {
                return vm.sortType == newSortingOrder && !vm.sortReverse
            };

            function showUp(newSortingOrder) {
                return vm.sortType == newSortingOrder && vm.sortReverse
            };

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
                });
            };

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
                });
            };

        }

})();