export default {
  type: 'object',
  properties: {
    endpoint: { type: 'string' },
    after: { type: 'string' },
    before: { type: 'string' },
    // TODO GETだから必ず文字列型になるよね？
    categories: { type: 'string' },
    'post-limit': { type: 'string' },
  },
  required: ['endpoint'],
} as const;
