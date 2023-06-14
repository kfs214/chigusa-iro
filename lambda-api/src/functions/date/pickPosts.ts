import WPAPI from "wpapi";
import { ParsedSetting, PostWithSetting } from "./types";
import { WPPost } from "@/type";
import { parsePost } from "@/util";

type PickPostCommonArgs = {
  endpoint: string;
  categories?: number[];
};

type PickPostArgs = {
  parsedSetting: ParsedSetting;
} & PickPostCommonArgs;

type PickPostsArgs = {
  parsedSettings: ParsedSetting[];
} & PickPostCommonArgs;

const pickPost = async (
  args: PickPostArgs
): Promise<PostWithSetting | undefined> => {
  const { endpoint, categories, parsedSetting } = args;
  const { publishedDateStr, ...reqSettings } = parsedSetting;

  const wp = new WPAPI({ endpoint });

  const after = `${publishedDateStr}T00:00:00`;
  const before = `${publishedDateStr}T23:59:59`;

  const wpPost = await ((categories
    ? wp.posts().param({ categories })
    : wp.posts()
  )
    .param("after", after)
    .param("before", before)
    .param({ _fields: ["title", "link", "excerpt"] })
    .get() as Promise<WPPost[]>);

  if (wpPost.length === 0) return undefined;

  const post = parsePost(wpPost);

  return { post, setting: reqSettings };
};

export const pickPosts = async (
  args: PickPostsArgs
): Promise<PostWithSetting[]> => {
  const { endpoint, categories, parsedSettings } = args;

  // TODO 同日に2件投稿されていた場合は1件目のみ取得されるので、必要であれば対応。
  const postsWithSetting = await Promise.all(
    parsedSettings.map(
      async (parsedSetting) =>
        await pickPost({ endpoint, categories, parsedSetting })
    )
  );

  return postsWithSetting.filter((e) => e) as PostWithSetting[];
};
