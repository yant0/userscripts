// ==UserScript==
// @name         Silly Dark Mode
// @namespace    http://tampermonkey.net/
// @version      2026-01-15
// @description  lmao
// @author       Yant0
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function () {
    const style = document.createElement('style');
    style.textContent = `*|*:not(img, video, picture, canvas, iframe, embed, a, link), div:has(>img, >video, >picture, >canvas, >iframe, >embed, >a, >link){
        background-color: #00000066 !important;
        color: white !important;*/}
        `
    document.head.appendChild(style);
})();