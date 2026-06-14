# @midvash/bible-data

> 🌐 [English](./README.md) · [Português (BR)](./README.pt-BR.md) · **Español**

SDK de TypeScript / JavaScript para el dataset [**bible-data**](https://github.com/midvash/bible-data).

Obtén versículos, capítulos y libros de **33 versiones bíblicas de dominio público en 22 idiomas** — KJV, ASV, WEB, Almeida 1819, Luther 1912, Segond 1910, Vulgate, Westminster Leningrad Codex, Textus Receptus y más.

> Desarrollado por [midvash.com](https://midvash.com) — lector y plataforma de estudio bíblico gratuitos.

---

## Instalación

```bash
npm install @midvash/bible-data
```

Requiere Node 18+ (usa `fetch`). Funciona en navegadores y runtimes de edge también.

## Uso

```ts
import { getVerse, getChapter, getBook, getBible } from '@midvash/bible-data';

// Juan 3:16 en la KJV
const verse = await getVerse('kjv', 'John', 3, 16);
console.log(verse.text);
// "For God so loved the world, that he gave his only begotten Son..."

// Todo el capítulo de Juan 3 en la WEB
const chapter = await getChapter('web', 'John', 3);
console.log(`${chapter.verses.length} verses`);

// El libro entero de Génesis en latín (Vulgate)
const genesis = await getBook('vulg', 'Gen');

// La ASV completa como un único objeto (~5MB)
const bible = await getBible('asv');
```

## API

### `getVerse(slug, osisBook, chapter, verse)`

Devuelve un único versículo `{ number, text }`.

### `getChapter(slug, osisBook, chapter)`

Devuelve `{ chapter, verses: [...] }`.

### `getBook(slug, osisBook)`

Devuelve el libro entero con todos los capítulos.

### `getBible(slug)`

Devuelve la Biblia entera como un único objeto grande. Úsalo con moderación — obtén libros o capítulos cuando sea posible.

### `getVersionMetadata(slug)`

Devuelve metadatos: licencia, año, estadísticas, URL de origen, atribución.

### `configure({ baseUrl, fetch })`

Sobrescribe el host de datos o proporciona un `fetch` personalizado (p. ej. para caché, reintentos o pruebas).

```ts
import { configure } from '@midvash/bible-data';

// Fija una versión específica para reproducibilidad
configure({
  baseUrl: 'https://raw.githubusercontent.com/midvash/bible-data/v1.0.0',
});
```

### Constantes

- `ALL_VERSION_SLUGS` — todos los slugs de versión disponibles
- `VERSIONS_BY_LANGUAGE` — agrupados por código de idioma
- `KNOWN_LANGUAGES` — `['ar', 'cs', 'da', ...]`
- `BOOK_IDS` — código de libro OSIS → id numérico de 1-66

## Identificadores de libros

Los parámetros de libro usan **códigos [OSIS](https://wiki.crosswire.org/OSIS_Book_Abbreviations)**:

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

## Versiones disponibles

| Idioma | Versiones |
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

Detalles completos de licencia: [bible-data/SOURCES.md](https://github.com/midvash/bible-data/blob/main/SOURCES.md).

## Licencia

MIT — ver [LICENSE](./LICENSE).

Los **datos de texto** bíblico obtenidos por esta biblioteca siguen la licencia de libre redistribución de cada versión (declarada en su `metadata.json`). Todos los textos del dataset bible-data son de dominio público o están bajo licencia de libre redistribución.

## Relacionados

- [bible-data](https://github.com/midvash/bible-data) — el dataset subyacente
- [bible-cross-references](https://github.com/midvash/bible-cross-references) — referencias cruzadas temáticas curadas
- [Midvash](https://midvash.com) — lector bíblico en línea desarrollado con esta stack

## El ecosistema Midvash

Parte de [**Midvash**](https://midvash.com) — una plataforma gratuita de lectura y estudio bíblico. Todo es abierto y se interconecta:

| | |
|---|---|
| 📖 **Lector (web)** | [midvash.com](https://midvash.com) — 9 idiomas |
| 📱 **App iOS** | [midvash.app/ios](https://midvash.app/ios) |
| 🔌 **API** | [api.midvash.com](https://api.midvash.com) · [`bible-api`](https://github.com/midvash/bible-api) |
| 🤖 **Servidor MCP** | [mcp.midvash.com](https://mcp.midvash.com) · [`bible-mcp`](https://github.com/midvash/bible-mcp) |
| 🧩 **Plugin de WordPress** | [midvash.app/wordpress-plugin](https://midvash.app/wordpress-plugin) · [`bible-wordpress-plugin`](https://github.com/midvash/bible-wordpress-plugin) |
| 🧩 **Plugin de EmDash** | [midvash.app/emdash-plugin](https://midvash.app/emdash-plugin) · [`emdash-plugin-bible`](https://github.com/midvash/emdash-plugin-bible) |
| 🌐 **Extensión de Chrome** | [midvash.app/chrome-extension](https://midvash.app/chrome-extension) · [`bible-chrome-extension`](https://github.com/midvash/bible-chrome-extension) |
| 📦 **Datos abiertos** | [`bible-data`](https://github.com/midvash/bible-data) · [`bible-data-js`](https://github.com/midvash/bible-data-js) · [`bible-cross-references`](https://github.com/midvash/bible-cross-references) |

<sub>Gratuito y abierto, hecho por [Midvash](https://midvash.com) · [midvash.com](https://midvash.com) · [midvash.app](https://midvash.app)</sub>
