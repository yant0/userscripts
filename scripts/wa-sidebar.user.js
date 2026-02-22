// ==UserScript==
// @name         Whatsapp Sidebar Toggle
// @version      2026-02-22
// @match        *://web.whatsapp.com/
// @description  Toggle whatsapp sidebar
// @license      MIT
// @namespace    https://agha.work
// @author       yant0
// @downloadURL  https://github.com/yant0/userscripts/raw/refs/heads/main/scripts/wa-sidebar.user.js
// @homepageURL  https://github.com/yant0/userscripts
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whatsapp.com
// @grant        GM_addStyle
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(`
        .xpilrb4, .x18pi947 {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .sidebar-hidden {
            max-width: 0% !important;
            overflow: hidden !important;
            border: none !important;
        }
    `);

    let prevLabel = "";

    document.addEventListener('click', function (e) {
        const btn = e.target.closest('button[data-navbar-item]');

        if (btn) {
            const currentLabel = btn.getAttribute("aria-label");
            const sidebar = document.querySelector('header~div:nth-of-type(3)>div');
            const chat = document.querySelector('div:has(>header>header)');

            if (sidebar || chat) {
                if (currentLabel === prevLabel) {
                    sidebar.classList.toggle('sidebar-hidden');
                    chat.classList.toggle('sidebar-hidden');
                } else {
                    sidebar.classList.remove('sidebar-hidden');
                    chat.classList.remove('sidebar-hidden');
                }
            }
            prevLabel = currentLabel;
        }
    });

})();