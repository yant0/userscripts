# Bunch o userscripts

## Google Drive

### [Google Drive Pane Hider](./scripts/gdrive-hide.user.js) [<sup>*install*</sup>](https://raw.githubusercontent.com/yant0/userscripts/refs/head/main/scripts/gdrive-hide.user.js)

Hides left pane in Google Drive using the small
"Hide side panel" on bottom right.

## Whatsapp

### [Whatsapp Blur / Privacy](./scripts/wa-blur.user.js) [<sup>*install*</sup>](https://raw.githubusercontent.com/yant0/userscripts/refs/head/main/scripts/wa-blur.user.js)

Blurs names and phone numbers
Blurs phone number in group description
Toggle with `F10`

### [Whatsapp Toggle Sidebar](./scripts/wa-sidebar.user.js) [<sup>*install*</sup>](https://raw.githubusercontent.com/yant0/userscripts/refs/head/main/scripts/wa-sidebar.user.js)

Hides sidebar / messages bar
Toggleable by double clicking sidebar icons

## Youtube

### [Youtube Convenient Show less](./scripts/yt-showless.user.js) [<sup>*install*</sup>](https://raw.githubusercontent.com/yant0/userscripts/refs/head/main/scripts/yt-showless.user.js)

Moves Show Less on opened description, from bottom left to top right

### [Youtube Audio and Caption Shortcut](./scripts/yt-shortcut.user.js) [<sup>*install*</sup>](https://raw.githubusercontent.com/yant0/userscripts/refs/head/main/scripts/yt-shortcut.user.js)

`ALT + A` For quickly changing audio tracks
`ALT + C` For quickly changing audio captions language

<details><summary>Notes</summary> No option to choose auto translation</details>

## General

### [Silly Dark Mode](./scripts/silly-dark-mode.user.js) [<sup>*install*</sup>](https://raw.githubusercontent.com/yant0/userscripts/refs/head/main/scripts/silly-dark-mode.user.js)

# Userscripts Collection

[Return YouTube Dislike](https://greasyfork.org/en/scripts/436115-return-youtube-dislike)
[Disable YouTube Music AutoPause](https://greasyfork.org/en/scripts/464888-disable-youtube-music-autopause)
[Dark Mode](https://greasyfork.org/en/scripts/472251-dark-mode)

# Bookmarklets

Just select the script the script (including the `javascript:`) and drag to your browser's bookmark tab

<details><summary>Github Show Absolute Time</summary>

> javascript: document.querySelectorAll("div[class='react-directory-commit-age']").forEach(d => { d.style.display = "flex"; d.style.flexDirection = "column"; d.appendChild(document.createTextNode(/.*\d{4}/i.exec(d.firstChild.getAttribute("title"))))});
</details>