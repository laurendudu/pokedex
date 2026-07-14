import { Button } from "@/components/ui/pixelact-ui/button";
import { getTypeColor, getTypeTextColor } from "../data/typeColors";

function TypeFilter({ types, selectedType, onSelect }) {
  return (
    <div className="type-filter">
      <h3 className="sidebar-heading">Filter by type</h3>
      <Button
        variant={selectedType === null ? "default" : "secondary"}
        size="sm"
        onClick={() => onSelect(null)}
      >
        All
      </Button>
      {types.map((type) => {
        const active = selectedType === type;
        return (
          <Button
            key={type}
            variant="secondary"
            size="sm"
            className={`type-chip-button${active ? " active" : ""}`}
            style={{
              "--color-secondary": getTypeColor(type),
              color: getTypeTextColor(type),
            }}
            onClick={() => onSelect(active ? null : type)}
          >
            {type}
          </Button>
        );
      })}
    </div>
  );
}

export default TypeFilter;
