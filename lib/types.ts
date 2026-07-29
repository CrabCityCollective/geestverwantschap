export interface Beoordeling {
  sterren: number;
  quote: string;
}

export interface Boek {
  titel: string;
  auteur: string;
  landVanHerkomstAuteur: string;
  geslachtAuteur: string;
  uitgekozenDoor: string;
  genre?: string;
  landSetting?: string;
  tijdSetting?: string;
  jaartalEersteDruk: number;
  datumGelezen?: string;
  locatieBespreking?: string;
  beoordelingen: Record<string, Beoordeling>;
}

export interface BoekenclubData {
  leden: string[];
  genres: string[];
  boeken: Boek[];
}

export interface Telling {
  label: string;
  aantal: number;
}
