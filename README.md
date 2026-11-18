# DSO — Digitální správa objektů

Offline Android aplikace pro technické kontroly a správu objektů.

[Otevřít interaktivní ukázku DSO](https://michalmachalik.github.io/DSO/)

## Náhled Android rozhraní

Základem náhledu je rozhraní Android verze V104. Náhled používá Roboto, Noto Serif, Material ikony a světlou i tmavou paletu z Android aplikace. Rámeček má logické rozlišení 411 × 914 bodů. Na menším zařízení se rozhraní přizpůsobí dostupné šířce.

- Přihlášení, hlavní nabídka, Práce, Rozpracované a Historie.
- Nastavení v třech sloupcích, přehled kontroly s deseti navigačními dlaždicemi.
- 9 výchozích kategorií a 54 kontrolních objektů; řazení, přesouvání, úpravy a koš.
- Nové kontroly používají upravenou šablonu, rozpracovaná ukázka si drží vlastní otisk.
- Vyhledávání od prvního znaku celé ulice nebo čísla, bez ohledu na diakritiku.
- Automatické sbalení předchozí sekce a posun nové sekce nahoru.
- Samostatné popisy fotografií, označení, zrušení neuložených úprav.
- Měřidla s názvem, výrobním číslem a odečtem.
- Uzavření neúplné kontroly po potvrzení a podpisu, prohlížení a stažení protokolu i fotolistu.
- Upozornění s nastavitelnými časy, přepínači a seznamem restů.
- Výběrové mazání protokolů i mazání od data s potvrzením.
- Světlý a tmavý vzhled, dialogy a spodní navigace podle Androidu.

## Hranice ukázky

Ukázka používá fiktivní záznamy a ilustrační fotografie. Rozpracované a uzavřené kontroly i preference vzhledu se ukládají v tomto prohlížeči. Vymazání dat webu obnoví výchozí ukázku.

Heslová pole jsou součástí názorného přihlášení. Android aplikace zajišťuje systémová oprávnění, fotoaparát, správu účtů, skutečná upozornění, tisk a šifrované zálohy. Ukázka vytváří vlastní PDF se zobrazenými fiktivními údaji a podpisem.

Webové vykreslení a systémové prvky se mohou nepatrně lišit podle rozlišení, systémového písma a jeho nastaveného zvětšení. Náhled používá výchozí měřítko písma.

Repozitář neobsahuje produkční zdrojový kód, databáze, přístupové údaje ani instalační balíčky. Nezadávejte zákaznické nebo jiné soukromé údaje.

## Spuštění a testy

Spusťte server v Node.js 22 nebo novějším a otevřete `http://127.0.0.1:4174/`.

```sh
node scripts/serve-demo.mjs 4174
```

Testy a sestavení spusťte v samostatném terminálu.

```sh
node --test tests/*.test.mjs
node scripts/build-preview.mjs
```

Server poslouchá pouze na lokální adrese. Balíček pro Pages vzniká do prázdného adresáře `_site/` a obsahuje jen veřejné runtime soubory. UI regresní scénáře v `e2e/` se ověřují v GitHub Actions v šířkách 320, 390 a 411 bodů. Zachycují také snímky obou barevných režimů.

## Licence

Viz [LICENSE](LICENSE). Písma Roboto a Noto Serif a Material ikony mají vlastní licence přiložené v `assets/`.
