<h1 align="center">[ESX] Multi-Character | WSS-Development Edit</h1>
<p align="center">
  <b>
    <a href="https://discord.esx-framework.org/">Discord</a> -
    <a href="https://esx-framework.org/">Website</a> -
    <a href="https://docs.esx-legacy.com/">Documentation</a> -
    <a href="https://https://discord.gg/ZkXdkRsGut"> WSS Discord </a> -
    <a href="https://wss-development.tebex.io/"> WSS Tebex </a>
  </b>
</p>

Multi-character system for **ESX Legacy** that lets players create, select, play, and optionally delete multiple characters on a single account.

> This resource works alongside **`esx_identity`**, **`esx_skin`**, and other ESX core resources.

![Preview](https://r2.fivemanage.com/m4VWZLZoULSXNOFGfRETN/11.png)

---

## Features

- **Multiple character slots** per player (default configured via `Config.Slots`)
- **Character selection UI (NUI)** with:
  - Select character
  - Play character
  - Create character
  - Optional delete character (`Config.CanDelete`)
- **Per-player slot management** via admin commands (see below)
- **Relog command** (optional) to return to selection (`Config.Relog`)
- **Character deletion** handled server-side (no manual DB cleanup required by admins)

---

## Requirements

Declared dependencies:

- `es_extended`
- `esx_context`
- `esx_identity`
- `esx_skin`
- `oxmysql`

---

## Installation

1. Put `esx_multicharacter` into your server resources (usually `resources/[core]/`).
2. Ensure dependencies are started **before** `esx_multicharacter`.
3. Add to your `server.cfg`:

```cfg
ensure esx_multicharacter
```

4. Configure `config.lua` to match your server (see below).

---

## Configuration (`config.lua`)

### Server-side

- **`Config.Slots`**: default character slots for all players.
- **`Config.Prefix`**: prefix for stored character identifiers (keep short, e.g. `char`).
- **`Config.CanDelete`**: allow players to delete characters from the UI.

### Client-side

- **`Config.Spawn`**: location of the character selection scene/camera.
- **`Config.Relog`**: enable `/relog` to return to the character menu.
- **`Config.Default`**: default appearance for brand-new characters.

---

## Commands

If enabled/configured by the resource, the following are used to manage character slots and availability:

- `/setslots` (set a player’s slot count)
- `/remslots` (remove extra slots)
- `/enablechar` (re-enable a disabled character)
- `/disablechar` (disable a character)
- `/relog` (client) return to selection menu (only if `Config.Relog = true`)
- `/forcelog` (admin) forces a logout/reselect for the invoking player

---

## How characters are stored (DB)

- Characters are stored in the `users` table using identifiers in the form:
  - `char#:license` (example: `char1:license:xxxxxxxx`)

---

## UI (NUI) build notes

This resource ships a prebuilt UI bundle (FiveM loads it from `web/build/`).

If you edit UI source files under `web/src/`, rebuild it:

```bash
cd web
npm install
npm run build
```

For detailed UI notes (including identity UI + black-screen fixes), see:

- `UI-DOCS.md`

---

## Credits

- Forked from [Kashacters resource](https://github.com/FiveEYZ/esx_kashacter)
- zStretz (wss-development for reskin)
- Most code has been rewritten; original author permission was granted for use of prior code.

---

## License

Official Multi-Character system for ESX Legacy

Copyright © 2022-2024 Linden, ESX-Framework and KASH

This program is free software: you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not,
see <https://www.gnu.org/licenses>.
