require.config({

    deps: ['run'],

    shim: {
        'test-suite': {
            deps: ['fjl', 'mocha', 'chai', 'prepare']
        },
        mocha: {
            init: function () {
                this.mocha.setup('bdd');
                return this.mocha;
            }
        }
    },

    paths: {
        fjl: '../../dist/iife/fjl',
        chai:  '../../node_modules/chai/chai',
        mocha: '../../node_modules/mocha/mocha',
        'test-suite': 'test-suite'
    }

});

