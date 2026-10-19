# Vinayak Sabu — Two-Side Portfolio

The site intentionally has only two primary pages:

- `index.html` — Professional: engineering, projects, leadership, outcomes, and contact.
- `creative.html` — Creative: editing, motion, creator process, visual references, and contact.

Images are saved in `assets/`:

- `vinayak-professional.jpg` is used on the Professional page.
- `vinayak-creator.jpg` is used on the Creative page.

Both pages include a persistent day/night control. The portrait and camera image use pointer-driven motion tracking; no camera access or biometric/eye-tracking data is collected.

The Professional page has a service selector under “Work together.” It creates a pre-filled booking email for the selected service, rather than collecting payment details in the browser. To add a real secure checkout, connect a Stripe account or supply a hosted Stripe Payment Link after service pricing and terms are finalised.

## Easy updates

- Change email and Instagram once in `site-config.js`.
- Update project names, copy, roles, and page labels directly in `index.html` or `creative.html`.
- Replace the two images in `assets/`, keeping the same filenames, to update the portraits.
- Add public Reel URLs to `instagramReelUrls` in `site-config.js`; valid URLs are rendered as Instagram embeds on the Creative page. The existing reel button opens `@el.vinu`’s Reels tab.
- Each Professional project has an expandable case file. Its photo selector previews an image only in the current browser session, while its public summary downloads from `reports/`. Replace those summaries with original reports whenever they are ready.

A static website cannot safely persist visitor uploads without a real backend/storage provider.

## Payment gateway note

The supplied YouPI-PG project is a self-hosted payment platform, not a copy-paste static-site widget. Its own deployment guidance requires a Node server, SQLite database, public HTTPS domain, merchant credentials, and signed webhook handling. It has not been embedded as a mock or unsafe client-side payment flow. Provision and deploy that gateway first, then add its real public checkout URL/key to this site.

The LinkedIn and GitHub buttons point to Vinayak’s profile URLs. Instagram points to `@el.vinu`; X remains at the platform URL until the exact profile handle is supplied.
