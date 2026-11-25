import type { ArtVariant } from "@/lib/menu";

type Palette = {
  bg: string;
  body: string;
  rim: string;
  sauce: string;
};

const palettes: Record<ArtVariant, Palette> = {
  original: { bg: "#F6E3C4", body: "#C9793F", rim: "#FBE6BE", sauce: "#A85E2E" },
  spesial: { bg: "#F8DFB8", body: "#B96432", rim: "#FFEBC7", sauce: "#9A5227" },
  pedas: { bg: "#F9DBCC", body: "#C35C39", rim: "#FFE0C4", sauce: "#9C3B22" },
  mini: { bg: "#F7E9CF", body: "#D18A4C", rim: "#FFF0D2", sauce: "#B06C35" },
  paket: { bg: "#E9ECD4", body: "#C9793F", rim: "#FBE6BE", sauce: "#A85E2E" },
  teh: { bg: "#DDE9D6", body: "#B87333", rim: "#FFF8EC", sauce: "#B87333" },
  kerupuk: { bg: "#F7E6C8", body: "#E9B45E", rim: "#FFF3D8", sauce: "#C98A3C" },
};

function BowlShape({
  x,
  y,
  scale,
  variant,
  palette,
}: {
  x: number;
  y: number;
  scale: number;
  variant: ArtVariant;
  palette: Palette;
}) {
  const clipId = `bowl-clip-${variant}`;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="steam-line" opacity=".75">
        <path
          d="M-24 -34c-9 -10 7 -14 0 -26"
          stroke="#B87333"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M0 -40c-10 -11 8 -15 0 -29"
          stroke="#B87333"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M24 -34c-9 -10 7 -14 0 -26"
          stroke="#B87333"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      <ellipse cx="0" cy="66" rx="70" ry="12" fill="#2B1A12" opacity=".14" />
      <path
        d="M-82 0c3 38 32 63 82 63s79-25 82-63H-82Z"
        fill={palette.body}
      />
      <path
        d="M-62 28c9 19 34 30 62 30s53-11 62-30"
        stroke="#FFF8EC"
        strokeOpacity=".28"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="0" cy="0" rx="82" ry="24" fill={palette.rim} />
      <ellipse cx="0" cy="2" rx="72" ry="18" fill={palette.sauce} />

      <defs>
        <clipPath id={clipId}>
          <ellipse cx="0" cy="2" rx="72" ry="18" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <path
          d="M-66 6c16-9 30 7 46-1s30 7 46-1 28 6 42-1"
          stroke="#FBE7AE"
          strokeWidth="4"
          strokeLinecap="round"
          opacity=".9"
        />
        <path
          d="M-62 12c14-7 28 6 42-1s28 6 42-1 26 5 38-1"
          stroke="#FFF0CD"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".8"
        />
        <rect x="-54" y="-6" width="21" height="15" rx="4" fill="#FFF4DC" transform="rotate(-9 -54 -6)" />
        <rect x="24" y="-8" width="22" height="15" rx="4" fill="#FFF4DC" transform="rotate(8 24 -8)" />
        <rect x="-16" y="4" width="20" height="14" rx="4" fill="#F5C86C" transform="rotate(6 -16 4)" />
        <rect x="-42" y="8" width="18" height="12" rx="3" fill="#F5C86C" transform="rotate(-6 -42 8)" />
        <path d="M-2 -6c7-6 13 2 20-4M4 8c7-5 12 2 18-3" stroke="#EAF3D3" strokeWidth="3" strokeLinecap="round" />
        {variant === "spesial" && (
          <>
            <ellipse cx="8" cy="-1" rx="13" ry="9" fill="#FFF9EE" />
            <circle cx="8" cy="-1" r="5" fill="#F4B740" />
          </>
        )}
        {(variant === "pedas" || variant === "spesial") && (
          <>
            <circle cx="-28" cy="-6" r="5" fill="#D9452B" />
            <circle cx="42" cy="6" r="4" fill="#D9452B" />
            <circle cx="18" cy="-10" r="3" fill="#D9452B" />
          </>
        )}
        <circle cx="-44" cy="-10" r="3.5" fill="#6F9B52" />
        <circle cx="-8" cy="10" r="3" fill="#6F9B52" />
        <circle cx="34" cy="-9" r="3.5" fill="#6F9B52" />
      </g>

      <path
        d="M-82 0c0-13 37-24 82-24s82 11 82 24"
        stroke={palette.rim}
        strokeWidth="3"
        opacity=".8"
      />
    </g>
  );
}

function TeaArt() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" fill="none" aria-hidden="true">
      <circle cx="120" cy="100" r="82" fill={palettes.teh.bg} />
      <ellipse cx="120" cy="171" rx="48" ry="9" fill="#2B1A12" opacity=".13" />
      <path
        d="M84 55h72l-8 101c-.7 9-8 16-17 16h-22c-9 0-16.3-7-17-16L84 55Z"
        fill="#FFF8EC"
        stroke="#E2CBA7"
        strokeWidth="3"
      />
      <path
        d="M90 68h60l-7 86c-.5 6-5 10-11 10h-24c-6 0-10.5-4-11-10L90 68Z"
        fill={palettes.teh.sauce}
      />
      <rect x="98" y="78" width="22" height="22" rx="4" fill="#FFF8EC" opacity=".34" transform="rotate(-12 98 78)" />
      <rect x="124" y="104" width="20" height="20" rx="4" fill="#FFF8EC" opacity=".3" transform="rotate(14 124 104)" />
      <path d="M150 18l-16 112" stroke="#D9452B" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="120" cy="55" rx="36" ry="9" fill="#F6D5A8" />
      <ellipse cx="120" cy="55" rx="27" ry="6" fill="#B87333" />
      <circle cx="161" cy="76" r="15" fill="#F6C453" />
      <circle cx="161" cy="76" r="10" fill="#FFF0BE" />
      <path d="M161 61v30M146 76h30" stroke="#E8A93B" strokeWidth="1.5" />
    </svg>
  );
}

function CrackerArt() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" fill="none" aria-hidden="true">
      <circle cx="120" cy="100" r="82" fill={palettes.kerupuk.bg} />
      <ellipse cx="120" cy="166" rx="62" ry="10" fill="#2B1A12" opacity=".12" />
      <g transform="rotate(-18 103 112)">
        <path
          d="M56 100c14-24 54-30 82-17 20 9 24 35 4 47-25 15-70 7-86-12-5-6-4-12 0-18Z"
          fill="#E9B45E"
          stroke="#C98A3C"
          strokeWidth="3"
        />
        <path d="M73 101c14-9 34-10 51-4M74 118c16-7 37-7 52 1" stroke="#FFF0C9" strokeWidth="4" strokeLinecap="round" opacity=".75" />
      </g>
      <g transform="rotate(24 145 105)">
        <path
          d="M92 86c12-22 50-29 76-17 19 9 22 33 3 45-24 14-65 6-80-12-5-5-5-11 1-16Z"
          fill="#F2C772"
          stroke="#C98A3C"
          strokeWidth="3"
        />
        <path d="M108 88c13-8 31-9 47-3M109 104c15-6 34-6 48 1" stroke="#FFF6D8" strokeWidth="4" strokeLinecap="round" opacity=".8" />
      </g>
      <circle cx="74" cy="70" r="5" fill="#D9452B" />
      <circle cx="178" cy="142" r="4" fill="#4F7942" />
    </svg>
  );
}

export function FoodArt({
  variant,
  className = "h-full w-full",
}: {
  variant: ArtVariant;
  className?: string;
}) {
  if (variant === "teh") return <TeaArt />;
  if (variant === "kerupuk") return <CrackerArt />;

  const palette = palettes[variant];

  return (
    <svg viewBox="0 0 240 200" className={className} fill="none" aria-hidden="true">
      <circle cx="120" cy="98" r="86" fill={palette.bg} />
      <circle
        cx="120"
        cy="98"
        r="77"
        stroke="#2B1A12"
        strokeOpacity=".08"
        strokeWidth="2"
        strokeDasharray="4 9"
      />
      {variant === "paket" ? (
        <>
          <BowlShape x={76} y={112} scale={0.62} variant={variant} palette={palette} />
          <BowlShape x={164} y={112} scale={0.62} variant={variant} palette={palette} />
          <g transform="translate(120 54)">
            <circle r="18" fill="#4F7942" />
            <text
              x="0"
              y="7"
              textAnchor="middle"
              fontSize="20"
              fontWeight="800"
              fill="#FFF8EC"
            >
              2
            </text>
          </g>
        </>
      ) : (
        <BowlShape
          x={120}
          y={variant === "mini" ? 112 : 104}
          scale={variant === "mini" ? 0.8 : 1}
          variant={variant}
          palette={palette}
        />
      )}
    </svg>
  );
}
