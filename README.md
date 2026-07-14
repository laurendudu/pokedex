# Pokédex

A Game Boy–styled Pokédex built with React and Vite, made for the [D3 Loves React](https://www.react-graph-gallery.com/react-d3-dataviz-course) data visualization course. Browse 20 Pokémon as real TCG card scans with an interactive holographic effect, filter by type, and explore their HP/Attack stats through a custom bar chart and scatter chart (hand-built with plain SVG, no charting library).

## Credits

This project stands on the shoulders of some awesome open-source work and public APIs. Full credit to:

### Code

- **[pokemon-cards-css](https://github.com/simeydotme/pokemon-cards-css)** by [simeydotme](https://github.com/simeydotme) (GPL-3.0) — the interactive holographic tilt/glare card effect. The CSS is vendored directly in [`src/styles/pokemon-card.css`](src/styles/pokemon-card.css); the pointer-tracking interaction logic (originally Svelte) was reimplemented in React in [`src/components/HoloCard.jsx`](src/components/HoloCard.jsx).
- **[Pixelact UI](https://www.pixelactui.com/)** ([GitHub](https://github.com/pixelact-ui/pixelact-ui), MIT) — the pixel-art shadcn/ui component registry (buttons, badges, cards) used throughout the interface.
- **[shadcn/ui](https://ui.shadcn.com/)** (MIT) — the underlying component primitives and CLI that Pixelact UI builds on.
- **[Tailwind CSS](https://tailwindcss.com/)** (MIT) — utility CSS, used alongside plain custom CSS for the Game Boy theme.

### Data & Images

- **[Pokémon TCG API](https://pokemontcg.io/)** — real Pokémon Trading Card Game scans and card metadata (rarity, set, subtypes) used in the card gallery.
- **[PokéAPI](https://pokeapi.co/)** — Pokémon sprites used in the scatter chart.

### Fonts

- **[PKMN RBYGSC](https://www.dafont.com/pkmn-rbygsc.font)** by David — the Game Boy–style pixel font used throughout the UI. Free for personal use; see [`src/assets/fonts/LICENSE-PKMN-RBYGSC.txt`](src/assets/fonts/LICENSE-PKMN-RBYGSC.txt).

### Data notice

Pokémon and Pokémon character names are trademarks of Nintendo. This is a fan-made, non-commercial project for educational purposes.

## Development

```bash
npm install
npm run dev
```

Built with [Vite](https://vite.dev/) + React.
