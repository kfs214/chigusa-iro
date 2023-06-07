import { formatJSONResponse } from "@libs/api-gateway";

import { middyfy } from "@libs/lambda";
import { settingsToDateStrings } from "./settingsToDates";
import { DateEventHandler } from "./types";

const date: DateEventHandler = async (event) => {
  const { endpoint, categories, settings } = event.body;

  const publishedDates = settingsToDateStrings(settings);
  console.log("publishedDates", publishedDates);
  console.log("endpoint", endpoint);
  console.log("categories", categories);
  return formatJSONResponse({
    event,
  });
};

// TODO 型定義
export const main = middyfy(date as any);
