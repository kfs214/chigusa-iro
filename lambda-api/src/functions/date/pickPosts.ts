import WPAPI from "wpapi";
import { Post } from "@/type";

type PickPostCommonArgs = {
  endpoint: string;
  categories?: number[];
};

type PickPostArgs = {
  publishedDate: string;
} & PickPostCommonArgs;

type PickPostsArgs = {
  publishedDates: string[];
} & PickPostCommonArgs;

const pickPost = async (args: PickPostArgs) => {
  const { endpoint, categories, publishedDate } = args;
  const wp = new WPAPI({ endpoint });

  const after = `${publishedDate}T00:00:00`;
  const before = `${publishedDate}T23:59:59`;

  return await (categories ? wp.posts().param({ categories }) : wp.posts())
    .param("after", after)
    .param("before", before)
    .param({ _fields: ["title", "link"] })
    .get();
};

export const pickPosts = async (args: PickPostsArgs): Promise<Post[]> => {
  const { endpoint, categories, publishedDates } = args;

  const posts = await Promise.all(
    publishedDates.map(
      async (publishedDate) =>
        await pickPost({ endpoint, categories, publishedDate })
    )
  );

  // TODO 同日に2件投稿されていた場合は1件目のみ取得されるので、必要であれば対応。
  return posts
    .filter((e) => e && e.length > 0)
    .map(
      ([
        {
          link,
          title: { rendered },
        },
      ]) => ({ link, title: rendered })
    );
};
