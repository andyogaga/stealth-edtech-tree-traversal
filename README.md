### Installation

- First intsall node and npm. Get installation instructions from https://nodejs.org/
- Install typescript globally using _npm i -g typescript_
- Clone the repo from `https://github.com/andyogaga/stealth-edtech-tree-traversal.git`
- Install all packages using `yarn` or `yarn install`
-

### Routes

- Base route: \_{baseUrl}
- Search route: \_{baseUrl}/search
- Upload Questions \_{baseUrl}/question/create-batch

```
Format for Uploading Questions in .xlsx
```

A: 'questionNumber',
B: 'annotation1',
C: 'annotation2',
...

Sheet name => Questions

```

- Upload Topics \_{baseUrl}/topic/create-batch
```

Format for Uploading Questions in .xlsx

```
A: 'topic1',
B: 'topic2',
C: 'topic3',
...

Sheet name  => Topics


```

For a deeper search for more questions, we could make use of topic substring search in the Questions annotations.
To accomplish this feature, a new route is created. This will populate more matched questions.

```

### Tests

### End to End Tests

`yarn test:e2e`

### Unit and Integration Tests

`yarn test`

### Test Coverage

`yarn test:cov`

See below the present test coverage for the project

-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------|---------|----------|---------|---------|-------------------
All files              |     100 |    83.33 |     100 |     100 |
 models/question       |     100 |      100 |     100 |     100 |
  question.model.ts    |     100 |      100 |     100 |     100 |
  question.ts          |     100 |      100 |     100 |     100 |
 models/topic          |     100 |      100 |     100 |     100 |
  topic.model.ts       |     100 |      100 |     100 |     100 |
  topic.ts             |     100 |      100 |     100 |     100 |
 services              |     100 |    83.33 |     100 |     100 |
  question.services.ts |     100 |      100 |     100 |     100 |
  topic.services.ts    |     100 |    83.33 |     100 |     100 | 88
 utils                 |     100 |      100 |     100 |     100 |
  index.ts             |     100 |      100 |     100 |     100 |
-----------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        7.434 s
Ran all test suites.
Done in 8.93s.
```
