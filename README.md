# AI Image Prompt Generator

AI Image Prompt Generator is a simple static website that turns short image ideas into five English prompts for AI image generation tools.

The project uses only HTML, CSS, and JavaScript. It has no backend, database, login, payment, or external API calls.

## Supported Languages

- English: `/` and `/en/`
- Chinese: `/zh/`
- Spanish: `/es/`
- Japanese: `/ja/`

Generated prompt results stay in English because English prompts are often more consistent across common AI image tools.

## File Structure

```text
.
├── index.html
├── en/index.html
├── zh/index.html
├── es/index.html
├── ja/index.html
├── style.css
├── script.js
├── sitemap.xml
├── robots.txt
├── wrangler.jsonc
├── .assetsignore
└── README.md
```

## Local Testing

Run a local static server from the project root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/
http://127.0.0.1:8000/en/
http://127.0.0.1:8000/zh/
http://127.0.0.1:8000/es/
http://127.0.0.1:8000/ja/
```

You can also open `index.html` directly, but a local server is better for testing language paths like `/zh/`.

## Cloudflare Deployment

This project is configured for Cloudflare static assets with `wrangler.jsonc`:

```jsonc
{
  "name": "ai-image-prompt-generator",
  "compatibility_date": "2026-05-24",
  "assets": {
    "directory": "."
  }
}
```

Deploy manually with:

```bash
npx wrangler deploy
```

If you deploy through GitHub to Cloudflare, keep the same repository structure and let Cloudflare use the root directory as the static asset directory.

Cloudflare's Workers Static Assets documentation explains that Wrangler uploads files from the configured `assets.directory`: https://developers.cloudflare.com/workers/static-assets/

## SEO Notes

Each language page includes:

- `title`
- `meta description`
- canonical URL
- `hreflang` links
- Open Graph title, description, type, and URL

The default URLs use:

```text
https://ai-image-prompt-generator.pages.dev
```

If you use a custom domain, replace that domain in all HTML files, `sitemap.xml`, and `robots.txt`.

## Future Improvements

- Add real Privacy Policy and Terms pages when needed.
- Add a copy button for each generated prompt.
- Add more prompt styles.
- Add an image aspect ratio or art style selector.
- Add a small automated HTML validation workflow.
