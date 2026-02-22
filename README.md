# Bunch o userscripts

## Google Drive

### [Google Drive Pane Hider](./scripts/gdrive-hide.user.js) [<sup>*install*</sup>](./scripts/gdrive-hide.user.js?raw=true)
![gdrive-hide](https://github.com/user-attachments/assets/e8c4e436-806d-4d5f-9324-827090162cb0)

Hides left pane in Google Drive using the small..
"Hide side panel" on bottom right.

### [Google Drive Resize Sidebar](./scripts/gdrive-resize.user.js) [<sup>*install*</sup>](./scripts/gdrive-resize.user.js?raw=true)

the above script but better i guess lol.

## Hacker News

### [HN Simple Tree](./scripts/hn-simple-tree.user.js) [<sup>*install*</sup>](./scripts/hn-simple-tree.user.js?raw=true)

Simple tree for collapsing HN comments

## Whatsapp

### [Whatsapp Blur / Privacy](./scripts/wa-blur.user.js) [<sup>*install*</sup>](./scripts/wa-blur.user.js?raw=true)

Blurs names and phone numbers.
Blurs phone number in group description.
Toggle with `F10`.

### [Whatsapp Toggle Sidebar](./scripts/wa-sidebar.user.js) [<sup>*install*</sup>](./scripts/wa-sidebar.user.js?raw=true)
![wa-sidebar](https://github.com/user-attachments/assets/3629b478-4da8-43b3-84c2-a0e0511398f6)

Hides sidebar / messages bar.
Toggleable by double clicking sidebar icons.

## Youtube

### [Youtube Convenient Show less](./scripts/yt-showless.user.js) [<sup>*install*</sup>](./scripts/yt-showless.user.js?raw=true)

Moves Show Less on opened description, from bottom left to top right.

### [Youtube Audio and Caption Shortcut](./scripts/yt-shortcut.user.js) [<sup>*install*</sup>](./scripts/yt-shortcut.user.js?raw=true)

`ALT + A` For quickly changing audio tracks.
`ALT + C` For quickly changing audio captions language.

<details><summary>Notes</summary> No option to choose auto translation</details>

## General

### [Silly Dark Mode](./scripts/silly-dark-mode.user.js) [<sup>*install*</sup>](./scripts/silly-dark-mode.user.js?raw=true)

### [Class Picker (for my uni)](./scripts/classpicker.user.js) [<sup>*install*</sup>](./scripts/classpicker.user.js?raw=true)
Picks class together instead of adding one and refreshing each time.
Releases stress (for me and the server) and reduces unnecessary api calls.

# Userscripts Collection

- [Add Video Controls on Instagram](https://greasyfork.org/en/scripts/529664)
- [Dark Mode](https://greasyfork.org/en/scripts/472251)
- [Disable YouTube Music AutoPause](https://greasyfork.org/en/scripts/464888)
- [Discord No Title Bar](https://greasyfork.org/scripts/532904/)
- [HN Avatars in 396 bytes](https://greasyfork.org/scripts/441566)
- [Return YouTube Dislike](https://greasyfork.org/en/scripts/436115)
- [WhatsApp Right-Click Dropdown Menu](https://greasyfork.org/en/scripts/529665)
- [YouTube Music Exponential Volume](https://greasyfork.org/scripts/553411)
- [YouTube: always show a progress bar](https://gist.github.com/vogler/f0bba0a52a6fed61afab19245e72b5d4/raw/youtube-progress-always.tamper.js)

# Bookmarklets

Just select the script the script (including the `javascript:`) and drag to your browser's bookmark tab

<details><summary>Github Show Absolute Time</summary>

> javascript: document.querySelectorAll("div[class='react-directory-commit-age']").forEach(d => { d.style.display = "flex"; d.style.flexDirection = "column"; d.appendChild(document.createTextNode(/.*\d{4}/i.exec(d.firstChild.getAttribute("title"))))});
</details>
