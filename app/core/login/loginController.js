(function () {
    'use strict';

    angular.module('app.login',['ngStorage']).controller('loginController', loginController);

    loginController.$inject = ['$scope','$http','$location','$localStorage'];

    function loginController($scope, $http, $location, $localStorage) {

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
                            $localStorage.token = response.data.token;
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
