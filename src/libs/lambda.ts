import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { Context, Callback } from 'aws-lambda';

type Handler =
  | ((event: unknown, context: Context, callback: Callback<any>) => void | Promise<any>)
  | undefined;

export const middyfy = (handler: Handler) => {
  return middy(handler).use(middyJsonBodyParser());
};
