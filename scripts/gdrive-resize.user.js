// ==UserScript==
// @name         GDrive Resize Sidebar
// @version      2026-02-23
// @match        *://drive.google.com/*
// @description  Makes the left panel on GDrive more resizeable
// @license      MIT
// @author       yant0
// @namespace    https://agha.work
// @homepageURL  https://github.com/yant0/userscripts
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @noframes
// ==/UserScript==

(function () {
	const o = new MutationObserver(() => {
		let sidebar = document.querySelector(":has(>div[data-target='sidebar']")
		if (sidebar) {
			// moves the "new" button inside div
			sidebar.insertBefore(sidebar.previousElementSibling, sidebar.firstChild)
			sidebar.style.minWidth = "12px"
			o.disconnect()
		}
	})
	o.observe(document.body, { subtree: true, childList: true })
})();

