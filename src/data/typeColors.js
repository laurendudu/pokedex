export const typeColors = {
  Normal: "#A0A29F",
  Fire: "#FF9741",
  Water: "#3692DC",
  Electric: "#FBD100",
  Grass: "#38BF4B",
  Ice: "#4CD1C0",
  Fighting: "#D3425F",
  Poison: "#A55CA5",
  Ground: "#DEC16B",
  Flying: "#A891EC",
  Psychic: "#FA8582",
  Bug: "#92BC2C",
  Rock: "#C9BB8A",
  Ghost: "#5F6DBC",
  Dragon: "#0C69C8",
  Dark: "#595761",
  Steel: "#5695A3",
  Fairy: "#EE90E6",
};

export function getTypeColor(type) {
  return typeColors[type] ?? "#999999";
}

export function getTypeTextColor() {
  return "#082955";
}
