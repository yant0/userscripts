// ==UserScript==
// @name         Youtube Audio and Caption Shortcut
// @version      2026-02-23
// @match        *://www.youtube.com/watch?v=*
// @description  Shortcut using ALT + A, ALT + C
// @license      MIT
// @author       yant0
// @namespace    https://agha.work
// @homepageURL  https://github.com/yant0/userscripts
// @icon         https://www.youtube.com/s/desktop/aaaab8bf/img/favicon_144x144.png
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    // 1 select query the subtitle & audio list
    // 2 attach shortcut
    // 3 ???
    // 4 profit

    document.addEventListener("keydown", handleShortcut);
    const btn = document.querySelector("button.ytp-settings-button"); btn.click();
    const btns = document.querySelectorAll("div.ytp-settings-menu div.ytp-menuitem-label span"); btn.click()
    let caption = null
    let audio = null

    function getNext() {
        let el = document.querySelector("div[aria-checked='true']")
        let elNext = el.nextElementSibling
        if (elNext !== null && elNext.textContent !== "Auto-translate" && elNext.textContent !== "Auto-dubbed") {
            return elNext
        } else {
            if (elNext?.nextElementSibling) return elNext.nextElementSibling
            return el.parentElement.firstChild
        }
    }

    function handleShortcut(event) {
        if (event.altKey && event.code === "KeyC") {
            fetchOptions()
            if (caption) {
                caption.click()
                getNext().click()
                btn.click()
                btn.click()
            }
        }
        if (event.altKey && event.code === "KeyA") {
            fetchOptions();
            if (audio) {
                audio.click()
                getNext().click()
                btn.click()
                btn.click()
            }
        }
    }

    function fetchOptions() {
        for (const button of btns) {
            if (button.innerHTML === "Audio track") audio = button
            if (button.innerHTML === "Subtitles/CC") caption = button
        }
    }
})();