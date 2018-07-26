require('dotenv-safe').load();

const express	= require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const session = require('express-session');
const cookieParser = require('cookie-parser');

module.exports = function() {

    const app = express();
    app.set('port', process.env.PORT || 3000);

    //middleware
    app.use(express.static('./app'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    app.use(helmet());

    //app.disable('x-powered-by');
    app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'})); //troca powerd-by for uma informação falsa
    app.use(helmet.frameguard()); //bloqueia o uso de i-frame
    app.use(helmet.xssFilter()); //bloqueia o uso de XSS
    app.use(helmet.noSniff()); // não permite o carregamento de MIME types inválidos

    app.use(cookieParser());

    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: {}
    }))

	return app;
};