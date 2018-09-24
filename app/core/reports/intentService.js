(function () {
    'use strict';

    angular.module('app.intentService', [])
        .factory('intentService', intentService);

    intentService.$inject = ['$http'];

    function intentService($http) {

        return {
            getDados: getDados,
            getData: getData
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

        function getData(valores){

            var retorno = [];

            for(var w=0; w < valores.length; w++){

                retorno.push(
                    {
                        'label': valores[w].label,
                        'data': valores[w].value,
                        'color': getRandomColor()
                    }
                )

            }
            return retorno;
        }

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          }
    }
})();
