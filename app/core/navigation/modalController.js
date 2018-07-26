(function () {
    'use strict';

    angular.module('app.modal', ['ngAnimate','ngSanitize','ui.bootstrap'])
        .controller('modalController', modalController);

        modalController.$inject = ['$scope','$uibModalInstance','$http','valBanco','valPar','valSel','valItem'];

        function modalController($scope,$uibModalInstance,$http,valBanco,valPar,valSel,valItem) {

            var $ctrl = this;
            $ctrl.defineVlrSin = 'Valor';
            limpar();

            function limpar() {
               $ctrl.errorMessage='';
               $ctrl.sucessoMessage='';
            };

            $ctrl.cancel = function() {
                $uibModalInstance.close(false);
                limpar();
            };

            $ctrl.ok = function() {

                limpar();

                if(valPar=='intencao'){

                    angular.forEach(valItem, function(item){

                        if(item.id == valSel){

                            var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}}
                            var data = {
                                intencao: $scope.selectedIntencao,
                                message: item.msgUser
                            };

                            $http.post('/api/conversation/intencao',JSON.stringify(data),config).then(

                                function(response){

                                    if(response.status==200){
                                        if(response.data.error){
                                            $ctrl.errorMessage=""+response.data.error;
                                        } else {
                                            $ctrl.sucessoMessage="Intenção associada com sucesso.";
                                            var data1 = {
                                                idLog:valSel,
                                                banco:valBanco
                                            };
                                            $http.post('/api/conversation/treinamento/status',JSON.stringify(data1),config)
                                            .then(function(response){

                                                },
                                                function(error){
                                                    console.log('Error:' + JSON.stringify(error));
                                                }
                                            );
                                        }
                                    }
                                },
                                function(error){
                                    console.log('Error:' + JSON.stringify(error));
                                    $ctrl.errorMessage = 'Error:' + JSON.stringify(error)
                                }
                            );
                        }//fim do if
                    });

                } else if(valPar=='entidade'){

                    angular.forEach(valItem, function(item){

                        if(item.id == valSel){

                            var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}}

                            if($ctrl.defineVlrSin=='Sinonimo'){

                                var data = {
                                    entidade: $scope.selectedEntidade ,
                                    valor: $ctrl.selectedEntidadeValue,
                                    sinonimo: item.msgUser,
                                    idLog:valSel
                                };

                                $http.post('/api/conversation/entidade/synonyms',JSON.stringify(data),config).then(

                                    function(response){

                                        if(response.status==200){

                                            if(response.data.error){
                                                $ctrl.errorMessage=""+response.data.error;

                                            }else {
                                                var data1 = {
                                                    idLog:valSel,
                                                    banco:valBanco
                                                };
                                                $http.post('/api/conversation/treinamento/status',JSON.stringify(data1),config).then(

                                                    function(response){
                                                        $ctrl.sucessoMessage="Sinonimo criado com sucesso.";
                                                    },
                                                    function(error){
                                                        $ctrl.errorMessage = "Erro";
                                                        console.log('Error:' + JSON.stringify(error));
                                                    }
                                                );
                                            }
                                        }
                                    },
                                    function(error){
                                        console.log('Error: ' + JSON.stringify(error));
                                        $ctrl.errorMessage="Error " + JSON.stringify(error);
                                    }
                                );

                            } else {

                                var data = {
                                    entidade: $scope.selectedEntidade ,
                                    valor: item.msgUser,
                                    id:valSel
                                };

                                $http.post('/api/conversation/entidade',JSON.stringify(data),config).then(
                                    function(response){

                                        if(response.status==200){

                                            if(response.data.error){
                                                $ctrl.errorMessage=""+response.data.error;

                                            } else {

                                                var data1 = {
                                                    idLog:valSel,
                                                    banco:valBanco
                                                };
                                                $http.post('/api/conversation/treinamento/status',JSON.stringify(data1),config).then(
                                                    function(response){
                                                        $ctrl.sucessoMessage="Valor da Entidade criado com sucesso.";
                                                    },
                                                    function(error){
                                                        console.log('Erro ' + error);
                                                        $ctrl.errorMessage="Error " + error;
                                                     }
                                                );
                                            }
                                        }
                                    },
                                    function(erro){
                                        console.log('Erro '+erro);
                                        $ctrl.errorMessage="Error"+erro;
                                    }
                                );
                            }
                        }//fim do if
                    });
                }
            }; //FIM OK

            if(valPar=='entidade'){

                try {
                    angular.forEach(valSel, function(sel){

                        angular.forEach(valItem, function(item){

                            if(item.id==sel){
                                $ctrl.mensagemEntidade=item.msgUser;
                                throw Error();//usado para simular o break, pra não iterar toda lista quando encontrado
                            }
                        });
                    });

                } catch(e) {
                    //console.log(e);
                }

                limpar();

                $http.get('/api/conversation/entities').then(function(response) {

                    var retorno = [];
                    var data = response.data;
                    var x=0;

                    angular.forEach(data.entities, function(ent){
                        var jsonParam = {}
                        jsonParam.id=++x;
                        jsonParam.descricao=ent.entity;
                        retorno.push(jsonParam);
                    });

                    $ctrl.entidades = retorno;

                });

            } else if (valPar=='intencao'){

                try {
                    angular.forEach(valSel, function(sel){

                        angular.forEach(valItem, function(item){

                            if(item.id==sel){
                                $ctrl.mensagemIntencao=item.msgUser;
                                throw Error();//usado para simular o break, pra não iterar toda lista quando encontrado
                            }
                        });
                    });

                } catch(e) {
                    //console.log(e);
                }

                limpar();

                $http.get('/api/conversation/intencoes').then(function(response) {

                    var retorno = [];
                    var data = response.data;
                    var x=0;

                    angular.forEach(data.intents, function(int){

                        var jsonParam = {}
                        jsonParam.id=++x;
                        jsonParam.descricao=int.intent;
                        retorno.push(jsonParam);
                    });

                    $ctrl.intencoes = retorno;
                });

            } else if ($scope.parametro=='textoEnt'){

                try {
                    angular.forEach($scope.selection, function(sel){

                        angular.forEach($scope.itemOutros, function(item){

                            if(item.id==sel){
                                $ctrl.mensagemEntidade=item.msgUser;
                                throw Error();//usado para simular o break, pra não iterar toda lista quando encontrado
                            }
                        });
                    });

                } catch(e) {
                    //console.log(e);
                }

                limpar();

                 $http.get('/api/conversation/entities').then(function(response) {

                    var retorno = [];
                    var data = response.data;
                    var x=0;

                    angular.forEach(data.entities, function(ent){
                        var jsonParam = {}
                        jsonParam.id=++x;
                        jsonParam.descricao=ent.entity;
                        retorno.push(jsonParam);
                    });

                    $ctrl.entidades = retorno;

                });

            } else if ($scope.parametro=='textoInt'){

                try {
                    angular.forEach($scope.selection, function(sel){

                        angular.forEach($scope.itemOutros, function(item){

                            if(item.id==sel){
                                $ctrl.mensagemIntencao=item.msgUser;
                                throw Error();//usado para simular o break, pra não iterar toda lista quando encontrado
                            }
                        });
                    });

                } catch(e) {
                    //console.log(e);
                }

                limpar();

                $http.get('/api/conversation/intencoes').then(function(response) {

                    var retorno = [];
                    var data = response.data;
                    var x=0;

                    angular.forEach(data.intents, function(int){

                        var jsonParam = {}
                        jsonParam.id=++x;
                        jsonParam.descricao=int.intent;
                        retorno.push(jsonParam);
                    });

                    $ctrl.intencoes = retorno;
                });

            };

            $ctrl.onchangeEntidade = function() {

                limpar();

                var entidade = $scope.selectedEntidade;
                if($ctrl.defineVlrSin == 'Sinonimo'){

                    $http.get('/api/conversation/entidade/value/'+entidade).then(
                        function(response) {

                            var retorno = [];
                            var data = response.data;
                            var x=0;

                            angular.forEach(data.values, function(val){
                                var jsonParam = {}
                                jsonParam.id=++x;
                                jsonParam.descricao=val.value;
                                retorno.push(jsonParam);
                            });

                            $ctrl.EntidadeValues = retorno;
                        },
                        function(error){
                            console.log('Error - onchangeEntidade:' + JSON.stringify(error));
                        }
                    );
                }
            };

            $ctrl.onchangeRadioEnt = function() {

                limpar();

                if($ctrl.defineVlrSin=='Sinonimo'){
                    $scope.selectedEntidade ="";
                    $ctrl.selectedEntidadeValue="";
                }
            };

        }

})();