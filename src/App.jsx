import { useMemo, useState } from "react";
import { pokemons } from "./data/pokemons";
import TypeFilter from "./components/TypeFilter";
import SortControl from "./components/SortControl";
import BarChart from "./components/BarChart";
import ScatterChart from "./components/ScatterChart";
import PokemonGrid from "./components/PokemonGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/pixelact-ui/card";
import logo from "./assets/pokedex-logo-pixel.png";
import "./styles/pokemon-card.css";
import "./App.css";

const types = [...new Set(pokemons.map((p) => p.type))].sort();

function App() {
  const [selectedType, setSelectedType] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key) => {
    if (key === sortBy) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const filteredPokemons = useMemo(() => {
    const filtered =
      selectedType === null
        ? pokemons
        : pokemons.filter((p) => p.type === selectedType);

    if (sortBy === null) return filtered;

    const sorted = [...filtered].sort((a, b) =>
      sortBy === "name" ? a.name.localeCompare(b.name) : a[sortBy] - b[sortBy],
    );
    return sortDir === "asc" ? sorted : sorted.reverse();
  }, [selectedType, sortBy, sortDir]);

  return (
    <>
      <header className="app-header">
        <img src={logo} alt="Pokédex" className="app-logo" />
      </header>

      <section className="main-layout">
        <div className="charts-column">
          <Card className="chart-block">
            <CardHeader>
              <CardTitle>Average HP &amp; Attack by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                pokemons={pokemons}
                selectedType={selectedType}
                onSelectType={setSelectedType}
              />
            </CardContent>
          </Card>
          <Card className="chart-block">
            <CardHeader>
              <CardTitle>Attack vs. HP</CardTitle>
            </CardHeader>
            <CardContent>
              <ScatterChart
                pokemons={pokemons}
                selectedType={selectedType}
                hoveredId={hoveredId}
                onHover={setHoveredId}
                onLeave={() => setHoveredId(null)}
              />
            </CardContent>
          </Card>
        </div>

        <aside className="sidebar-column">
          <TypeFilter types={types} selectedType={selectedType} onSelect={setSelectedType} />
          <SortControl sortBy={sortBy} sortDir={sortDir} onSort={handleSort} />
        </aside>
      </section>

      <section className="grid-section">
        <h2>
          {selectedType ? `${selectedType} Pokémon` : "All Pokémon"}{" "}
          <span className="count">({filteredPokemons.length})</span>
        </h2>
        <PokemonGrid
          pokemons={filteredPokemons}
          hoveredId={hoveredId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
        />
      </section>

      <footer className="app-footer">
        <p>
          Made by{" "}
          <a href="https://github.com/laurendudu" target="_blank" rel="noopener noreferrer">
            @laurendudu
          </a>{" "}
          · Holo card effect by{" "}
          <a href="https://github.com/simeydotme" target="_blank" rel="noopener noreferrer">
            @simeydotme
          </a>{" "}
          · Pixel UI by{" "}
          <a href="https://github.com/pixelact-ui" target="_blank" rel="noopener noreferrer">
            @pixelact-ui
          </a>{" "}
          · Font by{" "}
          <a href="https://github.com/cooljeanius" target="_blank" rel="noopener noreferrer">
            @cooljeanius
          </a>{" "}
          · Data from{" "}
          <a href="https://pokemontcg.io" target="_blank" rel="noopener noreferrer">
            Pokémon TCG API
          </a>{" "}
          &amp;{" "}
          <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer">
            PokéAPI
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
