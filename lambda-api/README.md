# lambda-api

## Purpose

API to pick post(s) from wpapi.  
Running on AWS lambda.  
To be called from [gas-batch](../gas-batch/README.md)

## How to use

### Random

`random` function is to pick N posts randomly.\
It will return an array of posts.

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
| categories | get posts in catetories. without this option, filtering by categories to be disabled. | optional | 1                           |

#### Response Body Sample

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

`date` function is to pick N posts like "posts on exact 365 days ago".\
coming soon...

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
<!-- TODO add function 'date' -->