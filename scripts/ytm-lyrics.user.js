// ==UserScript==
// @name         YTM Lyrics
// @version      2026-02-28 
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

    // [ ] better lyrictab query
    // [ ] strip "official video/audio" and artist name
    // [ ] deobfuscate regex lmao
    // [ ] style properly
    // [ ] highlight current line
    // [ ] refacotr

    let media, player_tab, lyric_tab, lyric_container, song, song_title, song_artist, song_album, song_length, last_song_fetched
    let sync = []
    const s = document.createElement("style")
    s.textContent = `
        lyrics * {
            cursor: pointer;
        }
        .highlighted {
            padding-block: 1rem;
            transform-origin: left;
            background-color: #2229;
            transition: all 0.5s ease-out;
        }`
    document.head.appendChild(s)

    const i = setInterval(() => {
        player_tab = document.querySelector(".middle-controls").firstElementChild.nextElementSibling
        lyric_tab = document.querySelector("#tabsContent >:nth-child(3)")
        if (player_tab !== null && lyric_tab !== null) { clearInterval(i); init() }
    }, 500);

    function init() {
        enableTab(lyric_tab)
        const i = setInterval(() => {
            lyric_container = document.querySelector("ytmusic-tab-renderer > ytmusic-message-renderer")
            if (lyric_container !== null) {
                lyric_tab.onclick = (function () {
                    if (lyric_container.lastChild.nodeName !== "LYRIC") { fetch_lyric() }
                    else if (lyric_container.lastChild.getAttribute("song") !== song_title) { fetch_lyric() }
                })()
                clearInterval(i)
            }
        }, 500);
        const tab_observer = new MutationObserver(() => { enableTab(lyric_tab) })
        tab_observer.observe(lyric_tab, { attributes: true })

        const song_observer = new MutationObserver(() => {
            if (lyric_container.lastChild.nodeName === "LYRIC") {
                lyric_container.lastElementChild.remove()
            }
            if (lyric_tab.getAttribute("aria-selected")) fetch_lyric();
            media = document.querySelector("video")
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
            .then(r => r.json()
                .then(lyrics => {
                    console.log(lyrics);
                    setLyrics(lyrics)
                }))
    }

    function toSeconds(song_length) {
        const arr = song_length.match(/\d+/g)
        return parseFloat(arr[0] * 60) + parseFloat(arr[1]) + (arr[2] ? parseFloat("0." + arr[2]) : 0)
    }

    function getSongDetails() {
        song = [...player_tab.querySelectorAll("yt-formatted-string")].map(el => el.textContent.split("•"));
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

    function setLyrics(lyrics) {
        [...lyric_container.children].forEach(e => { e.style.display = "none" });
        if (lyrics.syncedLyrics) { lyric_container.appendChild(formatLyrics(true)) }
        else if (lyrics.plainLyrics) { lyric_container.appendChild(formatLyrics(false)) }

        function formatLyrics(synced) {
            const lyric = document.createElement("lyric")
            if (synced) {
                // i need help fixing this regex, the fourth capture should return how many newlines. "/n/n"
                const lyric_meta = [...lyrics.syncedLyrics.matchAll(/\[0?([\d:.]+).+?((?=\s).+?(?=\[)| )/gs)]
                for (const [, time, line] of lyric_meta) {
                    sync.push(time)
                    const lyric_element = document.createElement("div")
                    lyric_element.onclick = () => { document.querySelector('video').currentTime = toSeconds(time) }
                    lyric_element.id = time

                    // this so fucked lol
                    if (line.length <= 3 && /^\s(?:\n)*$/g.test(line)) {
                        lyric_element.innerHTML = "<br>"
                        lyric.appendChild(lyric_element)
                    } else if (/(?:\n){2,}/g.test(line)) { // needs to account for CARRIAGE RETURN 
                        const br = document.createElement("br")
                        lyric_element.textContent = line.replace(/\n/g, "")
                        lyric.appendChild(lyric_element)
                        lyric.appendChild(br)
                    } else {
                        lyric_element.textContent = line.replace(/\n/g, "")
                        lyric.appendChild(lyric_element)
                    }
                }
            } else {
                lyric.innerHTML = lyrics.plainLyrics.split("\n").join("<br>")
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

})();