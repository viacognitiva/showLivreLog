var	app = require('./api/express')();
var auth = require('./api/auth.js');
var cloudant = require('./api/cloudant.js');
var logconversation = require('./api/logconversation.js');
var validateRequest = require('./api/validateRequest.js');

app.post('/login', auth.login);
app.post('/api/validate', validateRequest.valida);

app.get('/api/conversation/chat', function(req, res) {
    cloudant.getChat(req, res);
});

app.get('/api/conversation/outros', function(req, res) {
    cloudant.getOutros(req, res);
});

app.get('/api/conversation/usuarios', function(req, res) {
    cloudant.getUsuarios(req, res);
});

app.get('/api/conversation/entities', function(req, res) {
    logconversation.getEntidades(req, res);
});

app.post('/api/conversation/entidade', function(req, res) {
    logconversation.treinaEntidade(req, res);
});

app.get('/api/conversation/entidade/value/:entity', function(req, res) {
    logconversation.getEntidadeValue(req, res);
});

app.post('/api/conversation/entidade/synonyms', function(req, res) {
    logconversation.criarSinonimo(req, res);
});

app.get('/api/conversation/intencoes', function(req, res) {
    logconversation.getIntencoes(req, res);
});

app.post('/api/conversation/intencao', function(req, res) {
    logconversation.treinaIntencao(req, res);
});

app.post('/api/conversation/treinamento/status',function (req, res) {
    cloudant.atualizaStatusTreinamento(req, res);
});

app.get('/api/conversation/getInfoData/:data', function(req, res) {
    cloudant.getInfoData(req, res);
});

app.get('/api/conversation/getInfoMes/:mes', function(req, res) {
    cloudant.getInfoMes(req, res);
});

app.get('/api/conversation/getInfoAno', function(req, res) {
    cloudant.getInfoAno(req, res);
});

app.get('/api/conversation/getInfoUser/:data', function(req, res) {
    cloudant.getInfoUser(req, res);
});

app.get('/api/conversation/getInfoAval', function(req, res) {
    cloudant.getInfoAval(req, res);
});

app.get('/api/conversation/getInfo', function(req, res) {
    cloudant.getInfo(req, res);
});

app.get('/api/conversation/getInfoChat/:id', function(req, res) {
    cloudant.getInfoChat(req, res);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});