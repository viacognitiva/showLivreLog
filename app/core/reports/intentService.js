(function () {
    'use strict';

    angular.module('app.intentService', [])
        .factory('intentService', intentService);

    intentService.$inject = ['$http'];

    function intentService($http) {

        return {
            getDados: getDados
        };

        var config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };

        function getDados() {

            var retorno = [];            

            return $http.get('/api/conversation/chat', config)
                .then(retornaData)
                .catch(errorData);

            function retornaData(response) {

                var intencao = '';
                var docs = response.data.rows;
                var flagAdd = true;
                if (docs.length > 0) {

                    for (var i = 0; i < docs.length; i++) {

                        flagAdd = true;
                        
                        if (docs[i].doc.data.intents[0]){

                            intencao = docs[i].doc.data.intents[0].intent;

                            if (intencao != 'despedida' && intencao != 'saudacao'){

                                for (var y = 0; y < retorno.length; y++) {

                                    if (retorno[y].label == intencao) {
                                        retorno[y].value = retorno[y].value + 1;
                                        flagAdd = false;
                                    }

                                }

                                if (flagAdd) {

                                    retorno.push({
                                        'value': 1,
                                        'color': "#a3e1d4",
                                        'highlight': "#1ab394",
                                        'label': intencao
                                    });

                                }
                            }
                        }
                    }

                }

                return retorno;
            }

            function errorData(error) {
                return error;
            }
        }
    }
})();
