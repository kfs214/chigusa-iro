import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema, JSONSchema } from 'json-schema-to-ts';

// TODO multiValueQueryStringParametersに[x: string]: string[];が含まれてしまう
type ValidatedAPIGatewayProxyEvent<S extends JSONSchema> = Omit<
  APIGatewayProxyEvent,
  'queryStringParameters' | 'multiValueQueryStringParameters' | 'body'
> & {
  queryStringParameters: FromSchema<S>;
  multiValueQueryStringParameters: { [key in keyof FromSchema<S>]: string[] };
  body: FromSchema<S>;
};

export type ValidatedEventAPIGatewayProxyEvent<S extends JSONSchema> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
