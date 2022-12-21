import WPAPI from 'wpapi';

type PickPostsArgs = {
  endpoint: string;
  categories?: number[];
  postLimit?: number;
  after?: string;
  before?: string;
};

const MAX_POST_LENGTH = 100;

const getPickedPostLimit = (inputPostLimit?: number): number => {
  if (inputPostLimit === 0) return 0;
  if (!inputPostLimit) return 1;
  if (inputPostLimit > MAX_POST_LENGTH) {
    console.log(`up to ${MAX_POST_LENGTH} posts to be picked`);
    return MAX_POST_LENGTH;
  }
  return inputPostLimit;
};

const getPickedOffsets = (totalPosts: number, length: number): number[] => {
  const candidates = [...Array(totalPosts).keys()];

  if (totalPosts <= length) {
    console.log(`matched posts: ${totalPosts}. all of them to be returned`);
    return candidates;
  }

  const pickedOffsets: number[] = [];

  [...Array(length)].forEach(() => {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const [pickedItem] = candidates.splice(randomIndex);

    pickedOffsets.push(pickedItem);
  });

  return pickedOffsets;
};

export const pickPosts = async (
  args: PickPostsArgs
): Promise<
  Array<{
    link: any;
    title: any;
  }>
> => {
  const { endpoint, categories, postLimit, after, before } = args;
  const wp = new WPAPI({ endpoint });

  const pickedPostLimit = getPickedPostLimit(postLimit);
  console.log(`up to ${pickedPostLimit} post(s) to be picked`);

  const wpPostsRequest = (categories ? wp.posts().param({ categories }) : wp.posts())
    .param({ after, before })
    .perPage(1);

  // TODO 該当ない場合のハンドリング
  const {
    _paging: { total: totalPosts },
  } = await wpPostsRequest.param({ _fields: ['id'] }).get();
  console.log('matched posts:', totalPosts);

  const pickedOffsets = getPickedOffsets(totalPosts, pickedPostLimit);

  const posts = await Promise.all(
    pickedOffsets.map(
      async (pickedOffset) =>
        await wpPostsRequest
          .param({ _fields: ['title', 'link'] })
          .offset(pickedOffset)
          .get()
          .catch((e) => {
            console.error(e);
          })
    )
  );

  return posts
    .filter((e) => e)
    .map(
      ([
        {
          link,
          title: { rendered },
        },
      ]) => ({ link, title: rendered })
    );
};
