(function () {
    'use strict';

    angular.module('app.chatService', ['ngSanitize'])
        .factory('chatService', chatService);

    chatService.$inject = ['$rootScope', '$http', '$filter', '$log', '$q'];

    function chatService($rootScope, $http, $filter, $log, $q) {

        var qtdChat = 0;
        var qtdConv = 0;

        return {
            getChat: getChat,
            retornaQdt: retornaQdt,
            retornaQdtChat: retornaQdtChat
        }

        function getChat() {

            return $http.get('/api/conversation/chat')
                .then(retornaChat)
                .catch(errorChat);
        }

        function retornaChat(response) {

            var retorno = [];
            var listaId = [];
            var data = response.data;
            qtdChat = 0;

            angular.forEach(data.rows, function (item) {

                var jsonParam = {};

                angular.forEach(item.doc.data.entities, function (ent) {
                    jsonParam.entidade = ent.entity;
                    jsonParam.confidenceEntidade = parseFloat((ent.confidence * 100).toFixed(2));
                });

                angular.forEach(item.doc.data.intents, function (int) {
                    jsonParam.intencao = int.intent;
                    jsonParam.confidenceIntencao = parseFloat((int.confidence * 100).toFixed(2));
                });

                jsonParam.msgUser = item.doc.data.input.text;
                jsonParam.msgWatson = item.doc.data.output.text[0];

                if (item.doc.data.context.conversation_id.length != 0) {
                    jsonParam.conversation_id = item.doc.data.context.conversation_id;
                    jsonParam.data = $filter('date')(new Date(item.doc.dateText), "dd/MM/yyyy HH:mm:ss");
                    jsonParam.id = item.id;
                    jsonParam.treinado = item.doc.treinado;
                }

                jsonParam.nome = getNome(item.doc.data.context.conversation_id);

                if (!angular.equals(jsonParam, {})) {
                    retorno.push(jsonParam);
                }

                if (!listaId.includes(item.doc.data.context.conversation_id)) {
                    listaId.push(item.doc.data.context.conversation_id);
                }

                qtdChat = qtdChat + 1;

            });

            qtdConv = listaId.length;

            if (retorno.length != 0) {
                retorno.push({
                    selected: {}
                });
            }

            return retorno;

        }

        function getNome(idChat) {

            var retorno = $filter('filter')($rootScope.usuarios, {
                chatId: idChat
            })[0];

            if (retorno) {
                return retorno.nome + '(' + retorno.email + ')';
            } else {
                return idChat;
            }
        }

        function errorChat(error) {
            var newMessage = 'XHR Failed for getChat.';
            $log.error(newMessage);
            $log.error(error);
            return $q.reject(error);
        }

        function retornaQdt() {
            return qtdChat;
        }

        function retornaQdtChat() {
            return qtdConv;
        }

    }
})();
