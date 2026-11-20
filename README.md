# DSO · Digitální správa objektů

[Otevřít interaktivní náhled](https://michalmachalik.github.io/DSO/)

DSO je zakázková offline aplikace pro technické kontroly objektů v Androidu. Tento repozitář obsahuje webový náhled rozhraní verze V104, jeho zdrojový kód a fiktivní záznamy. Zdrojový kód zakázkové aplikace je neveřejný.

## Od kontroly k protokolu

1. V části **Práce** vyhledejte objekt podle ulice nebo čísla a otevřete kontrolu.
2. Zapište stav vybavení nebo odečet měřidla. K fotografiím lze přidat samostatné popisy. Rozpracovanou kontrolu lze uložit a později v ní pokračovat.
3. Kontrolu můžete uzavřít i s nevyplněnými položkami. Po potvrzení a podpisu otevřete v historii protokol a stáhněte PDF nebo fotolist.

## Jak náhled pracuje s daty

| Oblast | Chování |
| --- | --- |
| Šablony | Výchozí šablona má 9 kategorií a 54 kontrolních objektů. Nová kontrola použije aktuální šablonu. Rozpracovaná si uchová vlastní kopii. |
| Uložení | Rozpracované a uzavřené kontroly, nastavení a vzhled se uchovávají v prohlížeči. Vymazání dat webu vrátí výchozí stav. |
| Rozhraní | Světlé a tmavé téma, spodní navigace a přizpůsobení šířce displeje. Výchozí rámeček odpovídá 411 × 914 logickým bodům. |
| Funkce zařízení | Přihlášení a upozornění mají názornou podobu. Oprávnění Androidu, systémový fotoaparát, notifikace a šifrované zálohy obsluhuje nativní aplikace. Web vytváří PDF ze zobrazených fiktivních údajů a podpisu. |

## Lokální spuštění a testy

Spusťte z kořene repozitáře v Node.js 22 nebo novějším. [Otevřít localhost](http://127.0.0.1:4174/)

```sh
node scripts/serve-demo.mjs 4174
```

V dalším terminálu lze ověřit datový model a sestavit balíček pro GitHub Pages.

```sh
node --test tests/*.test.mjs
node scripts/build-preview.mjs
```

Sestavení vyžaduje prázdný nebo dosud nevytvořený adresář `_site/`. Obsahuje pouze soubory nutné k provozu náhledu. [Kód rozhraní a generování PDF](app/) · [Datové testy](tests/) · [Scénáře pro prohlížeč](e2e/)

## Licence

[Licence náhledu](LICENSE). Písma Roboto a Noto Serif a ikony Material mají vlastní licenční texty v [assets/](assets/).
