import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'random',
        request: {
          parameters: {
            querystrings: {
              endpoint: true,
              after: false,
              before: false,
              categories: false,
              'post-limit': false,
            },
          },
        },
      },
    },
  ],
};
