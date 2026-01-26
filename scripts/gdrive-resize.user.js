// ==UserScript==
// @name         Google Drive Resize Sidebar
// @namespace    yant0/userscripts
// @version      2026-01-26
// @description  Makes the left panel on Google Drive resizable
// @author		 yant0
// @match        *://drive.google.com/drive/*
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    const sidebar = document.querySelector(":has(>div[data-target='sidebar']")
	// moves the "new" button inside div
	sidebar.insertBefore(sidebar.previousElementSibling, sidebar.firstChild)
	sidebar.style.minWidth = 0
})();
