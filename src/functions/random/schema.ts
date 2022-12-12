export default {
  type: 'object',
  properties: {
    from: { type: 'string' },
    to: { type: 'string' },
    categories: { type: 'string' },
    'post-limit': { type: 'string' },
  },
  required: [],
} as const;
