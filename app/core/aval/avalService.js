(function () {
    'use strict';

    angular.module('app.avalService', [])
        .factory('avalService', avalService);

    avalService.$inject = ['$http','$filter','$log','$q'];

    function avalService($http, $filter, $log, $q) {

        return {
            getDados: getDados,
            getDetalheUser: getDetalheUser
        };

        function getDados() {

            var retorno = [];

            return $http.get('/api/conversation/getInfoAval')
                .then(procRetorno)
                .catch(procError);

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

            function procError(error) {
                var newMessage = 'XHR Failed for getDados.';
                $log.error(newMessage);
                $log.error(error);
                return $q.reject(error);
            }

        }

        function getDetalheUser(item) {

            var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}};
            var retorno = [];

            return $http.get('/api/conversation/getInfoChat/' + item.id,config)
                .then(procResponse)
                .catch(procError);

            function procResponse(response) {

                var data = response.data;

                angular.forEach(data.docs, function(item){

                    var jsonParam = {};

                    angular.forEach(item.data.entities, function(ent){
                        jsonParam.entidade = ent.entity;
                        jsonParam.confidenceEntidade =parseFloat((ent.confidence*100).toFixed(2)) ;
                    });

                    angular.forEach(item.data.intents, function(int){
                        jsonParam.intencao = int.intent;
                        jsonParam.confidenceIntencao = parseFloat((int.confidence*100).toFixed(2)) ;
                    });

                    angular.forEach(item.data.input, function(text){
                        if(text.length!=0)jsonParam.msgUser = text;
                    });

                    if(item.data.context.conversation_id.length!=0){
                        jsonParam.conversation_id = item.data.context.conversation_id;
                        jsonParam.data = $filter('date')(new Date(item.dateText), "dd/MM/yyyy HH:mm:ss");
                        jsonParam.id=item._id;
                    }

                    if(!angular.equals(jsonParam,{})){
                        retorno.push(jsonParam);
                    }

                });

                return retorno;

            }

            function procError(error) {
                var newMessage = 'XHR Failed for getDetalheUser.';
                $log.error(newMessage);
                $log.error(error);
                return $q.reject(error);
            }

        }

    }


})();
