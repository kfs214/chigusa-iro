import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const date: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `date: Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

// TODO 型定義
export const main = middyfy(date as any);
