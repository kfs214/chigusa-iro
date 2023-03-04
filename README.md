# CHIgusa-iro(#3A8FB7)

## purpose

pick post(s) from wordpress.

## how to use

### random

`random` function is to pick N posts randomly.\
It will return an array of posts.

#### request sample

```sh
GET https://${your.endpoint}/random?endpoint=https:/...&post-limit=3&categories=1&categories=2&categories=3...
```

#### params

| param      | description                                                                           | required | example                     |
| ---------- | ------------------------------------------------------------------------------------- | -------- | --------------------------- |
| endpoint   | base path to your wpapi                                                               | required | https://your.domain/wp-json |
| after      | specify to get posts "after" this datetime.                                           | optional | 2017-01-01T00:00:00Z        |
| before     | specify to get posts "before" this datetime.                                          | optional | 2023-01-01T00:00:00Z        |
| post-limit | maximum posts to be picked                                                            | optional | 3                           |
| categories | get posts in catetories. without this option, filtering by categories to be disabled. | optional | 1                           |

#### response body sample

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

### date

`date` function is to pick N posts like "posts on exact 365 days ago".\
coming soon...

## for local development

### invoke:local

```sh
npm run invoke:local-random
```

### settings

#### event type

[Lambda Proxy Integration](https://www.serverless.com/framework/docs/providers/aws/events/apigateway#lambda-proxy-integration)

## Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

<!-- TODO Run a TypeScript type check in your pre-commit hook using lint-staged + husky -->
<!-- TODO unit test -->
<!-- TODO refactor and clear TODOs -->
<!-- TODO add function 'date' -->
