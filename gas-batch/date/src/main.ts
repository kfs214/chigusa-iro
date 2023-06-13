// eslint-disable-next-line @typescript-eslint/no-unused-vars
function main(): void {
  const settings = getSettings();
  const posts = fetchPosts(settings);
  Logger.log(`posts fetched! - ${JSON.stringify(posts)}`);
}
