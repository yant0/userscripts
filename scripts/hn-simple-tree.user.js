// ==UserScript==
// @name         HN Simple Tree
// @version      2026-02-22
// @match        *://news.ycombinator.com/item?id=*
// @description  Simple tree for collapsing HN comments
// @license      MIT
// @namespace    https://agha.work
// @author       yant0
// @downloadURL  https://github.com/yant0/userscripts/raw/refs/heads/main/scripts/hn-simple-tree.user.js
// @homepageURL  https://github.com/yant0/userscripts
// @icon         https://news.ycombinator.com/y18.svg
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    const s = document.createElement("style")
    s.textContent = `
    .ind {
        position: relative;
    &:hover::after {
        background-color: #4444;
    }
    &::after {
        content: "";
        background-color: #2222;
        position: absolute;
        width: 5px;
        right: 2px;
        height: 100%;
        top: 0;
    }}`

    document.head.appendChild(s)

    document.querySelectorAll(".ind").forEach(el => {
        el.addEventListener("click", () => { el.parentElement.querySelector(".togg").click() })
    })
})();