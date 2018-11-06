(function () {
    'use strict';

    angular.module('app.reportService', [])
        .factory('reportService', reportService);

    reportService.$inject = ['$http'];

    function reportService($http) {

        var qtdAcessoDia = 0;
        var qtdAcessoMes = 0;
        var qtdAcessoAno = 0;
        var qtdAcessoMesAtual = 0;
        var qtdAcessoUserDia = 0;
        var qtdAcessoInter = 0;
        var config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };

        return {
            getDia: getDia,
            getMes: getMes,
            getAno: getAno,
            getUserDia: getUserDia,
            getQdtAcessoDia: getQdtAcessoDia,
            getQtdAcessosMes: getQtdAcessoMes,
            getQtdAcessoAno: getQtdAcessoAno,
            getQtdAcessoMesAtual: getQtdAcessoMesAtual,
            getQtdAcessoUserDia: getQtdAcessoUserDia,
            getQtdAcessoInter: getQtdAcessoInter
        };

        function getDia(dataBusca){

            qtdAcessoDia = 0;
            var retorno = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            return $http.get('/api/conversation/getInfoData/'+ dataBusca,config)
                .then(retornaData)
                .catch(errorData);

            function retornaData(response) {

                var docs = response.data.docs;
                var i = 0;

                if(docs.length > 0){
                    for(i = 0; i < docs.length;i++){
                        var horaTmp = new Date(docs[i].dateText).getHours();
                        retorno[horaTmp] = retorno[horaTmp] + 1;
                        qtdAcessoDia = qtdAcessoDia + 1
                    }
                }
                return retorno;
            }

            function errorData(error) {
                console.log(error);
                return error;
            }
        }

        function getMes(mesBusca) {

            qtdAcessoMes = 0;
            var retorno = [];

            return $http.get('/api/conversation/getInfoMes/' + mesBusca,config)
                .then(procRetorno)
                .catch(procErro);

            function procRetorno(response) {

                var docs = response.data.docs;
                var i = 0;
                var mesTmp = 0;

                if(docs.length > 0){
                    for(i = 0; i < docs.length;i++){
                        mesTmp = new Date(docs[i].dateText).getMonth();
                        retorno[mesTmp] = retorno[mesTmp] + 1;
                        qtdAcessoMes = qtdAcessoMes + 1;
                    }
                }
                return retorno;
            }

            function procErro(error) {
                console.log(error);
                return error;
            }
        }

        function getAno() {

            qtdAcessoAno = 0;
            qtdAcessoMesAtual = 0;
            var retorno = [0,0,0,0,0,0,0,0,0,0,0,0];
            var listaId = [];

            return $http.get('/api/conversation/getInfoAno',config)
            .then(function(response){

                var docs = response.data.docs;
                var i = 0;
                var mesAtual = new Date().getMonth();
                var mesRet = 0;

                if(docs.length > 0){

                    for(i = 0; i < docs.length; i++){

                        mesRet = new Date(docs[i].dateText).getMonth();
                        retorno[mesRet] = retorno[mesRet] + 1;
                        qtdAcessoAno = qtdAcessoAno + 1;

                        if (mesAtual == mesRet){
                            qtdAcessoMesAtual = qtdAcessoMesAtual + 1;
                        }

                        if (!listaId.includes(docs[i].data.context.conversation_id)) {
                            listaId.push(docs[i].data.context.conversation_id);
                        }

                    }

                    qtdAcessoInter = listaId.length;
                }

                return retorno;

            })
            .catch(function(error){
                console.log(error);
                return error;
            });

        }

        function getUserDia(dataBusca) {

            qtdAcessoUserDia = 0;
            var retorno = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            return $http.get('/api/conversation/getInfoUser/'+ dataBusca,config)
                .then(retornaData)
                .catch(errorData);

            function retornaData(response) {

                var docs = response.data.docs;
                var i = 0;

                if(docs.length > 0){
                    for(i = 0; i < docs.length;i++){
                        var horaTmp = new Date(docs[i].data).getHours();
                        retorno[horaTmp] = retorno[horaTmp] + 1;
                        qtdAcessoUserDia = qtdAcessoUserDia + 1
                    }
                }
                return retorno;
            }

            function errorData(error) {
                console.log(error);
                return error;
            }
        }

        function getQdtAcessoDia(){
            return qtdAcessoDia
        }

        function getQtdAcessoMes(){
            return qtdAcessoMes
        }

        function getQtdAcessoAno(){
            return qtdAcessoAno
        }

        function getQtdAcessoMesAtual(){
            return qtdAcessoMesAtual
        }

        function getQtdAcessoUserDia() {
            return qtdAcessoUserDia
        }

        function getQtdAcessoInter(){
            return qtdAcessoInter
        }
    }
})();
