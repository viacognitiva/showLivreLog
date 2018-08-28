(function () {
    'use strict';

    angular.module('app.reportService', [])
        .factory('reportService', reportService);

    reportService.$inject = ['$http'];

    function reportService($http) {

        var qtdHorasDia = 0;
        var qtdHorasMes = 0;
        var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}};


        return {
            getDia: getDia,
            getAno: getAno,
            getQdtHorasDia: getQdtHorasDia,
            getQtdHorasMes: getQtdHorasMes
        };

        function getDia(dataBusca) {

            qtdHorasDia = 0;
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
                        qtdHorasDia = qtdHorasDia + 1
                    }
                }
                return retorno;
            }

            function errorData(error) {
                console.log(error);
                return error;
            }
        }

        function getAno() {

            qtdHorasMes = 0;
            var retorno = [0,0,0,0,0,0,0,0,0,0,0,0];

            return $http.get('/api/conversation/getInfoAno',config)
                .then(retornaData)
                .catch(errorData);

            function retornaData(response) {

                var docs = response.data.docs;
                var i = 0;
                var mesAtual = new Date().getMonth();

                if(docs.length > 0){
                    for(i = 0; i < docs.length;i++){
                        var horaTmp = new Date(docs[i].dateText).getMonth();
                        retorno[horaTmp] = retorno[horaTmp] + 1;

                        if (mesAtual == horaTmp){
                            qtdHorasMes = qtdHorasMes + 1;
                       }

                    }
                }

                return retorno;
            }

            function errorData(error) {
                console.log(error);
                return error;
            }
        }

        function getIntent() {



            return $http.get('/api/conversation/getInfo',config)
                .then(retornaInfo)
                .catch(errorInfo);

            function retornaInfo(response) {

                var docs = response.data.docs;

                if(docs.length > 0) {
                    for (var i = 0; i < docs.length; i++) {


                    }
                }

            }

            function errorInfo(error) {
                console.log(error);
                return error;
            }

        }

        function getQdtHorasDia(){
            return qtdHorasDia;
        }

        function getQtdHorasMes(){
            return qtdHorasMes;
        }
    }
})();
