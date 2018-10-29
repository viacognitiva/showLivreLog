(function () {
    'use strict';

    angular.module('app.modal', ['ngAnimate','ngSanitize','ui.bootstrap'])
        .controller('modalController', modalController);

    modalController.$inject = ['$scope','$uibModalInstance','$http','valBanco','valPar','valSel','valItem'];

    function modalController($scope,$uibModalInstance,$http,valBanco,valPar,valSel,valItem) {

        var $ctrl = this;
        $ctrl.defineVlrSin = 'Valor';
        $ctrl.listaExe = [];
        limpar();
        iniciaForm();

        function limpar() {
            $ctrl.errorMessage='';
            $ctrl.sucessoMessage='';
        };

        function iniciaForm() {

            limpar();

            try {
                angular.forEach(valSel, function (sel) {

                    angular.forEach(valItem, function (item) {

                        if (item.id == sel) {
                            $ctrl.mensagemIntencao = item.msgUser;
                            throw Error(); //usado para simular o break, pra não iterar toda lista quando encontrado
                        }
                    });
                });

            } catch (e) {
                //console.log(e);
            }

            $http.get('/api/conversation/intencoes').then(function(response) {

                var retorno = [];
                var data = response.data;
                var x = 0;

                angular.forEach(data.intents, function (int) {

                    var jsonParam = {}
                    jsonParam.id = ++x;
                    jsonParam.descricao = int.intent;
                    retorno.push(jsonParam);
                });

                $ctrl.intencoes = retorno;
            });
            
        }

        $ctrl.cancel = function() {
            $uibModalInstance.close(false);
            limpar();
        };

        $ctrl.onChangeIntencao = function () {

            limpar();

            $http.get('api/conversation/listintencoes/' + $ctrl.selectedIntencao).then(
                function (response) {

                    var retorno = [];
                    var data = response.data;

                    angular.forEach(data.examples, function (val) {
                        var jsonParam = {}
                        jsonParam.desc = val.text;
                        retorno.push(jsonParam);
                        criaLista(val.text);
                    });

                    $ctrl.listaIntencao = retorno;
                },
                function (error) {
                    console.log('Error - onChangeIntencao:' + JSON.stringify(error));
                }
            );

        };

        $ctrl.ok = function() {

            limpar();

            angular.forEach(valItem, function(item){

                if(item.id == valSel){

                    criaLista($ctrl.mensagemIntencao);

                    var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}}
                    var data = {
                        intencao: $ctrl.selectedIntencao,
                        message: $ctrl.listaExe
                    };

                    $http.post('/api/conversation/intencao',JSON.stringify(data),config).then(

                        function(response){

                            if(response.status==200){

                                $ctrl.sucessoMessage="Intenção associada com sucesso.";
                                var data1 = {
                                    idLog:valSel[0],
                                    banco:valBanco
                                };

                                $http.post('/api/conversation/treinamento/status',JSON.stringify(data1),config)
                                .catch(function (error) {
                                    console.log('Error:' + JSON.stringify(error));
                                    $ctrl.errorMessage = "" + error.data.message;
                                });
                            }else{
                                $ctrl.errorMessage = "" + response.data.error.data.message;
                            }
                        },
                        function(error){
                            //console.log('Error:' + JSON.stringify(error));
                            $ctrl.errorMessage = 'Error:' + JSON.stringify(error.data.message);
                        }
                    );
                }
            });

        };

        function criaLista(texto) {
            var jsonParam = {}
            jsonParam.text = texto;
            $ctrl.listaExe.push(jsonParam);
        };
    }

})();