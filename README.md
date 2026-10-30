# Level Up Academy Website

A responsive, single-page static website for Level Up Academy (Science & Physics, Classes 8–12, Gujarat). All content is taken from the academy's own materials: test papers, evaluation reports, study material and fee policy. It uses no build step or dependencies.

## Files

- `index.html`: page content (hero, classes, approach, study material, faculty, FAQ, enquiry form)
- `styles.css`: styling and responsive layout
- `script.js`: mobile menu, class filters, scroll reveal, form validation
- `assets/favicon.svg`: logo / favicon

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Before going live, add what is still missing

- Contact details in the `#contact` section: only "Gujarat, India" is listed. Add the centre address, phone or WhatsApp number
- Logo: add `Logo.jpg` from Drive as `assets/logo.jpg` and point the header/footer `<img>` tags at it
- Batch timings, and any other teachers you want listed
- **Enquiry form**: it currently validates and shows a thank-you message only.
  To receive submissions, connect it to a form service (e.g. Formspree, Google Forms)
  or your own backend in `script.js`.

## Deploy

The site is fully static, so it works on GitHub Pages (Settings → Pages → deploy from branch), Netlify, Vercel or any web host.
