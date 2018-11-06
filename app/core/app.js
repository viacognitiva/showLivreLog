(function () {
    'use strict';

    angular.module('app', [
        'indexedDB',
        'ui.router',
        'app.index',
        'app.login',
        'app.chat',
        'app.user',
        'app.outros',
        'app.reports',
        'app.intents',
        'app.aval',
        'app.filtersC',
        'app.filtersT',
        'app.nav.header',
        'app.nav.menu',
        'app.nav.footer',
        'app.modal',
        'app.modal.det',
        'app.directives.divSize',
        'app.directives.angularFlot',
        'app.directives.myTextInput',
        'app.directives.modeloTabela',
        'app.module.chart',
        'app.localService'        
    ]);
})();
