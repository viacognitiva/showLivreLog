(function () {
    'use strict';
    angular.module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$indexedDBProvider'];

    function config($stateProvider, $urlRouterProvider, $indexedDBProvider) {

        $urlRouterProvider.when('', '/report/list');
        $urlRouterProvider.when('/', '/report/list');
        $urlRouterProvider.when('/chat', '/chat/list');
        $urlRouterProvider.when('/user', '/user/list');
        $urlRouterProvider.when('/outros', '/outros/list');
        $urlRouterProvider.when('/report', '/report/list');
        $urlRouterProvider.when('/intent', '/intent/list');
        $urlRouterProvider.when('/aval', '/aval/list');

        $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'core/login/login.html',
            controller: 'loginController',
            controllerAs: 'LC',
            restrictions: {
                ensureAuthenticated: false
            }
        })
        .state('root', {
            abstract: true,
            url: '/',
            data: {
                title: 'Home',
                breadcrumb: 'Home'
            },
            views: {
                'header': {
                    templateUrl: 'core/navigation/headerView.html',
                    controller: 'headerController',
                    controllerAs: 'HC'
                },
                'menu': {
                    templateUrl: 'core/navigation/menuView.html',
                    controller: 'menuController',
                    controllerAs: 'MC'
                },
                'breadcrumbs': {
                    templateUrl: 'core/navigation/breadcrumbsView.html',
                    controller: '',
                    controllerAs: ''
                },
                'content': {
                    template: 'Choose option from menu...'
                },
                'footer': {
                    templateUrl: 'core/navigation/footerView.html',
                    controller: 'footerController',
                    controllerAs: 'FC'
                }
            }
        })
        .state('root.chat', {
            abstract: true,
            url: 'chat',
            data: {
                title: 'Conversas',
                breadcrumb: 'Conversas'
            }
        })
        .state('root.chat.list', {
            url: '/list',
            restrictions: {
                ensureAuthenticated: true
            },
            data: {
                title: 'Conversas',
                breadcrumb: 'Conversas',
                caminho: '/chat/list'
            },
            views: {
                'content@': {
                    templateUrl: 'core/chat/chatuser.html',
                    controller: 'chatController',
                    controllerAs: 'CC'
                }
            }
        })
        .state('root.user', {
            abstract: true,
            url: 'user',
            data: {
                title: 'Usuários',
                breadcrumb: 'Usuários'
            }
        })
        .state('root.user.list', {
            url: '/list',
            restrictions: {
                ensureAuthenticated: true
            },
            data: {
                title: 'Usuários',
                breadcrumb: 'Usuários',
                caminho: '/user/list'
            },
            views: {
                'content@': {
                    templateUrl: 'core/user/user.html',
                    controller: 'userController',
                    controllerAs: 'UC'
                }
            }
        })
        .state('root.outros', {
            abstract: true,
            url: 'outros',
            data: {
                title: 'Outros',
                breadcrumb: 'Outros'
            }
        })
        .state('root.outros.list', {
            url: '/list',
            restrictions: {
                ensureAuthenticated: true
            },
            data: {
                title: 'Outros',
                breadcrumb: 'Outros',
                caminho: '/outros/list'
            },
            views: {
                'content@': {
                    templateUrl: 'core/outros/outros.html',
                    controller: 'outrosController',
                    controllerAs: 'OC'
                }
            }
        })
        .state('root.report', {
            abstract: true,
            url: 'report',
            data: {
                title: 'Relatórios',
                breadcrumb: 'Relatórios'
            }
        })
        .state('root.report.list', {
            url: '/list',
            restrictions: {
                ensureAuthenticated: true
            },
            data: {
                title: 'Relatórios',
                breadcrumb: 'Relatórios',
                caminho: '/report/list'
            },
            views: {
                'content@': {
                    templateUrl: 'core/reports/report.html',
                    controller: 'reportController',
                    controllerAs: 'RC'
                }
            }
        })
        .state('root.intent', {
                abstract: true,
                url: 'intent',
                data: {
                    title: 'Relatórios',
                    breadcrumb: 'Relatórios'
                }
            })
            .state('root.intent.list', {
                url: '/list',
                restrictions: {
                    ensureAuthenticated: true
                },
                data: {
                    title: 'Relatórios',
                    breadcrumb: 'Relatórios',
                    caminho: '/intent/list'
                },
                views: {
                    'content@': {
                        templateUrl: 'core/reports/intents.html',
                        controller: 'intentController',
                        controllerAs: 'IC'
                    }
                }
            })
        .state('root.aval', {
            abstract: true,
            url: 'aval',
            data: {
                title: 'Avaliações',
                breadcrumb: 'Avaliações'
            }
        })
        .state('root.aval.list', {
            url: '/list',
            restrictions: {
                ensureAuthenticated: true
            },
            data: {
                title: 'Avaliações',
                breadcrumb: 'Avaliações',
                caminho: '/aval/list'
            },
            views: {
                'content@': {
                    templateUrl: 'core/aval/aval.html',
                    controller: 'avalController',
                    controllerAs: 'AC'
                }
            }
        })
        .state('root.tec', {
            abstract: true,
            url: 'tec',
            data: {
                title: 'Intenção/Entidade',
                breadcrumb: 'Intenção/Entidade'
            }
        })
        .state('root.tec.list', {
            url: '/list',
            restrictions: {
                ensureAuthenticated: true
            },
            data: {
                title: 'Intenção/Entidade',
                breadcrumb: 'Intenção/Entidade',
                caminho: '/tec/list'
            },
            views: {
                'content@': {
                    templateUrl: 'core/chat/chattec.html',
                    controller: 'chatController',
                    controllerAs: 'CC'
                }
            }
        })

        $indexedDBProvider
        .connection('monitora')
        .upgradeDatabase(1, function (event, db, tx) {
            var objStore = db.createObjectStore('user', {
                keyPath: 'id'
            });
            objStore.createIndex('id_idx', 'chatId', {
                unique: false
            });
            objStore.createIndex('data_idx', 'data', {
                unique: false
            });
        })
        .upgradeDatabase(2, function (event, db, tx) {
            var objStore = db.createObjectStore('chat', {
                keyPath: 'id'
            });
            objStore.createIndex('id_idx', 'id', {
                unique: false
            });
            objStore.createIndex('data_idx', 'data', {
                unique: false
            });
        })
    };

    angular.module('app').run(run);
    run.$inject = ['$rootScope','$location','$http','$sessionStorage'];

    function run($rootScope, $location, $http, $sessionStorage) {

        $rootScope.$on("$stateChangeStart", function(evt, to, toP, from, fromP) {

            if(to.restrictions.ensureAuthenticated) {

                if (!$sessionStorage.token) {
                    $location.path('/login');
                }else{
                    var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}}
                    var data = {
                        token: $sessionStorage.token
                    };

                    $http.post('/api/validate',JSON.stringify(data),config).then(
                        function(response) {
                            $location.path(to.name);
                        },
                        function(error){
                            console.log('Erro:' + JSON.stringify(error.data.message));
                            $location.path('/login');
                        }
                    );
                }

            } else {
                $location.path(to.name);
            }

        });

        /*
        $rootScope.$on("$stateChangeStart", function(evt, to, toP, from, fromP) { console.log("Start:   " + message(to, toP, from, fromP)); });
        $rootScope.$on("$stateChangeSuccess", function(evt, to, toP, from, fromP) { console.log("Success: " + message(to, toP, from, fromP)); });
        $rootScope.$on("$stateChangeError", function(evt, to, toP, from, fromP, err) { console.log("Error:   " + message(to, toP, from, fromP), err); });
        */

    };

    function message(to, toP, from, fromP) { return from.name  + angular.toJson(fromP) + " -> " + to.name + angular.toJson(toP); };

})();