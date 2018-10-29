(function () {
    'use strict';

    angular.module('app.nav.header', [])
        .controller('headerController', headerController);

    headerController.$inject = ['$location', '$sessionStorage', '$indexedDB'];

    function headerController($location, $sessionStorage, $indexedDB) {

        var vm = this;
        vm.logout = logout;

        function logout(){

            delete $sessionStorage.token;
            $indexedDB.deleteDatabase('monitora').then(function(dele) {
                $location.path('/login')
            })

        }

    }
})();
