# HTML inline styles converter tool
This tool can be used to convert HTML with inline styles to an TSX/JSX compatible HTML

https://html-inline-styles-converter.com

## 📜 Example:
#### Input:
```html
<div style="display: none; margin-top: 5px;">
    Some very cool text
</div>
```
#### Output:
```tsx
<div style={{"display":"none","marginTop":"5px"}}>
    Some very cool text
</div>
```
## 🔨 Tool built with [Astro](https://astro.build)

## 🚀 Project Structure

Inside this Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── InlineStylesConverter
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |
