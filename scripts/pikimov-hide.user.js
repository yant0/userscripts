// ==UserScript==
// @name         Pikimov Hide Info Card
// @version      2026-03-18
// @match        *://pikimov.com/app/*
// @description  Hides the info card
// @license      MIT
// @author       yant0
// @namespace    https://agha.work
// @homepageURL  https://github.com/yant0/userscripts
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pikimov.com
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    const s = document.createElement("style")
    s.textContent = `
    div#yoyo {
        display: none !important;
    }

    div#projectTop {
        grid-template-columns: 242px auto 242px !important;
    }
    `
    document.head.appendChild(s)
})();