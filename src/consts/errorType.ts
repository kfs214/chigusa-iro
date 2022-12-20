export const errorType = {
  endpointUrlInvalid: {
    type: 'endpointUrlInvalid',
    statusCode: 400,
    errorMessage: 'endpoint URL is invalid. ending process...',
  },
  unknownError: {
    type: 'unknownError',
    statusCode: 500,
    errorMessage: 'Internal Server Error. ending process...',
  },
} as const;
