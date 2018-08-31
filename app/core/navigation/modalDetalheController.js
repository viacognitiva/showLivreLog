(function () {
    'use strict';

    angular.module('app.modal.det', ['ngAnimate','ngSanitize','ui.bootstrap'])
        .controller('modalDetalheController', modalDetalheController);

    modalDetalheController.$inject = ['$scope','$uibModalInstance','$http','valLista'];

    function modalDetalheController($scope,$uibModalInstance,$http,valLista) {

        var $ctrl           = this;
        $ctrl.items         = valLista;
        $ctrl.sortType      = 'msgUser';
        $ctrl.sortReverse   = true;


        $ctrl.ok = function() {
            $uibModalInstance.close(false);
        };

        $ctrl.sort_by = function(newSortingOrder) {
            $ctrl.sortReverse = ($ctrl.sortType === newSortingOrder) ? !$ctrl.sortReverse : false;
            $ctrl.sortType = newSortingOrder;
        };

        $ctrl.showDown = function(newSortingOrder) {
            return $ctrl.sortType == newSortingOrder && !$ctrl.sortReverse
        };

        $ctrl.showUp = function(newSortingOrder) {
            return $ctrl.sortType == newSortingOrder && $ctrl.sortReverse
        };

    }

})();