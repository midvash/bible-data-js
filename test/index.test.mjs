// Runs against the built package (npm run build first). No network: fetch is mocked.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  configure,
  getVersionMetadata,
  getVerse,
  ALL_VERSION_SLUGS,
  KNOWN_LANGUAGES,
  VERSIONS_BY_LANGUAGE,
} from '../dist/index.js';

let calls;

function mockFetch(routes) {
  return async (url) => {
    calls.push(url);
    const path = url.replace('https://example.test', '');
    if (!(path in routes)) return new Response('not found', { status: 404 });
    return new Response(JSON.stringify(routes[path]), { status: 200 });
  };
}

const kjvMeta = { slug: 'kjv', language: 'en', license: 'public-domain' };
const john = {
  version: 'kjv',
  book: 'John',
  bookId: 43,
  englishName: 'John',
  testament: 'NT',
  chapters: [{ chapter: 3, verses: [{ number: 16, text: 'For God so loved the world' }] }],
};

beforeEach(() => {
  calls = [];
  configure({
    baseUrl: 'https://example.test',
    fetch: mockFetch({
      '/versions/en/kjv/metadata.json': kjvMeta,
      '/versions/en/kjv/books/John.json': john,
    }),
  });
});

test('getVersionMetadata makes one request, straight to the right language', async () => {
  assert.deepEqual(await getVersionMetadata('kjv'), kjvMeta);
  assert.deepEqual(calls, ['https://example.test/versions/en/kjv/metadata.json']);
});

test('getVersionMetadata is cached per slug', async () => {
  await getVersionMetadata('kjv');
  await Promise.all([getVersionMetadata('kjv'), getVersionMetadata('kjv')]);
  assert.equal(calls.length, 1);
});

test('configure clears the cache', async () => {
  await getVersionMetadata('kjv');
  configure({ baseUrl: 'https://example.test' });
  await getVersionMetadata('kjv');
  assert.equal(calls.length, 2);
});

test('failed requests are not cached', async () => {
  configure({ fetch: async (url) => (calls.push(url), new Response('x', { status: 503 })) });
  await assert.rejects(getVersionMetadata('kjv'), /503/);
  configure({ fetch: mockFetch({ '/versions/en/kjv/metadata.json': kjvMeta }) });
  assert.deepEqual(await getVersionMetadata('kjv'), kjvMeta);
});

test('getVerse fetches only the book file', async () => {
  const v = await getVerse('kjv', 'John', 3, 16);
  assert.equal(v.text, 'For God so loved the world');
  assert.deepEqual(calls, ['https://example.test/versions/en/kjv/books/John.json']);
});

test('unknown slug fails without any request', async () => {
  await assert.rejects(getVersionMetadata('dansk1931'), /Unknown version slug: dansk1931/);
  await assert.rejects(getVerse('nope', 'John', 3, 16), /Unknown version slug: nope/);
  assert.equal(calls.length, 0);
});

test('version registry: 32 versions in 21 languages, no dansk1931', () => {
  assert.equal(ALL_VERSION_SLUGS.length, 32);
  assert.equal(new Set(ALL_VERSION_SLUGS).size, 32);
  assert.equal(KNOWN_LANGUAGES.length, 21);
  assert.deepEqual(Object.keys(VERSIONS_BY_LANGUAGE).sort(), [...KNOWN_LANGUAGES].sort());
  assert.ok(!ALL_VERSION_SLUGS.includes('dansk1931'));
});
