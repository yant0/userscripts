// ==UserScript==
// @name         Silly Dark Mode
// @namespace    http://tampermonkey.net/
// @version      2026-01-10
// @description  lmao
// @author       Yant0
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function () {
    const style = document.createElement('style');
    style.textContent = `*|*{
        background-color: #00000066 !important;
        color: white !important;*/}
        `
    document.head.appendChild(style);
})();