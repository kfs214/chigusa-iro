import { formatJSONResponse } from "@libs/api-gateway";

import { middyfy } from "@libs/lambda";
import { pickPosts } from "./pickPosts";
import { settingsToDateStrings } from "./settingsToDates";
import { DateEventHandler } from "./types";
import { parseCategories } from "@/util";

const date: DateEventHandler = async (event) => {
  const { endpoint, categories: categoriesParam, settings } = event.body;

  const categories = parseCategories(categoriesParam);
  const publishedDates = settingsToDateStrings(settings);
  const posts = await pickPosts({ endpoint, categories, publishedDates });

  if (posts.length === 0) console.log("no posts found.");

  // TODO エラーハンドリング
  return formatJSONResponse({
    posts,
  });
};

// TODO 型定義
export const main = middyfy(date as any);
