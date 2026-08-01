# Aritra Samui — Portfolio 

A fully responsive developer portfolio for Aritra Samui — final-year B.Tech CSE student,
AI/ML intern, and full-stack developer. The design presents the page as a "full stack":
every section is a labelled layer (Interface → Logic & ML → Data → Tools), mirroring how
the projects inside it are actually built.

**Live demo:** _add your deployed URL here_

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Interactive animations (scroll reveals, hero stat counters, layered hero diagram)
- ✅ Downloadable résumé (PDF)
- ✅ Filterable project gallery (All / Full Stack / Frontend / Data-ML)
- ✅ Contact form with EmailJS integration
- ✅ Real photo, real résumé, and a featured project screenshot
- ✅ Accessible: visible keyboard focus, semantic HTML, reduced-motion support

## Project structure

```
aritra-samui-portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   ├── aritra-photo.jpg
│   │   └── deployforge-screenshot.png
│   └── Aritra_Samui_CV.pdf
├── README.md
└── .gitignore
```

## Getting started

No build step is required — it's plain HTML/CSS/JS.

1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   cd aritra-samui-portfolio
   ```
2. Open `index.html` directly in a browser, or serve it locally:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```

## Content included

- **About**: career objective, education, and internship summary pulled from the résumé.
- **Skills**: grouped by layer — Interface, Logic & ML, Data, Tools & Core.
- **Projects**: Deployment Automation Framework (featured, with a real dashboard
  screenshot), ResumeCraft (React resume builder), and Laptop Price Prediction (ML).
- **Resume**: real résumé PDF (`assets/Aritra_Samui_CV.pdf`), plus a certifications and
  education panel underneath the download button.
- **Contact**: real email, phone, GitHub, and LinkedIn.

## Customizing

- **Content**: edit copy, projects, and skills directly in `index.html`.
- **Résumé**: replace `assets/Aritra_Samui_CV.pdf` with an updated version whenever the
  résumé changes (keep the same filename, or update the two `href`s in `index.html`).
- **Photos**: swap `assets/images/aritra-photo.jpg` or
  `assets/images/deployforge-screenshot.png` with new images of the same aspect ratio for
  a clean fit.
- **Colors & type**: all design tokens (colors, fonts, spacing) live at the top of
  `assets/css/style.css` under `:root`.

## Contact form (EmailJS)

The contact form is wired for [EmailJS](https://www.emailjs.com) but ships unconfigured —
submitting it will validate the fields and show a status message without sending real email
until you connect your own account:

1. Create a free EmailJS account and add an **Email Service** (e.g. Gmail).
2. Create an **Email Template** with the variables `from_name`, `reply_to`, and `message`.
3. Open `assets/js/script.js` and replace the three placeholder constants near the top of
   `initContactForm()`:
   ```js
   const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```
4. Deploy — the form will call `emailjs.send()` automatically once real keys are present.

## Deploying

This is a static site, so it works out of the box on:

- **GitHub Pages**: Settings → Pages → deploy from the `aritra-samui-portfolio` folder (or
  move its contents to the repo root).
- **Netlify / Vercel**: import the repo, set the base directory to
  `aritra-samui-portfolio`, no build command needed.

## License

Free to use and adapt.
