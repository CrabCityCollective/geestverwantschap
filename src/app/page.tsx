import { promises as fs } from "fs";
import path from "path";

type Beoordeling = {
  sterren: number;
  quote: string;
};

type Boek = {
  titel: string;
  auteur: string;
  landVanHerkomstAuteur: string;
  geslachtAuteur: string;
  genre: string;
  landSetting: string;
  tijdSetting: string;
  jaartalEersteDruk: number;
  beoordelingen: Record<string, Beoordeling>;
};

type BoekenclubData = {
  leden: string[];
  genres: string[];
  boeken: Boek[];
};

async function getBoekenclubData(): Promise<BoekenclubData> {
  const filePath = path.join(process.cwd(), "data", "books.json");
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export default async function Home() {
  const { leden, genres, boeken } = await getBoekenclubData();

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-12 sm:p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Geestverwantschap</h1>
        <p className="mt-4 text-lg">Administratie van de boekenclub.</p>
      </div>

      <section className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold">Leden ({leden.length})</h2>
        <p className="mt-2">{leden.join(", ")}</p>
      </section>

      <section className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold">Genres</h2>
        <p className="mt-2">{genres.join(", ")}</p>
      </section>

      <section className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold">Gelezen boeken ({boeken.length})</h2>
        {boeken.length === 0 ? (
          <p className="mt-2">
            Nog geen boeken toegevoegd. Vul <code>data/books.json</code> aan om ze hier te zien.
          </p>
        ) : (
          <ul className="mt-2 flex flex-col gap-4">
            {boeken.map((boek) => (
              <li key={boek.titel} className="rounded border border-black/10 p-4 dark:border-white/20">
                <h3 className="font-semibold">{boek.titel}</h3>
                <p>
                  {boek.auteur} &middot; {boek.genre} &middot; {boek.jaartalEersteDruk}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
