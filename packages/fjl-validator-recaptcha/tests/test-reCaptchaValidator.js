import {
    reCaptchaIOValidator,
    toReCaptchaValidatorOptions,
    toReCaptchaTestValue,
    MISSING_INPUT_SECRET,
    MISSING_INPUT_RESPONSE
} from '../src/fjlReCaptchaValidator';

import {log, runHasPropTypes} from './utils';
import packageJson from '../package.json';
import puppeteer from 'puppeteer';

const {recaptchaKeys, mockServerPort} = packageJson,
    unhandledHandler = e => {
        console.error(e);
        process.exit(1);
    };

process.on('unhandledRejection', unhandledHandler);
process.on('uncaughtException', unhandledHandler);

jest.setTimeout(34000);

describe('#toReCaptchaTestValue', function () {
    runHasPropTypes([
        [String, 'secret', ['', false]],
        [String, 'remoteip', ['', false]],
        [String, 'response', ['', false]]
    ], toReCaptchaTestValue());
});

describe('#toReCaptchaValidatorOptions', function () {
    [{}, undefined].forEach(value => {
        runHasPropTypes([
            [Object, 'requestOptions', [{}, false]]
        ], toReCaptchaValidatorOptions(value));
    });
});

describe('#reCaptchaIOValidator', function () {
    const messagesTemplatesForTests = toReCaptchaValidatorOptions().messageTemplates,
        browserUserAgentString = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Ubuntu Chromium/60.0.3112.113 Chrome/60.0.3112.113 Safari/537.36';

    test('should return a "success" ({result: true, ...}) validation result when `secret` and ' +
        '`g-recaptcha-response` are well-formed', async (done) => {
        expect.assertions(3);
        const anchorName = '.rc-anchor-content',
            browser = await puppeteer.launch({args: ['--disable-setuid-sandbox', '--no-sandbox']}),
            page = await browser.newPage();
        await page.setUserAgent(browserUserAgentString);
        await page.goto(`http://localhost:${mockServerPort}/test-recaptcha-validator.html`);
        await page.waitFor(3000);
        const recaptchaFrame = page.mainFrame().childFrames()[0];
        await recaptchaFrame.waitFor(anchorName);
        const $anchor = await recaptchaFrame.$(anchorName);
        await $anchor.click();
        await page.waitFor(3000);
        page.on('console', log);
        log('Awaiting response');
        page.on('response', async res => {
            log('Received response');
            await res.json()
                .then(json => {
                    log('Received json', json);
                    expect(json.result).toEqual(true);
                    expect(Array.isArray(json.messages)).toEqual(true);
                    expect(!json.messages.length).toEqual(true);
                })
                .catch(log);
        });
        // await page.screenshot({path: '../.test-screenshots/example.png'});
        await page.click('input[type="submit"]');
        await page.waitFor(3000); // Allow time for 'response' event handler (on `page` object) to be triggered.
        // await page.screenshot({path: '../.test-screenshots/example2.png'});
        await browser.close();
        done();
    });

    test('should resolve with with validation result `result` set to `false` when `secret` and `response` are both missing', () => {
        expect.assertions(5);
        return reCaptchaIOValidator(null, {})
            .then(({result, value, messages}) => {
                expect(result).toEqual(false);
                expect(messages.length).toEqual(2);
                expect(messages[0]).toEqual(messagesTemplatesForTests[MISSING_INPUT_SECRET]);
                expect(messages[1]).toEqual(messagesTemplatesForTests[MISSING_INPUT_RESPONSE]);
                expect(value).toEqual(undefined);
            });
    });

    test('should resolve with with validation result `result` set to `false` when `response` is missing', () => {
        expect.assertions(4);
        return reCaptchaIOValidator(null, {secret: recaptchaKeys.secretKey})
            .then(({result, value, messages}) => {
                expect(result).toEqual(false);
                expect(messages.length).toEqual(1);
                expect(messages[0]).toEqual(messagesTemplatesForTests[MISSING_INPUT_RESPONSE]);
                expect(value).toEqual(undefined);
            });
    });

    test('should resolve with with validation result `result` set to `false` when `secret` is missing', () => {
        expect.assertions(4);
        return reCaptchaIOValidator(null, {response: 'hello-world'})
            .then(({result, value, messages}) => {
                expect(result).toEqual(false);
                expect(messages.length).toEqual(1);
                expect(messages[0]).toEqual(messagesTemplatesForTests[MISSING_INPUT_SECRET]);
                expect(value).toEqual(undefined);
            });
    });

});

// Utility function for dumping frames from `puppeteer`'s `mainFrame()` result
// dumpFrameTree(page.mainFrame(), '');
// function dumpFrameTree(frame, indent) {
//     console.log(indent + frame.url());
//     for (let child of frame.childFrames())
//         dumpFrameTree(child, indent + '  ');
// }

