import { Button } from "@/components/ui/pixelact-ui/button";
import { getTypeColor } from "../data/typeColors";

function TypeFilter({ types, selectedType, onSelect }) {
  return (
    <div className="type-filter">
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
            style={{ backgroundColor: getTypeColor(type), color: "#fff" }}
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
