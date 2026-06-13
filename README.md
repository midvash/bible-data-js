# @midvash/bible-data

TypeScript / JavaScript SDK for the [**bible-data**](https://github.com/midvash/bible-data) dataset.

Fetch verses, chapters, and books from **33 public-domain Bible versions across 23 languages** — KJV, ASV, WEB, Almeida 1819, Luther 1912, Segond 1910, Vulgate, Westminster Leningrad Codex, Textus Receptus, and more.

> Powered by [midvash.com](https://midvash.com) — free Bible reader and study platform.

---

## Install

```bash
npm install @midvash/bible-data
```

Requires Node 18+ (uses `fetch`). Works in browsers and edge runtimes too.

## Usage

```ts
import { getVerse, getChapter, getBook, getBible } from '@midvash/bible-data';

// John 3:16 in the KJV
const verse = await getVerse('kjv', 'John', 3, 16);
console.log(verse.text);
// "For God so loved the world, that he gave his only begotten Son..."

// All of John 3 in the WEB
const chapter = await getChapter('web', 'John', 3);
console.log(`${chapter.verses.length} verses`);

// The whole book of Genesis in Latin (Vulgate)
const genesis = await getBook('vulg', 'Gen');

// The full ASV as one object (~5MB)
const bible = await getBible('asv');
```

## API

### `getVerse(slug, osisBook, chapter, verse)`

Returns a single `{ number, text }` verse.

### `getChapter(slug, osisBook, chapter)`

Returns `{ chapter, verses: [...] }`.

### `getBook(slug, osisBook)`

Returns the whole book with all chapters.

### `getBible(slug)`

Returns the entire Bible as one large object. Use sparingly — fetch books or chapters when possible.

### `getVersionMetadata(slug)`

Returns metadata: license, year, stats, source URL, attribution.

### `configure({ baseUrl, fetch })`

Override the data host or supply a custom `fetch` (e.g. for caching, retries, or testing).

```ts
import { configure } from '@midvash/bible-data';

// Pin to a specific release for reproducibility
configure({
  baseUrl: 'https://raw.githubusercontent.com/midvash/bible-data/v1.0.0',
});
```

### Constants

- `ALL_VERSION_SLUGS` — every available version slug
- `VERSIONS_BY_LANGUAGE` — grouped by language code
- `KNOWN_LANGUAGES` — `['ar', 'cs', 'da', ...]`
- `BOOK_IDS` — OSIS book code → 1-66 numeric id

## Book identifiers

Book parameters use **[OSIS](https://wiki.crosswire.org/OSIS_Book_Abbreviations) codes**:

```
Gen   Exod  Lev   Num   Deut  Josh  Judg  Ruth
1Sam  2Sam  1Kgs  2Kgs  1Chr  2Chr  Ezra  Neh
Esth  Job   Ps    Prov  Eccl  Song  Isa   Jer
Lam   Ezek  Dan   Hos   Joel  Amos  Obad  Jonah
Mic   Nah   Hab   Zeph  Hag   Zech  Mal
Matt  Mark  Luke  John  Acts  Rom   1Cor  2Cor
Gal   Eph   Phil  Col   1Thess 2Thess 1Tim 2Tim
Titus Phlm  Heb   Jas   1Pet  2Pet  1John 2John
3John Jude  Rev
```

## Available versions

| Lang | Versions |
|------|----------|
| en   | `kjv`, `asv`, `web`, `geneva1599`, `dra` |
| pt   | `almeida-livre` |
| de   | `luth1912`, `elb1905` |
| fr   | `lsg`, `darby-fr`, `martin1744` |
| it   | `diodati`, `riveduta` |
| nl   | `dutch1917` |
| ru   | `synodal` |
| uk   | `kp` |
| pl   | `bg` |
| cs   | `bkr` |
| hu   | `kar` |
| ro   | `vdc` |
| da   | `dansk1931` |
| sv   | `sv1917` |
| nb   | `nb1930` |
| eo   | `lsb` |
| zh   | `cuv`, `cuvs` |
| ar   | `svd` |
| vi   | `vi1934` |
| he   | `wlc`, `aleppo` |
| gr   | `tr` |
| la   | `vulg`, `clem` |

Full licensing details: [bible-data/SOURCES.md](https://github.com/midvash/bible-data/blob/main/SOURCES.md).

## License

MIT — see [LICENSE](./LICENSE).

The Bible **text data** fetched by this library follows each version's own free-redistribution license (declared in its `metadata.json`). All texts in the bible-data dataset are public domain or under a free-redistribution license.

## Related

- [bible-data](https://github.com/midvash/bible-data) — the underlying dataset
- [bible-cross-references](https://github.com/midvash/bible-cross-references) — curated thematic cross-references
- [Midvash](https://midvash.com) — online Bible reader powered by this stack

## The Midvash ecosystem

Part of [**Midvash**](https://midvash.com) — a free Bible reading & study platform. Everything is open and interlinks:

| | |
|---|---|
| 📖 **Reader (web)** | [midvash.com](https://midvash.com) — 9 languages |
| 📱 **iOS app** | [midvash.app/ios](https://midvash.app/ios) |
| 🔌 **API** | [api.midvash.com](https://api.midvash.com) · [`bible-api`](https://github.com/midvash/bible-api) |
| 🤖 **MCP server** | [mcp.midvash.com](https://mcp.midvash.com) · [`bible-mcp`](https://github.com/midvash/bible-mcp) |
| 🧩 **WordPress plugin** | [midvash.app/wordpress-plugin](https://midvash.app/wordpress-plugin) · [`bible-by-midvash`](https://github.com/midvash/bible-by-midvash) |
| 🧩 **EmDash plugin** | [midvash.app/emdash-plugin](https://midvash.app/emdash-plugin) · [`emdash-plugin-bible`](https://github.com/midvash/emdash-plugin-bible) |
| 🌐 **Chrome extension** | [midvash.app/chrome-extension](https://midvash.app/chrome-extension) · [`bible-chrome-extension`](https://github.com/midvash/bible-chrome-extension) |
| 📦 **Open data** | [`bible-data`](https://github.com/midvash/bible-data) · [`bible-data-js`](https://github.com/midvash/bible-data-js) · [`bible-cross-references`](https://github.com/midvash/bible-cross-references) |

<sub>Free & open, built by [Midvash](https://midvash.com) · [midvash.com](https://midvash.com) · [midvash.app](https://midvash.app)</sub>
