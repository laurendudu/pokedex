import { Button } from "@/components/ui/pixelact-ui/button";

const SORT_OPTIONS = [
  { key: "id", label: "Dex #" },
  { key: "name", label: "Name" },
  { key: "hp", label: "HP" },
  { key: "attack", label: "ATK" },
];

function SortControl({ sortBy, sortDir, onSort }) {
  return (
    <div className="sort-control">
      <h3 className="sidebar-heading">Sort by</h3>
      {SORT_OPTIONS.map(({ key, label }) => {
        const active = sortBy === key;
        return (
          <Button
            key={key}
            variant={active ? "default" : "secondary"}
            size="sm"
            onClick={() => onSort(key)}
          >
            {label}
            {active ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
          </Button>
        );
      })}
    </div>
  );
}

export default SortControl;
