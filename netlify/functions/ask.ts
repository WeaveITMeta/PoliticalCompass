import { CLASSIC_COMPASS } from "../../src/data/classic-compass";

const SITE_URL = "https://the-political-compass-app.netlify.app";

interface SearchableIdeology {
  id: string;
  label: string;
  desc: string;
  quadrant: string;
}

const ALL_IDEOLOGIES: SearchableIdeology[] = Object.values(CLASSIC_COMPASS.quadrants).flatMap(q =>
  q.nodes.map(n => ({ id: n.id, label: n.label, desc: n.desc, quadrant: q.name }))
);

function score(query: string, ideology: SearchableIdeology): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const tokens = q.split(/\s+/).filter(t => t.length > 0);
  if (tokens.length === 0) return 0;
  const labelLC = ideology.label.toLowerCase();
  const descLC = ideology.desc.toLowerCase();
  let s = 0;
  for (const t of tokens) {
    if (labelLC === t) s += 100;
    else if (labelLC.startsWith(t)) s += 50;
    else if (labelLC.includes(t)) s += 30;
    if (descLC.includes(t)) s += 5;
  }
  if (labelLC.includes(q)) s += 20;
  return s;
}

export default async (req: Request) => {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? url.searchParams.get("query") ?? "").trim();
  const limit = Math.min(Math.max(parseInt(url.searchParams.get("limit") ?? "10", 10) || 10, 1), 100);

  const ranked = q
    ? ALL_IDEOLOGIES
        .map(it => ({ it, s: score(q, it) }))
        .filter(r => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, limit)
    : [];

  const body = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": q ? `Search results for "${q}"` : "The Political Compass — natural-language search",
    "description": q
      ? `Top ${ranked.length} ideologies matching "${q}" across ${ALL_IDEOLOGIES.length} indexed political ideologies.`
      : `Provide a 'q' query parameter. Searches ${ALL_IDEOLOGIES.length} abstract political ideologies and returns Schema.org JSON-LD ItemList of DefinedTerm results.`,
    "numberOfItems": ranked.length,
    "itemListOrder": "Descending",
    "url": `${SITE_URL}/ask${q ? `?q=${encodeURIComponent(q)}` : ""}`,
    "isPartOf": { "@id": `${SITE_URL}/#website` },
    "itemListElement": ranked.map((r, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "DefinedTerm",
        "@id": `${SITE_URL}/#${r.it.id}`,
        "name": r.it.label,
        "description": r.it.desc,
        "inDefinedTermSet": {
          "@type": "DefinedTermSet",
          "name": r.it.quadrant,
        },
      },
    })),
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/ld+json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
};
