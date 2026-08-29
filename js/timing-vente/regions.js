export const REGIONS = [
  { id: 'quebec', name: 'Québec' },
  { id: 'beauport', name: 'Beauport' },
  { id: 'charlesbourg', name: 'Charlesbourg' },
  { id: 'sainte-foy', name: 'Sainte-Foy' },
  { id: 'sillery', name: 'Sillery' },
  { id: 'cap-rouge', name: 'Cap-Rouge' },
  { id: 'limoilou', name: 'Limoilou' },
  { id: 'les-rivieres', name: 'Les Rivières' },
  { id: 'haute-saint-charles', name: 'La Haute-Saint-Charles' },
  { id: 'vanier', name: 'Vanier' },
  { id: 'neufchatel', name: 'Neufchâtel' },
  { id: 'lebourgneuf', name: 'Lebourgneuf' },
  { id: 'duberger', name: 'Duberger' },
  { id: 'les-saules', name: 'Les Saules' },
  { id: 'loretteville', name: 'Loretteville' },
  { id: 'ancienne-lorette', name: "L'Ancienne-Lorette" },
  { id: 'saint-augustin', name: 'Saint-Augustin-de-Desmaures' },
  { id: 'wendake', name: 'Wendake' },
  { id: 'valcartier', name: 'Saint-Gabriel-de-Valcartier' },
  { id: 'shannon', name: 'Shannon' },
  { id: 'stoneham', name: 'Stoneham-et-Tewkesbury' },
  { id: 'lac-beauport', name: 'Lac-Beauport' },
  { id: 'sainte-brigitte', name: 'Sainte-Brigitte-de-Laval' },
  { id: 'boischatel', name: 'Boischatel' },
  { id: 'ange-gardien', name: "L'Ange-Gardien" },
  { id: 'chateau-richer', name: 'Château-Richer' },
  { id: 'levis', name: 'Lévis' },
  { id: 'charny', name: 'Charny' },
  { id: 'saint-nicolas', name: 'Saint-Nicolas' },
  { id: 'saint-jean-chrysostome', name: 'Saint-Jean-Chrysostome' },
  { id: 'saint-romuald', name: 'Saint-Romuald' },
  { id: 'pintendre', name: 'Pintendre' },
  { id: 'saint-redempteur', name: 'Saint-Rédempteur' },
  { id: 'breakeyville', name: 'Breakeyville' },
  { id: 'saint-etienne-lauzon', name: 'Saint-Étienne-de-Lauzon' },
  { id: 'lauzon', name: 'Lauzon' },
  { id: 'saint-lambert-lauzon', name: 'Saint-Lambert-de-Lauzon' },
  { id: 'saint-henri', name: 'Saint-Henri' },
  { id: 'saint-jean-orleans', name: "Saint-Jean-de-l'Île-d'Orléans" },
  { id: 'sainte-petronille', name: 'Sainte-Pétronille' },
  { id: 'saint-laurent-orleans', name: "Saint-Laurent-de-l'Île-d'Orléans" }
];

function normalize(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function findRegion(id) {
  return REGIONS.find((region) => region.id === id) || null;
}

export function searchRegions(query, limit = 8) {
  const needle = normalize(query.trim());
  if (!needle) return REGIONS.slice(0, limit);

  return REGIONS
    .map((region) => {
      const haystack = normalize(region.name);
      let rank = 0;
      if (haystack.startsWith(needle)) rank = 3;
      else if (haystack.includes(needle)) rank = 2;
      else if (normalize(region.id).includes(needle)) rank = 1;
      return { region, rank };
    })
    .filter((item) => item.rank > 0)
    .sort((a, b) => b.rank - a.rank || a.region.name.localeCompare(b.region.name, 'fr'))
    .slice(0, limit)
    .map((item) => item.region);
}
