You can deploy an Astro app to Vercel entirely from your local machine using the **Vercel CLI** — no GitHub repo required.

## 1. Install & Authenticate

Install the Vercel CLI as a dev dependency (or globally):

```bash
npm install -D vercel
# or globally
npm install -g vercel
```

Then log in to your Vercel account: [docs.astro](https://docs.astro.build/en/guides/deploy/vercel/)

```bash
npx vercel login
```

## 2. Initialize the Vercel Project

Run the following from your Astro project root: [alexchantastic](https://www.alexchantastic.com/deploying-with-vercel-cli)

```bash
npx vercel
```

When prompted:
- **Link to existing project?** → Enter `N`
- **Project name** → Enter your desired name
- **Code location** → Press Enter to use `./` (root)
- **Override settings?** → Enter `N` — Vercel auto-detects Astro's build command (`astro build`) and output directory (`dist`) [docs.astro](https://docs.astro.build/en/guides/deploy/vercel/)

A `.vercel/` directory will be created locally with your project config. Add it to `.gitignore` to avoid leaking deployment details. [alexchantastic](https://www.alexchantastic.com/deploying-with-vercel-cli)

## 3. Deploy

**Option A — Let Vercel build remotely** (source files are uploaded):

```bash
npx vercel deploy          # Preview URL
npx vercel deploy --prod   # Production URL
```

**Option B — Build locally, deploy only the output** (source code stays on your machine): [alexchantastic](https://www.alexchantastic.com/deploying-with-vercel-cli)

```bash
npx vercel build --prod
npx vercel deploy --prebuilt --prod
```

The `--prebuilt` flag tells Vercel to skip the remote build and only upload the contents of `.vercel/output` — keeping your source private. [alexchantastic](https://www.alexchantastic.com/deploying-with-vercel-cli)

## Streamline with npm Scripts

You can add convenience scripts to `package.json`: [alexchantastic](https://www.alexchantastic.com/deploying-with-vercel-cli)

```json
"scripts": {
  "deploy": "vercel build --prod && vercel deploy --prebuilt --prod",
  "deploy:preview": "vercel build && vercel deploy --prebuilt"
}
```

Then just run `npm run deploy` for future deployments.

> **Tip:** Each `vercel deploy` produces a unique `.vercel.app` preview URL. Use `--prod` only when you're ready to push to your production URL. [alexchantastic](https://www.alexchantastic.com/deploying-with-vercel-cli)