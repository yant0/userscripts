// ==UserScript==
// @name         HN Simple Tree
// @namespace    9f1eaf03-4c50-421e-866c-c2a9e185b8bc
// @version      2026-02-22
// @author       yant0
// @description  Simple tree for collapsing HN comments
// @license      MIT
// @match        *://news.ycombinator.com*
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

    document.addEventListener("click", function (e) {
        e.target.closest(".ind").parentElement.querySelector(".togg").click()
    })
})();