import { useEffect, useRef, useState } from "react";
import { adjust, clamp, lerp, round } from "../utils/cardMath";

const REST = {
  background: { x: 50, y: 50 },
  rotate: { x: 0, y: 0 },
  glare: { x: 50, y: 50, o: 0 },
};

const DEFAULT_BACK =
  "https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg";

const SMOOTHING = 0.12;

function HoloCard({
  name,
  image,
  back = DEFAULT_BACK,
  types = [],
  subtypes = ["basic"],
  supertype = "pokémon",
  rarity = "common",
  number = "",
  set = "",
  pixelated = false,
}) {
  const cardRef = useRef(null);
  const rotatorRef = useRef(null);
  const current = useRef(structuredClone(REST));
  const target = useRef(structuredClone(REST));
  const rafId = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.background.x = lerp(c.background.x, t.background.x, SMOOTHING);
      c.background.y = lerp(c.background.y, t.background.y, SMOOTHING);
      c.rotate.x = lerp(c.rotate.x, t.rotate.x, SMOOTHING);
      c.rotate.y = lerp(c.rotate.y, t.rotate.y, SMOOTHING);
      c.glare.x = lerp(c.glare.x, t.glare.x, SMOOTHING);
      c.glare.y = lerp(c.glare.y, t.glare.y, SMOOTHING);
      c.glare.o = lerp(c.glare.o, t.glare.o, SMOOTHING);

      const el = cardRef.current;
      if (el) {
        const fromCenter = clamp(
          Math.sqrt((c.glare.y - 50) ** 2 + (c.glare.x - 50) ** 2) / 50,
          0,
          1,
        );
        el.style.setProperty("--pointer-x", `${c.glare.x}%`);
        el.style.setProperty("--pointer-y", `${c.glare.y}%`);
        el.style.setProperty("--pointer-from-center", `${fromCenter}`);
        el.style.setProperty("--pointer-from-top", `${c.glare.y / 100}`);
        el.style.setProperty("--pointer-from-left", `${c.glare.x / 100}`);
        el.style.setProperty("--card-opacity", `${c.glare.o}`);
        el.style.setProperty("--rotate-x", `${c.rotate.x}deg`);
        el.style.setProperty("--rotate-y", `${c.rotate.y}deg`);
        el.style.setProperty("--background-x", `${c.background.x}%`);
        el.style.setProperty("--background-y", `${c.background.y}%`);
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const handlePointerMove = (e) => {
    const rect = rotatorRef.current.getBoundingClientRect();
    const absolute = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const percent = {
      x: clamp(round((100 / rect.width) * absolute.x)),
      y: clamp(round((100 / rect.height) * absolute.y)),
    };
    const center = { x: percent.x - 50, y: percent.y - 50 };

    target.current = {
      background: {
        x: adjust(percent.x, 0, 100, 37, 63),
        y: adjust(percent.y, 0, 100, 33, 67),
      },
      rotate: {
        x: round(-(center.x / 3.5)),
        y: round(center.y / 3.5),
      },
      glare: { x: round(percent.x), y: round(percent.y), o: 1 },
    };
  };

  const handlePointerLeave = () => {
    target.current = structuredClone(REST);
  };

  const typeClass = (Array.isArray(types) ? types : [types])
    .join(" ")
    .toLowerCase();
  const subtypesAttr = (Array.isArray(subtypes) ? subtypes : [subtypes])
    .join(" ")
    .toLowerCase();

  return (
    <div className="holo-card-frame">
      <div
        ref={cardRef}
        className={`card ${typeClass} interactive${loaded ? "" : " loading"}${pixelated ? " pixelated" : ""}`}
        data-number={String(number).toLowerCase()}
        data-set={set}
        data-subtypes={subtypesAttr}
        data-supertype={String(supertype).toLowerCase()}
        data-rarity={String(rarity).toLowerCase()}
      >
        <div className="card__translater">
          <button
            ref={rotatorRef}
            className="card__rotator"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            aria-label={`${name} Pokémon card`}
            type="button"
          >
            <img className="card__back" src={back} alt="" width={660} height={921} />
            <div className="card__front">
              <img
                src={image}
                alt={`Front design of the ${name} Pokémon card`}
                width={660}
                height={921}
                onLoad={() => setLoaded(true)}
              />
              <div className="card__shine" />
              <div className="card__glare" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HoloCard;
