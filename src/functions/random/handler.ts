import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { errorType } from '../../consts/errorType';
import schema from './schema';
import { pickPosts } from './pickPosts';

type Params = {
  endpointParam: string;
  afterParam?: string;
  beforeParam?: string;
  categoriesParam?: string[];
  postLimitParam?: string;
};

const isValidURL = (url: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsedUrl = new URL(url);
    return true;
  } catch {
    console.error('endpoint URL is invalid. ending process...');
    throw new Error(errorType.endpointUrlInvalid.type);
  }
};

const composeProperties = (params: Params) => {
  const { endpointParam, afterParam, beforeParam, categoriesParam, postLimitParam } = params;

  // TODO どこまで含める？domainだけ指定すればよいようにするか、wp-jsonまで必須にするか
  const endpoint = isValidURL(endpointParam) ? endpointParam : '';

  const categories = categoriesParam?.map((categoryStr) => +categoryStr)?.filter((e) => !isNaN(e));

  const postLimit = isNaN(+postLimitParam) ? 1 : +postLimitParam;

  // TODO 日付の型をもっとしっかり
  const after = new Date(afterParam).toISOString();
  const before = new Date(beforeParam).toISOString();

  return { endpoint, categories, postLimit, after, before };
};

const random: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const {
      queryStringParameters: {
        endpoint: endpointParam,
        after: afterParam,
        before: beforeParam,
        'post-limit': postLimitParam,
      },
      multiValueQueryStringParameters: { categories: categoriesParam },
    } = event;

    const { endpoint, categories, postLimit, after, before } = composeProperties({
      endpointParam,
      afterParam,
      beforeParam,
      categoriesParam,
      postLimitParam,
    });

    const posts = await pickPosts({
      endpoint,
      categories,
      postLimit,
      after,
      before,
    });

    return formatJSONResponse({ posts });
  } catch (e: unknown) {
    // TODO エラーハンドリング綺麗に
    if (e instanceof Error) {
      switch (e.message) {
        case errorType.endpointUrlInvalid.type:
          return {
            statusCode: errorType.endpointUrlInvalid.statusCode,
            body: errorType.endpointUrlInvalid.errorMessage,
          };
      }
    }

    console.error(e);

    return {
      statusCode: errorType.unknownError.statusCode,
      body: errorType.unknownError.errorMessage,
    };
  }
};

export const main = middyfy(random);
