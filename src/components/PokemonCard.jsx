import { getTypeColor, getTypeTextColor } from "../data/typeColors";
import { tcgCards } from "../data/tcgCards";
import HoloCard from "./HoloCard";
import { Badge } from "@/components/ui/pixelact-ui/badge";

const MAX_STAT = 160;

function PokemonCard({ pokemon, dimmed, highlighted, onHover, onLeave }) {
  const color = getTypeColor(pokemon.type);
  const card = tcgCards[pokemon.id];

  return (
    <div
      className={`pokemon-card${dimmed ? " dimmed" : ""}${highlighted ? " highlighted" : ""}`}
      style={{ "--type-color": color }}
      onMouseEnter={() => onHover(pokemon.id)}
      onMouseLeave={onLeave}
    >
      {card && (
        <HoloCard
          name={card.name}
          image={card.image}
          types={card.types}
          subtypes={card.subtypes}
          supertype={card.supertype}
          rarity={card.rarity}
          number={card.number}
          set={card.set}
        />
      )}
      <div className="pokemon-card-caption">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <Badge
          className="mb-2.5"
          style={{ backgroundColor: color, color: getTypeTextColor(pokemon.type) }}
        >
          {pokemon.type}
        </Badge>
        <div className="pokemon-stats">
          <div className="stat-row">
            <span className="stat-label">HP</span>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{ width: `${(pokemon.hp / MAX_STAT) * 100}%` }}
              />
            </div>
            <span className="stat-value">{pokemon.hp}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">ATK</span>
            <div className="stat-bar">
              <div
                className="stat-fill attack"
                style={{ width: `${(pokemon.attack / MAX_STAT) * 100}%` }}
              />
            </div>
            <span className="stat-value">{pokemon.attack}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
