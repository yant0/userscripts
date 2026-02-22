// ==UserScript==
// @name         Silly Dark Mode
// @version      2026-02-22
// @match        *://*
// @description  idk
// @license      MIT
// @namespace    https://agha.work
// @author       yant0
// @downloadURL  https://github.com/yant0/userscripts/raw/refs/heads/main/scripts/silly-dark-mode.user.js
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