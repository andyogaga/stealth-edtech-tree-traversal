import * as Sentry from '@sentry/node';
const commonWords = [
  'i',
  'a',
  'about',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'com',
  'de',
  'en',
  'for',
  'from',
  'how',
  'in',
  'is',
  'it',
  'la',
  'of',
  'on',
  'or',
  'that',
  'the',
  'this',
  'to',
  'was',
  'what',
  'when',
  'where',
  'who',
  'will',
  'with',
  'und',
  'the',
  'www',
  'identify',
  'diagrams',
  'give',
  'briefly',
  'describe',
  'reference',
  'alternation',
  'prepared',
  'slides',
  'fresh',
  'appropriate',
  'following',
  'state',
  'between',
  'identified',
  'above',
  'compare',
  'relationship',
  'differentiate',
  'define',
  "it's",
  'discuss',
  'which',
  'imortance',
  'against',
  'list',
  'carry-out',
  'large',
  'explain',
  'action',
  'terms',
  'investigate',
  'function',
  'effects',
  'such as',
  'uses',
  'rate',
  'converts',
  'relate',
  'their',
  'outline',
  'them',
  'illustrate',
  'though',
  'role',
  'characteristics',
  'including',
  'during',
  'example',
  'use',
  'using',
  'give',
  'simply',
  'meant',
  'found',
  'transfer',
  'how',
  'inserted',
  'distinguish',
  'predict',
  'expected',
  'solve',
  'there',
  'name',
  'may',
  'factors',
  'examples',
  'within',
  'evaluate',
  'reasons',
  'function',
];

export const generateKeywords = (inputText: string): string[] => {
  return Array.from(
    new Set(
      inputText
        .replace(/[^a-zA-Z0-9 _]+/g, '')
        .split(' ')
        .filter((word: string) => {
          return !commonWords
            .map(commonWord => commonWord.toLowerCase())
            .includes(word.toLowerCase());
        }),
    ),
  );
};

export const logError = (error: Error): void => {
  Sentry.captureException(error);
};
