// TODO categories での絞り込み

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fetchPosts(settings: Setting[]): PostWithSetting[] {
  const wpEndpoint =
    PropertiesService.getScriptProperties().getProperty("wpEndpoint");
  if (!wpEndpoint) {
    throw new Error(
      "failed to get wpEndpoint from ScriptProperties! ending process..."
    );
  }

  const lambdaEndpoint =
    PropertiesService.getScriptProperties().getProperty("lambdaEndpoint");
  if (!lambdaEndpoint) {
    throw new Error(
      "failed to get lambdaEndpoint from ScriptProperties! ending process..."
    );
  }

  const reqBody = {
    endpoint: wpEndpoint,
    settings,
  };

  const options = {
    method: "post" as const,
    contentType: "application/json",
    payload: JSON.stringify(reqBody),
  };

  console.log("fetching to ", lambdaEndpoint);
  Logger.log(`options: ${JSON.stringify(options)}`);
  const response = UrlFetchApp.fetch(lambdaEndpoint, options);
  const responseCode = response.getResponseCode();
  console.log("responseCode: ", responseCode);

  const responseBodyStr = response.getContentText();

  if (responseCode >= 300) {
    throw new Error(`Error: ${responseCode} - ${responseBodyStr}`);
  }

  const { posts } = JSON.parse(responseBodyStr) as { posts: PostWithSetting[] };
  return posts;
}
