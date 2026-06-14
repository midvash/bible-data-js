# @midvash/bible-data

> 🌐 [English](./README.md) · **Português (BR)** · [Español](./README.es.md)

SDK em TypeScript / JavaScript para o dataset [**bible-data**](https://github.com/midvash/bible-data).

Busque versículos, capítulos e livros de **33 versões bíblicas de domínio público em 22 idiomas** — KJV, ASV, WEB, Almeida 1819, Luther 1912, Segond 1910, Vulgate, Westminster Leningrad Codex, Textus Receptus e mais.

> Desenvolvido por [midvash.com](https://midvash.com) — leitor e plataforma de estudo bíblico gratuitos.

---

## Instalação

```bash
npm install @midvash/bible-data
```

Requer Node 18+ (usa `fetch`). Funciona em navegadores e runtimes de edge também.

## Uso

```ts
import { getVerse, getChapter, getBook, getBible } from '@midvash/bible-data';

// João 3:16 na KJV
const verse = await getVerse('kjv', 'John', 3, 16);
console.log(verse.text);
// "For God so loved the world, that he gave his only begotten Son..."

// Todo o capítulo de João 3 na WEB
const chapter = await getChapter('web', 'John', 3);
console.log(`${chapter.verses.length} verses`);

// O livro inteiro de Gênesis em latim (Vulgate)
const genesis = await getBook('vulg', 'Gen');

// A ASV completa como um único objeto (~5MB)
const bible = await getBible('asv');
```

## API

### `getVerse(slug, osisBook, chapter, verse)`

Retorna um único versículo `{ number, text }`.

### `getChapter(slug, osisBook, chapter)`

Retorna `{ chapter, verses: [...] }`.

### `getBook(slug, osisBook)`

Retorna o livro inteiro com todos os capítulos.

### `getBible(slug)`

Retorna a Bíblia inteira como um único objeto grande. Use com moderação — busque livros ou capítulos quando possível.

### `getVersionMetadata(slug)`

Retorna metadados: licença, ano, estatísticas, URL de origem, atribuição.

### `configure({ baseUrl, fetch })`

Sobrescreve o host de dados ou fornece um `fetch` customizado (ex.: para cache, retentativas ou testes).

```ts
import { configure } from '@midvash/bible-data';

// Fixe em um release específico para reprodutibilidade
configure({
  baseUrl: 'https://raw.githubusercontent.com/midvash/bible-data/v1.0.0',
});
```

### Constantes

- `ALL_VERSION_SLUGS` — todos os slugs de versão disponíveis
- `VERSIONS_BY_LANGUAGE` — agrupados por código de idioma
- `KNOWN_LANGUAGES` — `['ar', 'cs', 'da', ...]`
- `BOOK_IDS` — código de livro OSIS → id numérico de 1-66

## Identificadores de livros

Os parâmetros de livro usam **códigos [OSIS](https://wiki.crosswire.org/OSIS_Book_Abbreviations)**:

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

## Versões disponíveis

| Idioma | Versões |
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

Detalhes completos de licenciamento: [bible-data/SOURCES.md](https://github.com/midvash/bible-data/blob/main/SOURCES.md).

## Licença

MIT — veja [LICENSE](./LICENSE).

Os **dados de texto** bíblico buscados por esta biblioteca seguem a licença de livre redistribuição de cada versão (declarada no seu `metadata.json`). Todos os textos do dataset bible-data são de domínio público ou estão sob licença de livre redistribuição.

## Relacionados

- [bible-data](https://github.com/midvash/bible-data) — o dataset subjacente
- [bible-cross-references](https://github.com/midvash/bible-cross-references) — referências cruzadas temáticas curadas
- [Midvash](https://midvash.com) — leitor bíblico online desenvolvido com esta stack

## O ecossistema Midvash

Faz parte do [**Midvash**](https://midvash.com) — uma plataforma gratuita de leitura e estudo bíblico. Tudo é aberto e se interliga:

| | |
|---|---|
| 📖 **Leitor (web)** | [midvash.com](https://midvash.com) — 9 idiomas |
| 📱 **App iOS** | [midvash.app/ios](https://midvash.app/ios) |
| 🔌 **API** | [api.midvash.com](https://api.midvash.com) · [`bible-api`](https://github.com/midvash/bible-api) |
| 🤖 **Servidor MCP** | [mcp.midvash.com](https://mcp.midvash.com) · [`bible-mcp`](https://github.com/midvash/bible-mcp) |
| 🧩 **Plugin WordPress** | [midvash.app/wordpress-plugin](https://midvash.app/wordpress-plugin) · [`bible-wordpress-plugin`](https://github.com/midvash/bible-wordpress-plugin) |
| 🧩 **Plugin EmDash** | [midvash.app/emdash-plugin](https://midvash.app/emdash-plugin) · [`emdash-plugin-bible`](https://github.com/midvash/emdash-plugin-bible) |
| 🌐 **Extensão Chrome** | [midvash.app/chrome-extension](https://midvash.app/chrome-extension) · [`bible-chrome-extension`](https://github.com/midvash/bible-chrome-extension) |
| 📦 **Dados abertos** | [`bible-data`](https://github.com/midvash/bible-data) · [`bible-data-js`](https://github.com/midvash/bible-data-js) · [`bible-cross-references`](https://github.com/midvash/bible-cross-references) |

<sub>Gratuito e aberto, feito pela [Midvash](https://midvash.com) · [midvash.com](https://midvash.com) · [midvash.app](https://midvash.app)</sub>
