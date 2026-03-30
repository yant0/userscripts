// ==UserScript==
// @name         SoundCloud Redirect Current Song
// @version      2026-03-30
// @match        *://soundcloud.com/*
// @description  Automatically redirects IF current song player's is open. For toggleable version use https://greasyfork.org/scripts/419468
// @license      MIT
// @author       yant0
// @namespace    https://agha.work
// @homepageURL  https://github.com/yant0/userscripts
// @icon         https://a-v2.sndcdn.com/assets/images/sc-icons/ios-a62dfc8fe7.png
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    const sound_badge = document.querySelector("div.playbackSoundBadge")
    function current_song() { return sound_badge.querySelector("span[aria-hidden]") }
    function player() { return document.querySelector(".soundTitle span") }
    let song = current_song().innerText
    let prev_song = null

    const o = new MutationObserver(() => {
        prev_song = song; song = current_song().innerText // Update current & prev
        if (player().innerText === prev_song) { current_song().click() }
    })
    o.observe(sound_badge, { childList: true })
})();