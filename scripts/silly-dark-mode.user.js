// ==UserScript==
// @name         Silly Dark Mode
// @version      2026-02-23
// @match        *://*
// @description  idk
// @license      MIT
// @author       yant0
// @namespace    https://agha.work
// @homepageURL  https://github.com/yant0/userscripts
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    const style = document.createElement('style');
    style.textContent = `*|*:not(img, video, picture, canvas, iframe, embed, a, link), div:has(>img, >video, >picture, >canvas, >iframe, >embed, >a, >link){
        background-color: #00000066 !important;
        color: white !important;*/}
        `
    document.head.appendChild(style);
})();