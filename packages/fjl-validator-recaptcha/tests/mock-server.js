/**
 * @description Server entry-point file.
 * @script
 * @standalone
 */

// If 'NODE_ENV' not set, set it
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}

const isDevEnv = process.env.NODE_ENV.toLowerCase().indexOf('dev') === 0;

// If dev mode load local environment config
if (isDevEnv) {
    require('dotenv').config();
}

// Preliminaries
const {appSessionSecret} = process.env,
    {mockServerPort: port} = require('../package'),
    express = require('express'),
    helmet = require('helmet'),
    session = require('express-session'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    router = new express.Router(),
    app = express();

const {log, jsonClone} = require('fjl');

const {reCaptchaIOValidator} = require('../dist/cjs/fjlReCaptchaValidator');

// Security features
// @see https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(helmet());

app.use(express.static(__dirname + '/fixtures'));

// Setup basic session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: appSessionSecret,
    expiration: 2700000
}));

// Use compression where possible
app.use(compression());

// Use form body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// If is development env enable CORS
if (isDevEnv) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
}

router.get('/', (req, res) => {
    return res.end('Health check page.');
});

router.post('/test-recaptcha-validator', (req, res) => {
    res.type('application/json');
    return reCaptchaIOValidator(null, {
        secret: '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe',
        response: req.body['g-recaptcha-response']
    })
        .then(
            result => res.json(result),
            (result, errCodes) => log(jsonClone(result), errCodes)
        );
});

// Set routes and route handlers to use
app.use(router);

// Start app
app.listen(port, () => {
    console.log('\nListening on port:' + port);
});
