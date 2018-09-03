(function () {
    'use strict';

    angular.module('app.modal.det', ['ngAnimate','ngSanitize','ui.bootstrap'])
        .controller('modalDetalheController', modalDetalheController);

    modalDetalheController.$inject = ['$scope','$uibModalInstance','$http','valLista'];

    function modalDetalheController($scope,$uibModalInstance,$http,valLista) {

        var vm      = this;
        vm.ok       = ok;
        vm.sort_by  = sort_by;
        vm.showDown = showDown;
        vm.showUp   = showUp;

        vm.items = valLista;
        vm.sortReverse = true;

        sort_by('data');

        function ok() {
            $uibModalInstance.close(false);
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

    }

})();