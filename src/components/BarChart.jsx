import { useState } from "react";
import { getTypeColor } from "../data/typeColors";

const WIDTH = 700;
const HEIGHT = 260;
const MARGIN = { top: 20, right: 20, bottom: 50, left: 40 };
const MAX_VALUE = 160;
const TICKS = [0, 40, 80, 120, 160];
const TOOLTIP_WIDTH = 128;
const TOOLTIP_HEIGHT = 58;

function groupByType(pokemons) {
  const groups = new Map();
  for (const p of pokemons) {
    if (!groups.has(p.type)) groups.set(p.type, { hp: 0, attack: 0, count: 0 });
    const g = groups.get(p.type);
    g.hp += p.hp;
    g.attack += p.attack;
    g.count += 1;
  }
  return [...groups.entries()]
    .map(([type, g]) => ({
      type,
      avgHp: g.hp / g.count,
      avgAttack: g.attack / g.count,
    }))
    .sort((a, b) => b.avgAttack - a.avgAttack);
}

function BarChart({ pokemons, selectedType, onSelectType }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const data = groupByType(pokemons);
  const chartWidth = WIDTH - MARGIN.left - MARGIN.right;
  const chartHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const bandWidth = chartWidth / data.length;
  const barWidth = Math.min(28, bandWidth / 2 - 6);

  const y = (value) => chartHeight - (value / MAX_VALUE) * chartHeight;

  const hovered = hoveredIndex !== null ? data[hoveredIndex] : null;
  let tooltipX = 0;
  let tooltipY = 0;
  if (hovered) {
    const centerX = hoveredIndex * bandWidth + bandWidth / 2;
    const topY = Math.min(y(hovered.avgHp), y(hovered.avgAttack));
    tooltipX = Math.min(
      Math.max(centerX - TOOLTIP_WIDTH / 2, 0),
      chartWidth - TOOLTIP_WIDTH,
    );
    tooltipY = Math.max(topY - TOOLTIP_HEIGHT - 10, 0);
  }

  return (
    <div className="chart-wrapper">
      <div className="chart-legend">
        <span className="legend-item">
          <span className="legend-swatch hp" /> Avg HP
        </span>
        <span className="legend-item">
          <span className="legend-swatch attack" /> Avg Attack
        </span>
      </div>
      <svg
        className="bar-chart"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Average HP and Attack by Pokémon type"
      >
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          {TICKS.map((tick) => (
            <g key={tick} transform={`translate(0,${y(tick)})`}>
              <line x2={chartWidth} className="grid-line" />
              <text x={-10} dy="0.32em" textAnchor="end" className="axis-label">
                {tick}
              </text>
            </g>
          ))}

          {data.map((d, i) => {
            const bandX = i * bandWidth;
            const dimmed = selectedType !== null && selectedType !== d.type;
            const hoverDimmed = hoveredIndex !== null && hoveredIndex !== i;
            const isHovered = hoveredIndex === i;
            const color = getTypeColor(d.type);
            return (
              <g
                key={d.type}
                className={`bar-group${dimmed ? " dimmed" : ""}${hoverDimmed ? " hover-dimmed" : ""}${isHovered ? " hovered" : ""}`}
                onClick={() => onSelectType(selectedType === d.type ? null : d.type)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <rect
                  x={bandX + bandWidth / 2 - barWidth - 2}
                  y={y(d.avgHp)}
                  width={barWidth}
                  height={chartHeight - y(d.avgHp)}
                  fill={color}
                />
                <rect
                  x={bandX + bandWidth / 2 + 2}
                  y={y(d.avgAttack)}
                  width={barWidth}
                  height={chartHeight - y(d.avgAttack)}
                  fill={color}
                  opacity={0.5}
                />
                <text
                  x={bandX + bandWidth / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  className="axis-label"
                >
                  {d.type}
                </text>
              </g>
            );
          })}

          {hovered && (
            <g
              className="bar-tooltip"
              transform={`translate(${tooltipX},${tooltipY})`}
            >
              <rect width={TOOLTIP_WIDTH} height={TOOLTIP_HEIGHT} rx={8} />
              <text x={12} y={20} className="tooltip-title">
                {hovered.type}
              </text>
              <text x={12} y={38} className="tooltip-line">
                Avg HP: {hovered.avgHp.toFixed(1)}
              </text>
              <text x={12} y={52} className="tooltip-line">
                Avg Attack: {hovered.avgAttack.toFixed(1)}
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}

export default BarChart;
