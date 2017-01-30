/**
 * Created by elyde on 1/30/2017.
 */
window.document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    const set1Elm =  document.querySelector('#set-1'),
        graphicsCtx = set1Elm.getContext('2d');


    // Z = Math.exp(Z, 2) + C

    Object.assign(graphicsCtx, {
        fillStyle:   'green'
    });

});
