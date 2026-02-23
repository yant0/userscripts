// ==UserScript==
// @name         Uni Class Picker
// @version      2026-02-23
// @match        *://*.ac.id/registration/courses
// @description  Picks class together instead of adding one and refreshing each time
// @license      MIT
// @author       yant0
// @namespace    https://agha.work
// @homepageURL  https://github.com/yant0/userscripts
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';
    const btn = document.createElement("button")
    let tabel

    function start() {
        if (!(document.querySelector("button[class*=cihuy]"))) {
            btn.type = "button"
            btn.style.margin = "10px"
            btn.className = "btn btn-outline-primary btn-sm btn-round has-ripple cihuy"
            btn.innerHTML = "Tambah matkul"
            btn.addEventListener("click", send)
            tabel.parentElement.insertBefore(btn, tabel.nextElementSibling);
        }
        const tambah = document.querySelectorAll("button[id*=subject-add]")
        tambah.forEach((tombol) => {
            if (tombol.parentElement.querySelector("input.ceklis")) return;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "btn btn-outline-success btn-sm ceklis"
            checkbox.style.margin = "10px";
            checkbox.style.accentColor = "#71b484";
            checkbox.style.transform = "scale(1.5)";
            tombol.parentElement.appendChild(checkbox);
        });
    }

    function send() {
        const checkedBoxes = document.querySelectorAll("input.ceklis:checked");

        if (checkedBoxes.length === 0) {
            alert("Pilih Matkul Dulu");
            return;
        }

        if (confirm(`Tambahkan ${checkedBoxes.length} Matkul?`)) {
            checkedBoxes.forEach((chk) => {
                const tombol = chk.parentElement.querySelector("button[id*='subject-add']");
                if (tombol) tombol.click();
            });
        }
    }

    const observer = new MutationObserver(() => {
        start();
    });

    const o = new MutationObserver(() => {
        tabel = document.querySelector("div[class*='table-']:has(button[id*='subject-add'])")
        if (tabel) {
            observer.observe(tabel, { childList: true, subtree: true });
            o.disconnect()
        }
    })
    o.observe(document.body, { childList: true, subtree: true })
})();