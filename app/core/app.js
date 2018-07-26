(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'app.index',
        'app.login',
        'app.chat',
        'app.outros',
        'app.filtersC',
        'app.filtersT',
        'app.nav.header',
        'app.nav.menu',
        'app.nav.footer',
        'app.modal',
        'app.directives.divSize'
    ]);
})();
