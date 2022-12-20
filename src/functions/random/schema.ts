export default {
  type: 'object',
  properties: {
    // TODO index.tsと二重管理になっているので、まとめられるならまとめる
    endpoint: { type: 'string' },
    after: { type: 'string' },
    before: { type: 'string' },
    categories: { type: 'string' },
    'post-limit': { type: 'string' },
  },
  required: ['endpoint'],
} as const;
