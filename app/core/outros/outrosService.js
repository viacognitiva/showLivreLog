(function () {
    'use strict';

    angular.module('app.outrosService', [])
        .factory('outrosService', outrosService);

    outrosService.$inject = ['$http','$filter','$log','$q'];

    function outrosService($http, $filter, $log, $q) {

        return {
            getOutros: getOutros
        };

        function getOutros() {

            var retorno = [];

            return $http.get('/api/conversation/outros')
                .then(retornaOutros)
                .catch(errorOutros);

            function retornaOutros(response){

                var data = response.data;

                angular.forEach(data.rows, function(item){

                    var jsonParam = {};
                    jsonParam.id = item.doc._id;
                    jsonParam.idchat = item.doc.idchat;
                    jsonParam.msgUser = item.doc.texto;
                    jsonParam.data = $filter('date')(new Date(item.doc.data), "dd/MM/yyyy HH:mm:ss");
                    jsonParam.treinado = item.doc.treinado;

                    if(!angular.equals(jsonParam, {})){
                        retorno.push(jsonParam);
                    }

                });

                if(retorno.length!=0){
                    retorno.push({selected: {}});
                }

                return retorno;

            }

            function errorOutros(error){
                var newMessage = 'XHR Failed for getChat.';
                $log.error(newMessage);
                return $q.reject(error);
            }

        }

    }
})();
