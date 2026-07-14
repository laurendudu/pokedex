import { spriteUrl } from "../data/pokemons";
import { getTypeColor } from "../data/typeColors";

const WIDTH = 700;
const HEIGHT = 340;
const MARGIN = { top: 20, right: 20, bottom: 40, left: 40 };
const MAX_VALUE = 160;
const TICKS = [0, 40, 80, 120, 160];

function ScatterChart({ pokemons, selectedType, hoveredId, onHover, onLeave }) {
  const chartWidth = WIDTH - MARGIN.left - MARGIN.right;
  const chartHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const x = (value) => (value / MAX_VALUE) * chartWidth;
  const y = (value) => chartHeight - (value / MAX_VALUE) * chartHeight;

  return (
    <div className="chart-wrapper">
      <svg
        className="scatter-chart"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Attack versus HP for each Pokémon"
      >
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          {TICKS.map((tick) => (
            <g key={`y-${tick}`} transform={`translate(0,${y(tick)})`}>
              <line x2={chartWidth} className="grid-line" />
              <text x={-10} dy="0.32em" textAnchor="end" className="axis-label">
                {tick}
              </text>
            </g>
          ))}
          {TICKS.map((tick) => (
            <text
              key={`x-${tick}`}
              x={x(tick)}
              y={chartHeight + 20}
              textAnchor="middle"
              className="axis-label"
            >
              {tick}
            </text>
          ))}

          <text
            x={chartWidth / 2}
            y={chartHeight + 36}
            textAnchor="middle"
            className="axis-title"
          >
            Attack
          </text>
          <text
            x={-chartHeight / 2}
            y={-28}
            textAnchor="middle"
            transform="rotate(-90)"
            className="axis-title"
          >
            HP
          </text>

          {pokemons.map((p) => {
            const dimmed = selectedType !== null && selectedType !== p.type;
            const highlighted = hoveredId === p.id;
            const cx = x(p.attack);
            const cy = y(p.hp);
            const size = highlighted ? 44 : 34;
            return (
              <g
                key={p.id}
                className={`scatter-point${dimmed ? " dimmed" : ""}${highlighted ? " highlighted" : ""}`}
                onMouseEnter={() => onHover(p.id)}
                onMouseLeave={onLeave}
              >
                <circle
                  className="scatter-point-backplate"
                  cx={cx}
                  cy={cy}
                  r={size / 2 + 3}
                  fill={getTypeColor(p.type)}
                />
                <image
                  className="scatter-point-sprite"
                  href={spriteUrl(p.id)}
                  x={cx - size / 2}
                  y={cy - size / 2}
                  width={size}
                  height={size}
                />
                <title>{`${p.name} — Attack: ${p.attack}, HP: ${p.hp}`}</title>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default ScatterChart;
