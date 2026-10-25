# Shotterud

A party game that runs in the background. Add the players, and at random intervals a spinner picks who has to take a shot. Spin times, number of simultaneous spinners and the theme (Christmas, Halloween, San Diego, …) are configurable on the settings page.

## Development

Requires Node 22.22 or newer.

```bash
yarn install
yarn dev       # start the dev server at http://localhost:5173
yarn lint      # run ESLint
yarn build     # production build into dist/
yarn preview   # serve the production build locally
```

## Deployment

The site is deployed on Vercel from `master`. `vercel.json` rewrites every path to `index.html` so client-side routes like `/settings` survive a reload.
