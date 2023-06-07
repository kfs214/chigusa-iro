import { formatJSONResponse } from "@libs/api-gateway";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";

const date: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  return formatJSONResponse({
    event,
  });
};

// TODO 型定義
export const main = middyfy(date as any);
