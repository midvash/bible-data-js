/**
 * @midvash.com/bible-data — TypeScript SDK for the bible-data dataset.
 *
 * Fetches verses, chapters, books, and full Bibles from 33 public-domain
 * Bible versions across 23 languages, hosted at github.com/midvash/bible-data.
 *
 * @example
 *   import { getVerse } from '@midvash.com/bible-data';
 *   const verse = await getVerse('kjv', 'John', 3, 16);
 *   console.log(verse.text); // "For God so loved the world..."
 */

export type LicenseTag =
  | 'public-domain'
  | 'cc0'
  | 'cc-by'
  | 'cc-by-sa'
  | 'wlc-license';

export type Testament = 'OT' | 'NT';

export interface Verse {
  number: number;
  text: string;
}

export interface Chapter {
  chapter: number;
  verses: Verse[];
}

export interface Book {
  book: string;
  bookId: number;
  englishName: string;
  testament: Testament;
  chapters: Chapter[];
}

export interface BibleFile {
  version: string;
  name: string;
  language: string;
  license: LicenseTag;
  books: Book[];
}

export interface VersionMetadata {
  slug: string;
  shortName: string;
  name: string;
  language: string;
  year: number;
  license: LicenseTag;
  licenseNote: string;
  attribution: string | null;
  sourceUrl: string | null;
  stats: { books: number; chapters: number; verses: number };
  readerUrl: string;
  schema: string;
}

const DEFAULT_BASE_URL =
  'https://raw.githubusercontent.com/midvash/bible-data/main';

export interface ClientOptions {
  /** Override the base URL (default: midvash/bible-data on main). Useful for pinning a release tag, mirroring, or testing. */
  baseUrl?: string;
  /** Custom fetch implementation (defaults to global fetch). */
  fetch?: typeof fetch;
}

let _options: Required<ClientOptions> = {
  baseUrl: DEFAULT_BASE_URL,
  fetch: globalThis.fetch.bind(globalThis),
};

/** Configure global client options (base URL, custom fetch). */
export function configure(options: ClientOptions): void {
  _options = {
    baseUrl: options.baseUrl ?? _options.baseUrl,
    fetch: options.fetch ?? _options.fetch,
  };
}

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${_options.baseUrl}${path}`;
  const res = await _options.fetch(url);
  if (!res.ok) {
    throw new Error(`bible-data fetch failed (${res.status}) for ${url}`);
  }
  return (await res.json()) as T;
}

/**
 * Look up the directory for a version slug — `versions/<lang>/<slug>/`.
 * Needs the version's language; resolves it from the version registry on miss.
 */
async function resolveLang(slug: string): Promise<string> {
  const meta = await getVersionMetadata(slug);
  return meta.language;
}

/** Returns metadata for a single version (license, stats, year, etc). */
export async function getVersionMetadata(slug: string): Promise<VersionMetadata> {
  for (const lang of KNOWN_LANGUAGES) {
    try {
      return await fetchJson<VersionMetadata>(
        `/versions/${lang}/${slug}/metadata.json`
      );
    } catch {
      // try next lang
    }
  }
  throw new Error(`Unknown version slug: ${slug}`);
}

/**
 * Fetches a single book (e.g. `getBook('kjv', 'John')`).
 * Book code uses OSIS — see https://wiki.crosswire.org/OSIS_Book_Abbreviations
 */
export async function getBook(slug: string, osisBook: string): Promise<Book> {
  const lang = await resolveLang(slug);
  const file = await fetchJson<Book & { version: string }>(
    `/versions/${lang}/${slug}/books/${osisBook}.json`
  );
  return file;
}

/** Fetches a single chapter of a book. */
export async function getChapter(
  slug: string,
  osisBook: string,
  chapter: number
): Promise<Chapter> {
  const book = await getBook(slug, osisBook);
  const ch = book.chapters.find((c) => c.chapter === chapter);
  if (!ch) {
    throw new Error(`Chapter ${chapter} not found in ${osisBook} (${slug})`);
  }
  return ch;
}

/** Fetches a single verse. */
export async function getVerse(
  slug: string,
  osisBook: string,
  chapter: number,
  verse: number
): Promise<Verse> {
  const ch = await getChapter(slug, osisBook, chapter);
  const v = ch.verses.find((x) => x.number === verse);
  if (!v) {
    throw new Error(`${osisBook} ${chapter}:${verse} not found in ${slug}`);
  }
  return v;
}

/** Fetches the entire Bible for a version as a single object (large — ~5-10MB). */
export async function getBible(slug: string): Promise<BibleFile> {
  const lang = await resolveLang(slug);
  return fetchJson<BibleFile>(`/versions/${lang}/${slug}/${slug}.json`);
}

/** Languages with at least one version in bible-data. */
export const KNOWN_LANGUAGES = [
  'ar', 'cs', 'da', 'de', 'en', 'eo', 'fr', 'gr', 'he',
  'hu', 'it', 'la', 'nb', 'nl', 'pl', 'pt', 'ro', 'ru',
  'sv', 'uk', 'vi', 'zh',
] as const;

export type KnownLanguage = (typeof KNOWN_LANGUAGES)[number];

/** Slugs of all available versions, grouped by language. */
export const VERSIONS_BY_LANGUAGE: Record<KnownLanguage, readonly string[]> = {
  ar: ['svd'],
  cs: ['bkr'],
  da: ['dansk1931'],
  de: ['luth1912', 'elb1905'],
  en: ['kjv', 'asv', 'web', 'geneva1599', 'dra'],
  eo: ['lsb'],
  fr: ['lsg', 'darby-fr', 'martin1744'],
  gr: ['tr'],
  he: ['wlc', 'aleppo'],
  hu: ['kar'],
  it: ['diodati', 'riveduta'],
  la: ['vulg', 'clem'],
  nb: ['nb1930'],
  nl: ['dutch1917'],
  pl: ['bg'],
  pt: ['almeida-livre'],
  ro: ['vdc'],
  ru: ['synodal'],
  sv: ['sv1917'],
  uk: ['kp'],
  vi: ['vi1934'],
  zh: ['cuv', 'cuvs'],
};

/** Flat list of every version slug. */
export const ALL_VERSION_SLUGS: readonly string[] = Object.values(
  VERSIONS_BY_LANGUAGE
).flat();

/** OSIS code → 1-66 book id, useful for cross-referencing with raw SQLite data. */
export const BOOK_IDS: Record<string, number> = {
  Gen: 1,   Exod: 2,  Lev: 3,   Num: 4,   Deut: 5,
  Josh: 6,  Judg: 7,  Ruth: 8,  '1Sam': 9,  '2Sam': 10,
  '1Kgs': 11, '2Kgs': 12, '1Chr': 13, '2Chr': 14, Ezra: 15,
  Neh: 16,  Esth: 17, Job: 18,  Ps: 19,   Prov: 20,
  Eccl: 21, Song: 22, Isa: 23,  Jer: 24,  Lam: 25,
  Ezek: 26, Dan: 27,  Hos: 28,  Joel: 29, Amos: 30,
  Obad: 31, Jonah: 32, Mic: 33, Nah: 34,  Hab: 35,
  Zeph: 36, Hag: 37,  Zech: 38, Mal: 39,
  Matt: 40, Mark: 41, Luke: 42, John: 43, Acts: 44,
  Rom: 45,  '1Cor': 46, '2Cor': 47, Gal: 48, Eph: 49,
  Phil: 50, Col: 51,  '1Thess': 52, '2Thess': 53, '1Tim': 54,
  '2Tim': 55, Titus: 56, Phlm: 57, Heb: 58, Jas: 59,
  '1Pet': 60, '2Pet': 61, '1John': 62, '2John': 63, '3John': 64,
  Jude: 65, Rev: 66,
};
