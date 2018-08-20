(function () {
    'use strict';

    angular.module('app.userService', [])
        .factory('userService', userService);

    userService.$inject = ['$http','$filter','$log','$q'];

    function userService($http, $filter, $log, $q) {

        return {
            getUser: getUser
        };

        function getUser() {

            var retorno = [];

            return $http.get('/api/conversation/usuarios')
                .then(retornaUser)
                .catch(errorUser);

            function retornaUser(response){

                var data = response.data;

                angular.forEach(data.rows, function(item){

                    var jsonParam = {};

                    jsonParam.nome = item.doc.nome;
                    jsonParam.email = item.doc.email;
                    jsonParam.fone = item.doc.telefone;
                    jsonParam.data = $filter('date')(new Date(item.doc.data), "dd/MM/yyyy HH:mm:ss");

                    if(!angular.equals(jsonParam, {})){
                       retorno.push(jsonParam);
                    }

                });

                if(retorno.length!=0){
                    retorno.push({selected: {}});
                }

                return retorno;

            }

            function errorUser(error){
                var newMessage = 'XHR Failed for getChat.';
                $log.error(newMessage);
                return $q.reject(error);
            }

        }

    }
})();
