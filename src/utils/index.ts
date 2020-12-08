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
  'seen',
  'under',
  'list',
  'simple',
];

export const generateKeywords = (inputText: string): string[] => {
  const splitted = inputText.replace(/[^a-zA-Z0-9 _]+/g, '').split(' ');
  // Make use of a customized array chunk
  const bigArray = [];
  let smallArray = [];
  let index = 0;
  while (index < splitted.length) {
    if (commonWords.includes(splitted[index].toLowerCase())) {
      if (smallArray.length > 0) bigArray.push(smallArray);
      smallArray = [];
    } else {
      smallArray.push(splitted[index]);
      if (index + 1 === splitted.length && smallArray.length > 0) {
        bigArray.push(smallArray);
      }
    }
    index++;
  }
  const newKeywords = bigArray.map(arrayWord => arrayWord.join(' '));

  return Array.from(new Set(newKeywords));
};

export const logError = (error: Error): void => {
  Sentry.captureException(error);
};
