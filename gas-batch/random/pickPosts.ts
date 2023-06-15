type ParamsObjectEntry = [string, string | number];

type PickPostsArgs = {
  wpEndpoint: string;
  apiEndpoint: string;
  categories?: number[];
  postLimit?: number;
};

type Posts = Array<{
  link: any;
  title: any;
}>;

const CATEGORIES = 'categories';

//
// URL クラスがGASで利用できないので、オブジェクトからクエリパラメータを生成する
//
const buildURL = (params: PickPostsArgs) => {
  const { apiEndpoint, categories, wpEndpoint: endpoint, postLimit } = params;

  const categoryEntries: ParamsObjectEntry[] = categories
    ? categories.map((category) => [CATEGORIES, category])
    : [];
  const restSearchParamEntries = Object.entries({ endpoint, 'post-limit': postLimit });
  const sarchParamEntries = [...categoryEntries, ...restSearchParamEntries].filter(([_, v]) => v);

  if (!sarchParamEntries.length) return apiEndpoint;

  const searchParams = sarchParamEntries.map(([k, v]) => `${k}=${v}`).join('&');

  return `${apiEndpoint}?${searchParams}`;
};

//
// CHigusa-iro API にアクセスしN件の投稿を取得する
//
export const pickPosts = (args: PickPostsArgs): Posts => {
  console.log('api access to be made...');

  const fetchOptions = {
    method: 'get' as const,
  };

  const fetchingURL = buildURL(args);
  console.log('fetching to ', fetchingURL);

  try {
    const response = UrlFetchApp.fetch(fetchingURL, fetchOptions);
    const responseCode = response.getResponseCode();
    console.log('responseCode: ', responseCode);
    const responseBodyStr = response.getContentText();

    if (responseCode >= 300) {
      throw new Error(`Error: ${responseCode} - ${responseBodyStr}`);
    }

    const { posts } = JSON.parse(responseBodyStr);
    return posts;
  } catch (error) {
    console.error('something went wrong while calling CHIgusa-iro API... error:', error);
    return [];
  }
};
