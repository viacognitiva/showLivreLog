require('dotenv-safe').load();

const Cloudant = require('@cloudant/cloudant');
const cloudant_url = process.env.CLOUDANT_URL;
const services = JSON.parse(process.env.VCAP_SERVICES || "{}");
const user = process.env.CLOUDANT_USER;
const password = process.env.CLOUDANT_PASSWORD;

if(process.env.VCAP_SERVICES) {

    services = JSON.parse(process.env.VCAP_SERVICES);

    if(services.cloudantNoSQLDB) {
        cloudant_url = services.cloudantNoSQLDB[0].credentials.url;
        user = services.cloudantNoSQLDB[0].credentials.username;
        password = services.cloudantNoSQLDB[0].credentials.password;
    }
}

const cloudantDB = Cloudant({url:cloudant_url, account:user, password:password});
db = cloudantDB.db.use(process.env.CLOUDANT_DB);
dbOutros = cloudantDB.db.use(process.env.CLOUDANT_DBTREINO);
dbUser = cloudantDB.db.use(process.env.CLOUDANT_DBUSER);

const cloudant = {

    get : function(req, res) {

        const id = req.params.id;

        db.get(id, function(err, data) {
            res.status(200).json(data);
        });
    },

    login : function (req,res,callback) {

        var query = { selector: { nome: req.body.username , senha: req.body.password}};

        dbUser.find(query, function(err, data) {
            if (err) {
                return console.log('error ao buscar usuario', err.message);
            }
            callback(data);
        });
    },

    getChat : function (req, res){

        db.list({include_docs:true},function(err, data) {
            if(err){
                return console.log('[getChat] ', err.message);
                res.status(500);
            }
            res.status(200).json(data);
        });

    },

    getOutros : function(req, res){

        dbOutros.list({include_docs:true},function(err, data) {
            if(err){
                return console.log('[getOutros] ', err.message);
                res.status(500);
            }
            res.status(200).json(data);
        });

    },

    listWorkspace : function (req, res) {

        db = cloudantDB.db.use('workspace');
        db.index({name:'_id', type:'json', index:{fields:['status']}});

        var query = { selector: { status: 'ativo' }};

        db.find(query, function(err, data) {
            if (err) {
                return console.log('[db.listWorkspace] ', err.message);
            }
            res.status(201).json(data);
        });

    },

    getWorkspaceSelecionada : function (req, res) {

        db = cloudantDB.db.use('workspace');
        db.index( {name:'_id', type:'json', index:{fields:['selecionado']}});

        var query = { selector: { selecionado: 'true' }};
        db.find(query, function(err, data) {
            if (err) {
                return console.log('[db.getWorkspaceSelected] ', err.message);
            }
            res.status(201).json(data);
        });
    },

    atualizaStatusTreinamento : function (req, res){

        const id = req.body.idLog;

        if(req.body.banco == 'chat'){

            db.index( {_id: '_id', type:'json', index:{fields:['_id']}});
            var query = { selector: { _id: id }};

            db.find(query, function(err, data) {

                if (err) {
                    return console.log('[db.atualizaStatusTreinamento] ', err.message);
                    res.status(201).json(err);
                }else{
                    data.docs[0].treinado = true;
                    db.insert(data.docs[0], function(err, data) {
                        if (err) return console.log(err.message);
                        res.status(201).json(data);
                    });

                }

            });

        } else {

            dbOutros.get(id, function(err, data){

                if(err){
                    res.status(201).json(err);
                }else{
                    data.treinado = true;
                    db.insert(data, function(err, data) {
                        if (err) return console.log(err.message);
                        res.status(201).json(data);
                    });
                }
            });

        }
    }

};

module.exports = cloudant;