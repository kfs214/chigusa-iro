// TODO 型定義
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { serverResponseCode, wpAPIRequestParam } from '../../consts/consts';
import { errorType } from '../../consts/errorType';
import { wpAPIReturnedError } from '../../consts/message';
import { WPError } from '../../type';
import schema from './schema';
import { pickPosts } from './pickPosts';

type Params = {
  endpointParam: string;
  afterParam?: string;
  beforeParam?: string;
  categoriesParam?: string[];
  postLimitParam?: string;
};

const validateURL = (url: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch {
    console.error(errorType.endpointUrlInvalid.errorMessage);
    throw new Error(errorType.endpointUrlInvalid.type);
  }
};

const validateDate = (date: string) => {
  const validDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d)?\d*Z?$/;

  try {
    // yyyy-MM-ddTHH:mm:ss(+小数点以下) 形式でない場合は例外送出
    if (!validDateTimeRegex.test(date)) {
      throw new Error('');
    }

    // Invalid Dateの場合に例外送出
    new Date(date).toISOString();
  } catch {
    console.error(errorType.beforeAfterInvalid.errorMessage);
    throw new Error(errorType.beforeAfterInvalid.type);
  }
};

const parsePostLimitParam = (postLimitParam?: string) => {
  // nullishな場合は1。0も無効値なので1。
  if (!postLimitParam) return 1;
  if (isNaN(+postLimitParam)) return 1;
  return +postLimitParam;
};

const composeProperties = (params: Params) => {
  const { endpointParam, afterParam, beforeParam, categoriesParam, postLimitParam } = params;

  // バリデーションを行い、1つでも無効な値であれば例外送出して処理終了
  validateURL(endpointParam);
  afterParam && validateDate(afterParam);
  beforeParam && validateDate(beforeParam);

  const categories = categoriesParam?.map((categoryStr) => +categoryStr)?.filter((e) => !isNaN(e));

  const postLimit = parsePostLimitParam(postLimitParam);

  // バリデーション済みであることを明示するために、値が変わらないものもkey名を変更
  return { endpoint: endpointParam, categories, postLimit, after: afterParam, before: beforeParam };
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
    // TODO せめてcomposeErrorResponse関数として切り出す？
    // TODO default
    if (e instanceof Error) {
      switch (e.message) {
        case errorType.endpointUrlInvalid.type:
          return {
            statusCode: errorType.endpointUrlInvalid.statusCode,
            body: errorType.endpointUrlInvalid.errorMessage,
          };
        case errorType.beforeAfterInvalid.type:
          return {
            statusCode: errorType.beforeAfterInvalid.statusCode,
            body: errorType.beforeAfterInvalid.errorMessage,
          };
      }
    }

    // WP APIからのエラーレスポンスをハンドリング
    // TODO 適切に切り出せば早期リターンできるのでは
    if (
      typeof (e as any).code === 'string' &&
      (e as any).data?.details &&
      (e as any).data?.params
    ) {
      console.error(wpAPIReturnedError);
      const { details, params } = (e as WPError).data ?? {};

      // paramsのkeysにafter,beforeがあればdetailsを確認してハンドリング
      const isBeforeAfterInvalid =
        !!params &&
        Object.keys(params).some((paramKey) => {
          if (paramKey === wpAPIRequestParam.AFTER || paramKey === wpAPIRequestParam.BEFORE) {
            return details?.[paramKey]?.code === serverResponseCode.REST_INVALID_DATE;
          }

          return false;
        });

      if (isBeforeAfterInvalid) {
        return {
          statusCode: errorType.beforeAfterInvalid.statusCode,
          body: errorType.beforeAfterInvalid.errorMessage,
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

// TODO 型定義
export const main = middyfy(random as any);
