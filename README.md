# Mansa Colley School — Interim Static Site

A fast, static website for Mansa Colley School (Brikama, The Gambia), built to go live immediately on Vercel while a full WordPress CMS version is developed separately for later migration.

No build step, no framework, no database — 9 plain HTML pages sharing CSS and a small JS file.

## Structure

```
index.html       Home
about.html       About
schools.html     Our Schools (Nursery / Primary / Upper Basic / Senior Secondary)
excellence.html  Academic Excellence
news.html        News & Events          ← placeholder content
staff.html       Our Staff              ← placeholder content
admission.html   Admissions (form)
donors.html      Donors & Partners (form)
contact.html     Contact (form)
css/             base, nav, components, layout, animations
js/site.js       mobile menu, scroll-reveal, active nav highlight, Formspree AJAX
vercel.json      clean URLs (e.g. /about instead of /about.html)
```

## Editing content

Every page is plain HTML — open the file, edit the text directly. Nav and footer markup is duplicated on every page (no shared partial), so if you change the nav/footer, repeat the change across all 9 files.

Content marked `<!-- PLACEHOLDER: replace before go-live -->` in `news.html` and `staff.html` is sample data standing in for the real thing — swap it out whenever real news items and staff bios are ready.

## Setting up the contact forms (Formspree)

Three forms need a working Formspree endpoint: `admission.html`, `donors.html`, `contact.html` — plus a "Subscribe" newsletter form at the bottom of every page.

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form and copy its endpoint, e.g. `https://formspree.io/f/abcd1234`.
3. In every `.html` file, find and replace:
   ```
   https://formspree.io/f/YOUR_FORM_ID
   ```
   with your real endpoint. You can use one form ID for everything, or create separate Formspree forms per page if you want submissions split up (e.g. one for admissions enquiries, one for donor enquiries, one for general contact/newsletter).
4. Search the whole project to make sure none were missed:
   ```
   grep -rn "YOUR_FORM_ID" .
   ```

Forms submit via JavaScript (`js/site.js`) and show an inline "Thanks — we'll be in touch" message without leaving the page. If JavaScript is disabled, they still work as plain HTML form posts (Formspree redirects to a default thank-you page in that case).

## Local preview

```
npx serve .
```

Then open the printed `localhost` URL and click through the pages.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, import the repository as a new project — no build command or output directory needed, it's static.
3. Every future `git push` to the main branch will auto-deploy.

`vercel.json` enables clean URLs, so `/about` works without the `.html` extension (and `/about.html` redirects to `/about`).

## Migrating to WordPress later

This site is intentionally simple to make that migration easy: each `.html` file maps 1:1 to a future WordPress page/template, and all copy is already in a mechanically-portable, well-structured form. No CMS, login, or database logic needs to be torn out — there isn't any.
