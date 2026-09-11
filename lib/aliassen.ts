const ALIASSEN: Record<string, string> = {
  Jet: 'Breimeid',
  Robbie: 'McDreamy',
  Chris: 'Ambtenaar',
  Esther: 'Galeriehoudster',
  Ruben: 'GameBoy',
  Jelte: 'Hulk J',
  Yvonne: 'AudioGirl',
  'Min Ae': 'Han86',
  Marije: 'Belgin',
};

export function weergaveNaam(lid: string): string {
  return ALIASSEN[lid] ?? lid;
}
