require('dotenv-safe').load();

var watson = require('watson-developer-cloud');
var workspacesId = process.env.WORKSPACE_ID;

var assistant = new watson.AssistantV1({
    username: process.env.WTS_USERNAME,
    password: process.env.WTS_PASSWORD,
    version: '2018-09-20'
});

var logConversation = {

    get: function (req, res) {

        var params = {
            workspace_id: workspacesId,
        };

        assistant.listLogs(params, function (err, response) {
            if (err) {
                console.log(" logConversation.get: " + err);
                res.status(500).json(err);
            } else {
                res.status(200).json(response);
            }
        });

    },    

    //INTENÇÃO
    getIntencoes: function (req, res) {

        var params = {
            workspace_id: workspacesId,
        };

        assistant.listIntents(params, function (err, response) {
            if (err) {
                //console.log(" logConversation.getIntencoes Error: "+JSON.parse(err));
                res.status(200).json(err);
            } else {
                res.status(200).json(response);
            }

        });
    },

    getIntencaoExamplos : function (req, res) {
      
        var params = {
            workspace_id: workspacesId,
            intent: req.params.intent,
            export: true
        };

        assistant.getIntent(params, function (err, response) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(response);
            }
        });
        
    },

    treinaIntencao: function (req, res) {

        var params = {
            workspace_id: workspacesId,
            intent: req.body.intencao,
            new_examples: req.body.message
        };
       
        assistant.updateIntent(params, function (err, response) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(response);
            }
        });

    },

    //DESABILITADO
    getEntidades: function (req, res) {

        var params = {
            workspace_id: workspacesId,
        };

        assistant.listEntities(params, function (err, response) {
            if (err) {
                //console.log(" logConversation.getEntidades Error: " + err);
                res.status(200).json(err);
            } else {
                res.status(200).json(response);
            }

        });
    },

    getEntidadeValue: function (req, res) {

        var params = {
            workspace_id: workspacesId,
            entity: req.params.entity
        };

        assistant.listValues(params, function (err, response) {
            if (err) {
                //console.log(" logConversation.getEntidadeValue Error: " + err);
                res.status(200).json(err);
            } else {
                res.status(200).json(response);
            }
        });
    },

    criarSinonimo: function (req, res) {

        var params = {
            workspace_id: workspacesId,
            entity: req.body.entidade,
            value: req.body.valor,
            synonym: req.body.sinonimo
        };

        assistant.createSynonym(params, function (err, response) {
            if (err) {
                //console.log(" logConversation.criarSinônimo Error: " + err);
                res.status(200).json(err);
            } else {
                res.status(200).json(response);
            }
        });
    },

    treinaEntidade: function (req, res) {

        var params = {
            workspace_id: workspacesId,
            entity: req.body.entidade,
            values: [{
                value: req.body.valor
            }]
        };

        assistant.createEntity(params, function (err, response) {
            if (err) {
                //console.log(" logConversation.treinaIntencao Error: "+ err);
                res.status(200).json(err);
            } else {
                res.status(200).json(response);
            }
        });
    }

}

module.exports = logConversation;