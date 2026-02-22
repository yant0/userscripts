// ==UserScript==
// @name         GDrive Resize Sidebar
// @version      2026-02-22
// @match        *://drive.google.com/*
// @description  Makes the left panel on GDrive more resizeable
// @license      MIT
// @namespace    https://agha.work
// @author       yant0
// @downloadURL  https://github.com/yant0/userscripts/raw/refs/heads/main/scripts/gdrive-resize.user.js
// @homepageURL  https://github.com/yant0/userscripts
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @noframes
// ==/UserScript==

(function () {
	const sidebar = document.querySelector(":has(>div[data-target='sidebar']")
	// moves the "new" button inside div
	sidebar.insertBefore(sidebar.previousElementSibling, sidebar.firstChild)
	sidebar.style.minWidth = 0
})();
