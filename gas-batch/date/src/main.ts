const POST_HEADING = "__POST_HEADING__";

function composeBroadcastProps(): BroadcastProps | undefined {
  const settings = getSettings();

  // TODO posts, results, PostWithSetting 統一性。ReadmeとIF揃える
  const posts = fetchPosts(settings);
  Logger.log(`posts: ${JSON.stringify(posts)}`);

  if (posts.length === 0) return;

  const postHeading = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(POST_HEADING)
    ?.getRange(1, 1)
    .getDisplayValue();
  const notificationBodies = posts.map((post) => postToNotificationBody(post));

  return { postHeading, notificationBodies };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function dryRun(): void {
  const broadcastProps = composeBroadcastProps();

  if (!broadcastProps) {
    console.log("post not found...");
    return;
  }

  broadcast(broadcastProps, false);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function main(): void {
  const broadcastProps = composeBroadcastProps();

  if (!broadcastProps) {
    console.log("post not found...");
    return;
  }

  broadcast(broadcastProps, true);
}
