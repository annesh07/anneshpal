# Annesh Pal: personal website

Plain HTML and CSS, served by GitHub Pages. No build step: edit a page, commit, and it goes live.

| Page | File |
|---|---|
| Home (bio, research interests, recent news) | `index.html` |
| Publications | `publications.html` |
| Software | `software.html` |
| Scientific communication (slides and posters) | `communication.html` |

Shared styling is in `assets/style.css` and small interactions (theme switch, mobile menu, copy buttons) in `assets/site.js`.
Fonts (Source Serif 4 and Source Sans 3) are self-hosted in `assets/fonts/`.

**Adding a publication:** in `publications.html`, copy an `<article class="entry">` block and edit it.
For a new year, copy the whole `<section class="year-group">` block and put it above the older one.

**Your CV:** upload it as `files/Annesh_Pal_CV.pdf`. The CV buttons on the Home page and in the footer link there.
To use a different file name or a link hosted elsewhere, search for `Annesh_Pal_CV.pdf` in the HTML files and replace it.

**Adding a talk or poster:** put the PDF in `files/`, then follow the instructions in the comment near the top of
`communication.html`. The Talks/Posters filter counts and the "View" preview work automatically.

**Adding news:** in `index.html`, add an `<li>` at the top of the "Recent" list.
