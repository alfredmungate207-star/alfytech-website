# AlfyTech Ads Portal

This repository contains a simple static portal for AlfyTech advertisements. It is intended as a minimal MVP that you can host with GitHub Pages.

What I added
- index.html — landing page with featured ads
- user.html — public product listing
- owner.html — owner dashboard with a demo login and the ability to add/delete ads (stored in localStorage)
- assets/css/style.css — minimal branding styles
- assets/js/app.js — client-side logic for rendering ads and demo owner flows
- data/ads.json — sample ad data

How to use
1. Enable GitHub Pages for this repository (Settings → Pages) and choose the `main` branch (root). After a minute the site will be available at `https://<your-username>.github.io/alfytech-website`.

Demo owner credentials (insecure)
- Email: owner@alfytech.com
- Password: alfytech123

IMPORTANT: this demo login is client-side only and insecure — credentials and admin logic live in JavaScript and in the repository. For a production site use a real authentication backend (Firebase Auth, Auth0, or GitHub OAuth) and a server to manage ads.

Next improvements (I can implement if you want)
- Replace demo auth with Firebase Authentication (I can scaffold config and rules; you'll need a Firebase account).
- Persist ads to a simple backend (Node/Express + tiny database) or use GitHub Issues as a storage backend.
- Add image uploads (via a storage provider) and improved UI/UX.

If you want, I will now publish these files to the repository's default branch (`main`). You already confirmed — I will push the files and then show the created file list and the GitHub Pages URL to preview.