## UI docs (Multicharacter + Identity)

This server uses two separate NUI frontends that work together:

- **`esx_multicharacter`**: character selection UI (React + Tailwind + Vite)
- **`esx_identity`**: identity/registration form UI (Vue + Vite)

Both resources ship **prebuilt** UI bundles that FiveM loads directly from the `ui_page` paths in each `fxmanifest.lua`.

---

## Where the UI is served from (important)

### `esx_multicharacter`

- **Served file**: `web/build/index.html`
- **Build output folder**: `web/build/`

This is configured here:

- `fxmanifest.lua` → `ui_page 'web/build/index.html'`

### `esx_identity`

- **Served file**: `web/dist/index.html`
- **Build output folder**: `web/dist/`

This is configured here:

- `fxmanifest.lua` → `ui_page 'web/dist/index.html'`

---

## Rebuilding the UIs

You only need this if you edit `web/src/**` files.

### Requirements

- Node.js + npm installed (LTS recommended)

### Build `esx_multicharacter` UI

From `resources/[core]/esx_multicharacter/web`:

```bash
npm install
npm run build
```

Outputs to: `resources/[core]/esx_multicharacter/web/build/`

### Build `esx_identity` UI

From `resources/[core]/esx_identity/web`:

```bash
npm install
npm run build
```

Outputs to: `resources/[core]/esx_identity/web/dist/`

### After building

- Restart the resources (or server) so the client loads the new bundle(s).

---

## UI structure

### `esx_multicharacter` (React)

Key files:

- `web/src/App.tsx`: listens for the `ToggleMulticharacter` NUI message and mounts the UI
- `web/src/components/CharacterSelection.tsx`: full-screen layout (left list / center actions / right info)
- `web/src/components/CharacterCard.tsx`: list item styling + selection
- `web/src/components/CharacterInfo.tsx`: right-side panel details and actions
- `web/src/utils/fetchNui.ts`: POST wrapper for NUI callbacks

Lua callbacks are registered in:

- `client/modules/nui.lua` (events: `SelectCharacter`, `PlayCharacter`, `DeleteCharacter`, `CreateCharacter`)

### `esx_identity` (Vue)

Key files:

- `web/src/App.vue`: shows/hides UI via `message` event (`enableui`)
- `web/src/components/Identity.vue`: form markup + `fetch("http://esx_identity/register", ...)`
- `web/src/style.css`: all UI styling

---

## Styling notes (theme + common pitfalls)

### “Black screen / black rectangle” prevention

FiveM/CEF can render unintended black layers if the page/root has an opaque background or if certain CSS effects are used.

These fixes are applied:

- **Force transparent roots**
  - `esx_multicharacter/web/src/index.css`: `html, body, #root { background: transparent !important; }`
  - `esx_identity/web/src/style.css`: `html, body, #app { background: transparent !important; }`
- **Avoid `backdrop-filter` in `esx_identity`**
  - Some CEF builds can show a solid dark rectangle instead of blur.
  - The identity “glass” look is implemented using layered gradients + borders instead.

### Identity form errors

Validation errors are positioned under each field via a wrapper container:

- `esx_identity/web/src/components/Identity.vue`: each row is wrapped in `.dialog__field`
- `esx_identity/web/src/style.css`: `.dialog__field` reserves vertical space so errors don’t overlap adjacent fields

---

## Making UI changes safely

- **Edit source files only** (`web/src/**`), not `web/build/**` or `web/dist/**`
- Rebuild after changes (see commands above)
- If you see a black overlay again:
  - Confirm `html/body/#root` (React) and `html/body/#app` (Vue) stay transparent
  - Remove/avoid `backdrop-filter` on large containers

