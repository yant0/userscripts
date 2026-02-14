// ==UserScript==
// @name         Youtube Convenient Show less
// @namespace    http://tampermonkey.net/
// @version      2026-02-15
// @description  Place "showless" button to the top-right of description, makes 
// @author       yant0
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/aaaab8bf/img/favicon_144x144.png
// @grant        none
// ==/UserScript==

(function () {
    const interval = setInterval(() => {
        const desc = document.getElementById("ytd-watch-info-text");
        const showless = document.querySelector("#collapse:not([hidden])");
        if (desc && showless) {
            showless.style.margin = "0";
            desc.append(showless);
            clearInterval(interval);
        }
    }, 300);
})();