import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const random: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { from, to, categories, 'post-limit': postLimit } = event.body;

  return formatJSONResponse({
    message: `random() is called! parameters: ${JSON.stringify({
      from,
      to,
      categories,
      postLimit,
    })}`,
    event,
  });
};

export const main = middyfy(random);
