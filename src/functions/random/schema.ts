export default {
  type: 'object',
  properties: {
    endpoint: { type: 'string' },
    from: { type: 'string' },
    to: { type: 'string' },
    categories: { type: 'string' },
    'post-limit': { type: 'string' },
  },
  required: ['endpoint'],
} as const;
