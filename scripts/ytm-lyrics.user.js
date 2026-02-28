// ==UserScript==
// @name         YTM Lyrics
// @version      2026-03-01 
// @match        *://music.youtube.com/*
// @description  Get additional lyrics from lrclib
// @license      MIT
// @author       yant0
// @namespace    https://agha.work
// @homepage     https://github.com/yant0/userscripts
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    // [ ] strip "official video/audio" and artist name
    // [ ] deobfuscate regex lmao
    // [ ] highlight current line

    let media, player_tab, lyric_tab, lyric_container, song, song_title, song_artist, song_album, song_length, last_song_fetched, custom_lyric
    let sync = []
    const s = document.createElement("style")
    s.textContent = `
        lyric {
            &, * {
                padding-block: 1.2rem;
                margin-block: 1.2rem;
            }
            .synced {
                cursor: pointer;
                color: #fff3;
            }
            .highlighted {
                color: white !important;
                padding-block: 2rem;
                transform-origin: left;
                transition: all 0.5s ease-out;
            }
        }`
    document.head.appendChild(s)

    const i = setInterval(() => {
        player_tab = document.querySelector(".middle-controls").firstElementChild.nextElementSibling
        lyric_tab = document.querySelector("#tabsContent >:nth-child(3)")
        if (player_tab !== null && lyric_tab !== null) { clearInterval(i); init() }
    }, 500);

    function init() {
        enableTab(lyric_tab)
        custom_lyric = document.querySelector("lyric")
        lyric_tab.onclick = function () {
            if (!custom_lyric) { fetch_lyric() }
            else if (custom_lyric.getAttribute("song") !== song_title) { fetch_lyric() }
        }
        const tab_observer = new MutationObserver(() => { enableTab(lyric_tab) })
        tab_observer.observe(lyric_tab, { attributes: true })

        const song_observer = new MutationObserver(() => {
            custom_lyric = document.querySelector("lyric")
            if (custom_lyric) {
                custom_lyric.remove()
            }
            if (lyric_tab.getAttribute("aria-selected") === "true") { fetch_lyric() }
        })
        song_observer.observe(player_tab, { childList: true, subtree: true })
    }

    function fetch_lyric() {
        last_song_fetched = song_title
        sync = []
        getSongDetails()
        if (song_title === last_song_fetched) return;
        fetch(`https://lrclib.net/api/get?`
            + `${song_artist !== null ? `&artist_name=${song_artist}` : ""}`
            + `${song_album !== null ? `&album_name=${song_album}` : ""}`
            + `&track_name=${song_title}`
            + `&duration=${song_length}`)
            .then(response => {
                if (response.ok) { return response.json() }
                throw new Error("Lyric not found");
            })
            .then(lrclib => {
                console.log(lrclib);
                setLyrics(lrclib)
            })
            .catch(error => {
                console.log(error)
            })
    }

    function toSeconds(song_length) {
        const arr = song_length.match(/\d+/g)
        return parseFloat(arr[0] * 60) + parseFloat(arr[1]) + (arr[2] ? parseFloat("0." + arr[2]) : 0)
    }

    function getSongDetails() {
        song = [...player_tab.querySelectorAll("yt-formatted-string")].map(el => el.textContent.split("•"));
        if (song.length <= 1) { return }
        console.log(song)
        song_title = song[0][0].trim()
        song_artist = song[1][0].includes("views") ? null : song[1][0].trim()
        song_album = song[1][1].includes("views") ? null : song[1][1].trim()
        song_length = toSeconds(document.querySelector("ytmusic-player-queue-item[selected] .duration").textContent.trim())
    }

    function enableTab(tab) {
        tab.removeAttribute("aria-disabled")
        tab.removeAttribute("disabled")
    }

    function setLyrics(lrclib) {
        const i = setInterval(() => { // this looks fucked
            console.log(lyric_container);
            setLyricContainer()
            if (lyric_container !== null && lyric_container !== undefined) {
                [...lyric_container.children].forEach(e => { e.style.display = "none" });
                if (lrclib.syncedLyrics) { lyric_container.insertAdjacentElement("afterbegin", formatLyrics(true)) }
                else if (lrclib.plainLyrics) { lyric_container.insertAdjacentElement("afterbegin", formatLyrics(false)) }
                clearInterval(i)
            }
        }, 1000);

        function formatLyrics(synced) {
            media = document.querySelector("video")
            const lyric = document.createElement("lyric")
            if (synced) {
                // i need help fixing this regex, the fourth capture should return how many newlines. "/n/n"
                // or this shit could be parsed line by line
                const lyric_meta = [...lrclib.syncedLyrics.matchAll(/\[0?([\d:.]+).+?((?=\s).+?(?=\[)| )/gs)]
                for (const [, time, line] of lyric_meta) {

                    const lyric_element = document.createElement("div")
                    lyric_element.onclick = () => { media.currentTime = toSeconds(time) }
                    lyric_element.classList.add("synced")
                    lyric_element.id = time
                    sync.push(toSeconds(time))

                    lyric_element.textContent = line.replace(/\n/g, "").trim()
                    lyric.appendChild(lyric_element)
                    if (line.length <= 3 && /^\s(?:\n)*$/g.test(line)) {
                        lyric_element.innerHTML = "<br>"
                    } else if (/(?:\n){2,}/g.test(line)) {
                        const br = document.createElement("br")
                        lyric.appendChild(br)
                    }
                }
            } else {
                lyric.innerHTML = lrclib.plainLyrics.split("\n").join("<br>")
            }
            lyric.setAttribute("song", song_title)
            lyric.style.fontSize = "2rem"
            return lyric
        }
    }

    function lyricHighlight() {
        const time_query = document.querySelector(".time-info").childNodes[0]
        let time = time_query.textContent.match(/([\d:]+)/)[1]
        let curr
        let highlight
        const o = new MutationObserver(() => {
            if (song_title === last_song_fetched || sync.length < 1) {
                console.log("disconeccetd");
                o.disconnect()
            }
            time = time_query.textContent.match(/([\d:]+)/)[1]
            console.log(time);
            for (now in sync) {
                if (time >= sync[now] || time < curr) {
                    if (highlight) highlight.classList.remove("highlighted")
                    highlight = document.getElementById(sync[now])
                    highlight.classList.add("highlighted")
                    curr = sync[now + 1]
                }
            }
        })
        o.observe(time_query, { characterData: true })
    }

    function setLyricContainer() {
        let og_lyrics = document.querySelector("ytmusic-section-list-renderer[page-type$=TRACK_LYRICS]")
        if (og_lyrics && og_lyrics.style.display !== "none") {
            lyric_container = og_lyrics
        } else {
            lyric_container = document.querySelector("ytmusic-tab-renderer > ytmusic-message-renderer")
        }
    }

})();