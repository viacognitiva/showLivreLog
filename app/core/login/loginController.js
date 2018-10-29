(function () {
    'use strict';

    angular.module('app.login', ['ngStorage', 'app.localService'])
    .controller('loginController', loginController);

    loginController.$inject = ['$scope', '$http', '$location', '$sessionStorage', 'localService'];

    function loginController($scope, $http, $location, $sessionStorage, localService) {

        var vm = this;
        vm.logar = logar;

        function logar(){

            var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}}
            var data = {
                username: $scope.user,
                password: $scope.password
            };

            $http.post('/login',JSON.stringify(data),config).then(
                function(response){
                    if(response.status==200){
                        if(response.data.user.name!=''){
                            $sessionStorage.token = response.data.token;
                            localService.loadBanco()
                            $location.path('/report');
                        }
                    }
                },
                function(erro){
                    console.log(erro);
                    $scope.errorMessage = "Erro: " + erro.data.message;
                }
            );
        }
    }
})();
