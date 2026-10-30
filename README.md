# LevelUp Academy Website

A responsive, single-page static website for LevelUp Academy. It uses no build step or dependencies.

## Files

- `index.html`: page content (hero, programs, why us, steps, faculty, testimonials, FAQ, enquiry form)
- `styles.css`: styling and responsive layout
- `script.js`: mobile menu, program filters, counters, testimonial slider, form validation
- `assets/favicon.svg`: logo / favicon

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Before going live, replace the placeholders

- Contact details in the `#contact` section: address, phone, email, hours
- Faculty names, subjects and bios in the `#faculty` section
- Stats in the stats bar (`data-count` values)
- Testimonials: use real quotes, with permission
- Programs, grades, schedules and boards offered
- **Enquiry form**: it currently validates and shows a thank-you message only.
  To receive submissions, connect it to a form service (e.g. Formspree, Google Forms)
  or your own backend in `script.js`.

## Deploy

The site is fully static, so it works on GitHub Pages (Settings → Pages → deploy from branch), Netlify, Vercel or any web host.
