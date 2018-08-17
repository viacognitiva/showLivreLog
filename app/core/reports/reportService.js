(function () {
    'use strict';

    angular.module('app.reportService', [])
        .factory('reportService', reportService);

    reportService.$inject = ['$http'];

    function reportService($http) {

        return {
            getDia: getDia
        };

        function getDia(dataBusca) {

            var retorno = [];
            var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}}

            return $http.get('/api/conversation/getInfoData/'+ dataBusca,config)
                .then(retornaData)
                .catch(errorData);

            function retornaData(response) {

                var docs = response.data.docs;
                var retorno = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                var i = 0;

                if(docs.length > 0){
                    for(i = 0; i < docs.length;i++){
                        var horaTmp = new Date(docs[i].dateText).getHours();
                        retorno[horaTmp] = retorno[horaTmp] + 1;
                    }
                }
                return retorno;
            }

            function errorData(error) {
                //console.log(error);
                return error;
            }
        }

    }
})();
