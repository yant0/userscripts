// ==UserScript==
// @name         Youtube Convinient Showless
// @version      2026-02-23
// @match        *://www.youtube.com/watch?v=*
// @description  Place "showless" button to the top right of description.
// @license      MIT
// @author       yant0
// @namespace    https://agha.work
// @homepageURL  https://github.com/yant0/userscripts
// @icon         https://www.youtube.com/s/desktop/aaaab8bf/img/favicon_144x144.png
// @grant        none
// @noframes
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