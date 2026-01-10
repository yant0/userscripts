// ==UserScript==
// @name         Whatsapp Sidebar Toggle
// @namespace    http://tampermonkey.net/
// @version      2026-01-06
// @description  Toggle WhatsApp Sidebar
// @author       Yant0
// @match        https://web.whatsapp.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whatsapp.com
// @grant        GM_addStyle
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
            const sidebar = document.querySelector('.xpilrb4');
            const chat = document.querySelector('.x18pi947');

            if (sidebar) {
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