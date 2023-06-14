# lambda-api

## Purpose

lambda-api is an API that retrieves posts from wpapi.\
It is designed to run on AWS Lambda and can be called from [gas-batch](../gas-batch/README.md).

## Table of Content

- [lambda-api](#lambda-api)
  - [Purpose](#purpose)
  - [Table of Content](#table-of-content)
  - [How to use](#how-to-use)
    - [Random](#random)
      - [Request Sample](#request-sample)
      - [Params](#params)
      - [Response Sample](#response-sample)
    - [Date](#date)
      - [Request Body](#request-body)
      - [Request Sample](#request-sample-1)
        - [Endpoint](#endpoint)
        - [Body](#body)
      - [Response Sample](#response-sample-1)
  - [For Local Development](#for-local-development)
    - [invoke:local](#invokelocal)
  - [Deployment](#deployment)
    - [Settings](#settings)
      - [Event Type](#event-type)
  - [Serverless - AWS Node.js Typescript](#serverless---aws-nodejs-typescript)

## How to use

### Random

The `random` function is to pick N posts randomly.\
It returns an array of posts.

#### Request Sample

```sh
GET https://${your.endpoint}/random?endpoint=https:/...&post-limit=3&categories=1&categories=2&categories=3...
```

#### Params

| param      | description                                                                           | required | example                     |
| ---------- | ------------------------------------------------------------------------------------- | -------- | --------------------------- |
| endpoint   | base path to your wpapi                                                               | required | https://your.domain/wp-json |
| after      | specify to get posts "after" this datetime.                                           | optional | 2017-01-01T00:00:00Z        |
| before     | specify to get posts "before" this datetime.                                          | optional | 2023-01-01T00:00:00Z        |
| post-limit | maximum posts to be picked                                                            | optional | 3                           |
| categories | get posts in categories. without this option, filtering by categories to be disabled. | optional | 1                           |

#### Response Sample

```json
{
  "posts": [
    {
      "link": "https://link.to.post1",
      "title": "rendered title1"
    },
    {
      "link": "https://link.to.post2",
      "title": "rendered title2"
    }
  ]
}
```

### Date

The `date` function is used to retrieve posts based on specific dates, such as "posts from exactly 365 days ago".\
It returns an array of posts.

#### Request Body

Content-Type: application/json

| param      | description                                                                              | required | example                                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| endpoint   | The base path to your wpapi                                                              | Required | https://your.domain/wp-json                                                                                                       |
| categories | The categories to filter posts by. If not provided, category filtering will be disabled. | Optional | [1, 2, 19]                                                                                                                        |
| settings   | The duration and offset for the published date                                           | Required | {<br /> "duration": { "value": 1, "unit": "year" },<br /> "offset": { "value": 1, "unit": "month", "direction": "after" }<br /> } |

#### Request Sample

##### Endpoint

```sh
POST https://${your.endpoint}/date
```

##### Body

```js
{
  "endpoint": "https://${your.wp.domain}/wp-json",
  "categories": ["1", "2", "3"],
  "settings": [
    {
      "duration": { "value": 1, "unit": "year" },
      "offset": { "value": 1, "unit": "month", "direction": "after" }
      // 1 year ago, 1 month after ( = 11 months ago)
    },
    {
      "duration": { "value": 3, "unit": "month" },
      "offset": { "value": 2, "unit": "day", "direction": "before" }
      // 3 month ago, 2 days before ( = about 92 days ago)
    },
    { "duration": { "value": 100, "unit": "day" } } // 100 days ago
  ]
}

```

#### Response Sample

```json
{
  "results": [
    {
      "duration": { "value": 1, "unit": "year" },
      "offset": { "value": 1, "unit": "month", "direction": "after" },
      "post": {
        "link": "https://link.to.post1",
        "title": "rendered title1",
        "excerpt": "excerpt / excerpt / excerpt"
      }
    },
    {
      "duration": { "value": 3, "unit": "month" },
      "offset": { "value": 2, "unit": "day", "direction": "before" },
      "post": {
        "link": "https://link.to.post2",
        "title": "rendered title2",
        "excerpt": "excerpt / excerpt / excerpt"
      }
    },
    {
      "duration": { "value": 100, "unit": "day" },
      "post": {
        "link": "https://link.to.post3",
        "title": "rendered title3",
        "excerpt": "excerpt / excerpt / excerpt"
      }
    }
  ]
}
```

## For Local Development

### invoke:local

```sh
npm run invoke:local-random
```

## Deployment

```sh
npm run deploy
```

### Settings

#### Event Type

[Lambda Proxy Integration](https://www.serverless.com/framework/docs/providers/aws/events/apigateway#lambda-proxy-integration)

## Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

<!-- TODO unit test -->
<!-- TODO lint-staged の prettier で対象外になっているファイルがある -->
<!-- TODO refactor and clear TODOs -->
