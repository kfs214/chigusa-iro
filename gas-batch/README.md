# gas-batch

- [gas-batch](#gas-batch)
  - [Purpose](#purpose)
  - [Requirements](#requirements)
  - [How To Deploy](#how-to-deploy)
  - [How To Use](#how-to-use)
    - [Commands](#commands)
      - [Push](#push)
      - [Open Gas Console](#open-gas-console)
  - [Script Properties](#script-properties)
    - [Property Types](#property-types)
  - [Note](#note)

## Purpose

Batch program running on GAS.

## Requirements

[lambda-api](../lambda-api/README.md) must be hosted as API to pick posts from WPAPI.

## How To Deploy

1. npm install

```sh
npm install
```

2. Install clasp globally (or use `npx` everytime)

```sh
npm install -g @google/clasp
```

3. Log in to Google

```sh
clasp login
```

4. Push & Open

Push code and open console by following `How To Use` > `Commands`

## How To Use

### Commands

#### Push

```sh
npm run push
```

#### Open Gas Console

```sh
npm run open
```

## Script Properties

Some variables are set as Script Properties.\
[Manage script properties manually](https://developers.google.com/apps-script/guides/properties#manage_script_properties_manually)

### Property Types

| property    | description                                                                                                           | example                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| address     | e-mail address sent to                                                                                                | your.email@addre.ss                       |
| apiEndpoint | endpoint to your [CHIgusa-iro app](https://github.com/kfs214/chigusa-iro)                                             | https://your.domain/foo.bar.buz/random    |
| wpEndpoint  | base path to your wpapi                                                                                               | https://your.domain/wp-json               |
| categories  | get posts in catetories. values must be space separated. without this option, filtering by categories to be disabled. | 1 2 5                                     |
| postLimit   | maximum posts to be picked                                                                                            | 3                                         |
| subject     | subject set to e-mails                                                                                                | fantastic posts recommendation!           |
| heading     | this string will be placed before posts information                                                                   | These are recommended posts of this week! |
| footer      | this string will be placed after posts information                                                                    | This is scheduled everyweek!              |

## Note

As the maximum posts per request is limited to 100 by WordPress API,  
`max length of picked posts` set to `100` even if `>100` entered.
