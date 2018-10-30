(function () {
    'use strict';

    angular.module('app.localService', [])
        .factory('localService', localService);

    localService.$inject = ['$rootScope', '$http', '$filter', '$log', '$q', '$indexedDB'];

    function localService($rootScope, $http, $filter, $log, $q, $indexedDB) {

        var retUser = [];
        var retChat = [];
        $rootScope.totalInter = 0;
        $rootScope.totalChat = 0;

        var config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };

        return {
            loadBanco: loadBanco,
            grafico1: grafico1
        }

        function loadBanco() {
            loadDataUser()
        }

        function loadDataUser() {
            return $http.get('/api/conversation/usuarios')
            .then(function(response) {

                var data = response.data;

                angular.forEach(data.rows, function (item) {

                    var jsonParam = {};
                    jsonParam.id = item.doc._id;
                    jsonParam.chatId = item.doc.chatId;
                    jsonParam.nome = item.doc.nome;
                    jsonParam.email = item.doc.email;
                    jsonParam.fone = item.doc.telefone;
                    jsonParam.data = $filter('date')(new Date(item.doc.data), "dd/MM/yyyy");
                    jsonParam.selected = '';

                    if (!angular.equals(jsonParam, {})) {
                        retUser.push(jsonParam);
                    }

                });

                $rootScope.usuarios = retUser;

                $indexedDB.openStore('user', function(store) {
                    store.clear().then(function() {
                        store.upsert(retUser)
                    })

                });
                
            })
            .catch(function (error) {
                var newMessage = 'XHR Failed for localService --> ';
                $log.error(newMessage + error);
                return $q.reject(error);
            });
        }

        function loadDataChat() {

            return $http.get('/api/conversation/chat')
            .then(function (response) {

                var listaId = [];
                var data = response.data;

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
                        retChat.push(jsonParam);
                    }

                    if (!listaId.includes(item.doc.data.context.conversation_id)) {
                        listaId.push(item.doc.data.context.conversation_id);
                    }

                    $rootScope.totalInter = $rootScope.totalInter + 1;

                });

                $rootScope.totalChat = listaId.length;

                $indexedDB.openStore('chat', function (store) {
                    store.clear().then(function () {
                        store.upsert(retUser)
                    })

                });
                                
            })
            .catch(function (error) {
                var newMessage = 'XHR Failed for localService --> ';
                $log.error(newMessage + error);
                return $q.reject(error);
            });
            
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

    }
})();
