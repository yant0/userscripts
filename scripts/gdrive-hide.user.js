// ==UserScript==
// @name         GDrive Hide Left Panel
// @version      2026-02-23
// @match        *://drive.google.com/*
// @description  Hides left panel on GDrive when clicking the "Hide side panel" on bottom right
// @license      MIT
// @author       yant0
// @namespace    https://agha.work
// @homepageURL  https://github.com/yant0/userscripts
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @noframes
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