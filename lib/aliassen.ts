const ALIASSEN: Record<string, string> = {
  Jet: 'Breimeid',
  Robbie: 'McDreamy',
  Chris: 'Ambtenaar',
  Esther: 'Galeriehoudster',
  Ruben: 'GameBoy',
  Jelte: 'Hulk J',
  Yvonne: 'AudioGirl',
  'Min Ae': 'KimchiGirl',
  Marije: 'Belgin',
};

export function weergaveNaam(lid: string): string {
  return ALIASSEN[lid] ?? lid;
}

export function aliasSlug(lid: string): string {
  return weergaveNaam(lid).toLowerCase().replace(/\s+/g, '');
}

export function vindLidPerAliasSlug(leden: string[], slug: string): string | undefined {
  return leden.find((lid) => aliasSlug(lid) === slug);
}
