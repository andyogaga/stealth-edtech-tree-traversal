### Installation

- First intsall node and npm. Get installation instructions from https://nodejs.org/
- Install typescript globally using _npm i -g typescript_
- Clone the repo from `https://github.com/andyogaga/stealth-edtech-tree-traversal.git`
- Install all packages using `yarn` or `yarn install`
-

### Routes

### - Base route: 
`\_{baseUrl}`

### - Search route:
```
\_{baseUrl}/search?topic=State that large molecules are synthesised from smaller basic units

(The topic can be encoded)
```

### - Deeper Search route: 
```
\_{baseUrl}/search?exact=false&topic=State that large molecules are synthesised from smaller basic units

For a deeper search for more questions using keyword substring search in the question annotations.
To accomplish this feature, add `exact=false` as a query in the Search route
```

### - Upload Questions 

```
\_{baseUrl}/question/create-batch

Format for Uploading Questions in .xlsx
A: 'questionNumber',
B: 'annotation1',
C: 'annotation2',
...
Sheet name => Questions
```

### - Upload Topics 

```
\_{baseUrl}/topic/create-batch

Format for Uploading Topics in .xlsx
A: 'topic1',
B: 'topic2',
C: 'topic3',
...
Sheet name  => Topics
```

### Tests

### End to End Tests

`yarn test:e2e`

### Unit and Integration Tests

`yarn test`

### Test Coverage

`yarn test:cov`

See below the present test coverage for the project

--------------------------|---------|----------|---------|---------|-------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------------|---------|----------|---------|---------|-------------------
All files                 |   90.82 |    79.82 |   87.76 |   93.79 | 
 dist/src/models/question |     100 |      100 |     100 |     100 | 
  question.js             |     100 |      100 |     100 |     100 | 
  question.model.js       |     100 |      100 |     100 |     100 | 
 dist/src/models/topic    |     100 |      100 |     100 |     100 | 
  topic.js                |     100 |      100 |     100 |     100 | 
  topic.model.js          |     100 |      100 |     100 |     100 | 
 dist/src/services        |   97.18 |    88.89 |   96.15 |     100 | 
  question.services.js    |   91.67 |    88.89 |   90.91 |     100 | 3,12
  topic.services.js       |     100 |    88.89 |     100 |     100 | 12,97
 dist/src/utils           |   51.52 |    51.85 |      50 |   61.54 | 
  index.js                |   51.52 |    51.85 |      50 |   61.54 | 3-7,10-12,16-19  
 src/models/question      |     100 |      100 |     100 |     100 | 
  question.model.ts       |     100 |      100 |     100 |     100 | 
  question.ts             |     100 |      100 |     100 |     100 | 
 src/models/topic         |     100 |      100 |     100 |     100 | 
  topic.model.ts          |     100 |      100 |     100 |     100 | 
  topic.ts                |     100 |      100 |     100 |     100 | 
 src/services             |     100 |       85 |     100 |     100 | 
  question.services.ts    |     100 |      100 |     100 |     100 | 
  topic.services.ts       |     100 |       85 |     100 |     100 | 120
 src/utils                |     100 |      100 |     100 |     100 | 
  index.ts                |     100 |      100 |     100 |     100 | 
--------------------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       23 passed, 23 total
Snapshots:   0 total
Time:        16.387 s
Ran all test suites.
Done in 18.37s.

```
