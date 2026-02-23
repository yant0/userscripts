// ==UserScript==
// @name         Whatsapp Blur
// @version      2026-02-23
// @match        *://web.whatsapp.com/
// @description  Blurs Whatsapp phone numbers
// @license      MIT
// @author       yant0
// @namespace    https://agha.work
// @homepageURL  https://github.com/yant0/userscripts
// @icon         https://static.whatsapp.net/rsrc.php/v4/yP/r/rYZqPCBaG70.png
// @grant        none
// @noframes
// ==/UserScript==

// NOTE : There might be other ways of doing this without a script.
// maybe you could use ublock styling to blur these instead.
// i might do that sometime in the future and update this

(function () {
    'use strict';

    const classesToBlur = [
        '._ahx_',
        '._ak8k',
        '._ak8o',
        '._am_2',
    ];

    let isBlurred = true;

    function applyBlur() {
        classesToBlur.forEach(className => {
            const elements = document.querySelectorAll(className);
            elements.forEach(element => {
                element.style.filter = 'blur(5px)';
            });
        });
    }

    function removeBlur() {
        classesToBlur.forEach(className => {
            const elements = document.querySelectorAll(className);
            elements.forEach(element => {
                element.style.filter = 'none';
            });
        });
    }

    function toggleBlur() {
        isBlurred = !isBlurred;
        if (isBlurred) {
            applyBlur();
        } else {
            removeBlur();
        }
    }

    window.addEventListener('keydown', (event) => {
        if (event.key === 'F10') {
            event.preventDefault();
            toggleBlur();
        }
    });

    const observer = new MutationObserver(function (mutations) {
        if (isBlurred) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'childList') {
                    applyBlur();
                }
            });
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
    applyBlur();

})();
