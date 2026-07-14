import PokemonCard from "./PokemonCard";

function PokemonGrid({ pokemons, hoveredId, onHover, onLeave }) {
  if (pokemons.length === 0) {
    return <p className="empty-state">No Pokémon match this filter.</p>;
  }

  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          dimmed={hoveredId !== null && hoveredId !== pokemon.id}
          highlighted={hoveredId === pokemon.id}
          onHover={onHover}
          onLeave={onLeave}
        />
      ))}
    </div>
  );
}

export default PokemonGrid;
