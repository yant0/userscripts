// ==UserScript==
// @name         Google Drive Hide Left Pane
// @namespace    http://tampermonkey.net/
// @version      2026-01-15
// @description  Hides left pane in Google Drive using the small "Hide side panel" on bottom right.
// @author       Yant0
// @match        https://drive.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
    let hidden = false
    let left, btn
    const o = new MutationObserver(() => {
        left = document.querySelectorAll("div#drive-main-page > div > div:nth-child(n+4):nth-child(-n+5)")
        btn = document.querySelector("div[aria-label$='side panel']")
        if (left && btn) {
            btn.addEventListener("click", () => {
                hidden = !hidden
                if (hidden) left.forEach(e => { e.style.display = 'none' })
                else left.forEach(e => { e.style.display = 'block' })
            })
            o.disconnect()
        }
    })

    o.observe(document.body, { childList: true, subtree: true })
})()