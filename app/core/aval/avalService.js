(function () {
    'use strict';

    angular.module('app.avalService', [])
        .factory('avalService', avalService);

    avalService.$inject = ['$http','$log','$q','$filter'];

    function avalService($http,$log,$q,$filter) {

        return {
            getDados: getDados
        };



        function getDados() {

            var retorno = [];

            return $http.get('/api/conversation/getInfoAval')
                .then(procRetorno)
                .catch(errorRetorno);

            function procRetorno(response) {

                angular.forEach(response.data.rows, function(item){

                    var jsonParam = {};

                    jsonParam.id = item.doc.chatId;
                    jsonParam.nome = item.doc.nome + ' (' + item.doc.email + ')';
                    jsonParam.resposta = item.doc.gostou;
                    jsonParam.interesse = item.doc.interesse;
                    jsonParam.interface = item.doc.interface;
                    jsonParam.recomenda = item.doc.recomenda;
                    jsonParam.data = $filter('date')(new Date(item.doc.data), "dd/MM/yyyy HH:mm:ss");

                    if(!angular.equals(jsonParam, {})){
                        retorno.push(jsonParam);
                    }

                });

                return retorno;

            }

            function errorRetorno(error) {
                var newMessage = 'XHR Failed for getDados.';
                $log.error(newMessage);
                $log.error(error);
                return $q.reject(error);
            }
        }
    }

    function getDetalheUser(id) {

        var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}}

        return $http.get('/api/conversation/getDetalhe/'+ id,config)
            .then(procResponse)
            .catch(procError);


    }

    function procResponse(response) {

        var data = response.data;

        angular.forEach(data.rows, function(item){

            var jsonParam = {};




        }


    }

    function procError(error) {

    }
})();
