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
              endpoint: { required: true },
              after: true,
              before: true,
              categories: true,
              'post-limit': true,
            },
          },
        },
      },
    },
  ],
};
