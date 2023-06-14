import { formatJSONResponse } from "@libs/api-gateway";

import { middyfy } from "@libs/lambda";
import { parseSettings } from "./parseSettings";
import { pickPosts } from "./pickPosts";
import { DateEventHandler } from "./types";

const date: DateEventHandler = async (event) => {
  const { endpoint, categories, settings } = event.body;

  const parsedSettings = parseSettings(settings);

  const posts = await pickPosts({ endpoint, categories, parsedSettings });
  if (posts.length === 0) console.log("no posts found.");

  // TODO エラーハンドリング
  return formatJSONResponse({
    posts,
  });
};

// TODO 型定義
export const main = middyfy(date as any);
