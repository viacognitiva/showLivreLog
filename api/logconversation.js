require('dotenv-safe').load();

const watson = require('watson-developer-cloud');
const wts_username = process.env.WTS_USERNAME;
const wts_password = process.env.WTS_PASSWORD;
const workspacesId = process.env.WORKSPACE_ID;
const protocol = process.env.NODE_ENV == 'production' ? "https" : "http" ;

const conversation = new watson.ConversationV1({
    username: wts_username,
    password: wts_password,
    version_date: '2018-07-10'
});

const logConversation = {

    get : function(req,res) {

        const params = {
            workspace_id: workspacesId,
        };

        conversation.listLogs(params, function(err, response) {
            if (err) {
                console.log(" logConversation.get: " + err);
                res.status(500).json(err);
            } else {
                res.status(200).json(response);
            }
        });

    },

    getEntidades : function(req,res) {

        const params = {
            workspace_id: workspacesId,
        };

        conversation.listEntities(params, function(err, response) {
            if (err) {
                //console.log(" logConversation.getEntidades Error: " + err);
                res.status(200).json(err);
            } else {
                res.status(200).json(response);
            }

        });
    },

    getEntidadeValue : function(req,res) {

        const params = {
            workspace_id: workspacesId,
            entity: req.params.entity
        };

        conversation.listValues(params, function(err, response) {
            if (err) {
                //console.log(" logConversation.getEntidadeValue Error: " + err);
                res.status(200).json(err);
            } else {
                res.status(200).json(response);
            }
        });
    },

    criarSinonimo : function(req,res) {

        const params = {
            workspace_id: workspacesId,
            entity: req.body.entidade,
            value: req.body.valor,
            synonym: req.body.sinonimo
        };

        conversation.createSynonym(params, function(err, response) {
            if (err) {
                //console.log(" logConversation.criarSinônimo Error: " + err);
                res.status(200).json(err);
            } else {
                res.status(200).json(response);
            }
        });
    },

    getIntencoes : function(req,res) {

        const params = {
            workspace_id: workspacesId,
        };

        conversation.listIntents(params, function(err, response) {
            if (err) {
                //console.log(" logConversation.getIntencoes Error: "+JSON.parse(err));
                res.status(200).json(err);
            } else {
                res.status(200).json(response);
            }

        });
    },

    treinaIntencao : function(req,res) {

        const params = {
            workspace_id: workspacesId,
            intent: req.body.intencao,
            examples: [
                {
                    text: req.body.message
                }
            ]
        };

        conversation.createIntent(params, function(err, response) {
            if (err) {
                //console.log(" logConversation.treinaIntencao Error: " + err);
                res.status(200).json(err);
            } else {
                res.status(200).json(response);
            }
        });
    },

    treinaEntidade : function(req,res) {

        var params = {
            workspace_id: workspacesId,
            entity: req.body.entidade,
            values: [
                {
                    value: req.body.valor
                }
            ]
        };

        conversation.createEntity(params, function(err, response) {
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