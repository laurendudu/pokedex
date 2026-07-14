import { useMemo, useState } from "react";
import { pokemons } from "./data/pokemons";
import TypeFilter from "./components/TypeFilter";
import BarChart from "./components/BarChart";
import ScatterChart from "./components/ScatterChart";
import PokemonGrid from "./components/PokemonGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/pixelact-ui/card";
import "./styles/pokemon-card.css";
import "./App.css";

const types = [...new Set(pokemons.map((p) => p.type))].sort();

function App() {
  const [selectedType, setSelectedType] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const filteredPokemons = useMemo(
    () =>
      selectedType === null
        ? pokemons
        : pokemons.filter((p) => p.type === selectedType),
    [selectedType],
  );

  return (
    <>
      <header className="app-header">
        <h1>Pokédex</h1>
        <p className="subtitle">
          A small dataset of 20 Pokémon, visualized. Click a type or a chart
          element to filter, hover a point or card to cross-highlight.
        </p>
      </header>

      <TypeFilter types={types} selectedType={selectedType} onSelect={setSelectedType} />

      <section className="charts-section">
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
    </>
  );
}

export default App;
