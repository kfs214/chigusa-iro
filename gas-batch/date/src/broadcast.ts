// eslint-disable-next-line @typescript-eslint/no-unused-vars
function broadcast(
  { notificationBodies, postHeading }: BroadcastProps,
  shouldBroadcast = false
): void {
  const lineChannelAccessToken =
    PropertiesService.getScriptProperties().getProperty(
      "lineChannelAccessToken"
    );
  if (!lineChannelAccessToken) {
    throw new Error(
      "failed to get lineChannelAccessToken from ScriptProperties! ending process..."
    );
  }

  const lineBroadcastEndpoint =
    PropertiesService.getScriptProperties().getProperty(
      "lineBroadcastEndpoint"
    );
  if (!lineBroadcastEndpoint) {
    throw new Error(
      "failed to get lineBroadcastEndpoint from ScriptProperties! ending process..."
    );
  }

  const messages: Message[] = (
    [postHeading, ...notificationBodies].filter((e) => e) as string[]
  ).map((text) => ({
    type: "text",
    text,
  }));

  const reqBody = {
    messages,
  };
  const headers = {
    Authorization: `Bearer ${lineChannelAccessToken}`,
    // TODO リトライ処理追加時に有効化
    // "X-Line-Retry-Key": crypto.randomUUID(),
  };

  const options = {
    method: "post" as const,
    contentType: "application/json",
    headers,
    payload: JSON.stringify(reqBody),
  };

  console.log("fetching to ", lineBroadcastEndpoint);
  Logger.log(
    `options: ${JSON.stringify(options).replace(
      /"Bearer .*?"/g,
      '"Bearer dummyToken"'
    )}`
  );

  if (!shouldBroadcast) return;

  // TODO リトライ処理
  const response = UrlFetchApp.fetch(lineBroadcastEndpoint, options);
  const responseCode = response.getResponseCode();
  console.log("responseCode: ", responseCode);

  if (responseCode >= 300) {
    const responseBodyStr = response.getContentText();
    throw new Error(`Error: ${responseCode} - ${responseBodyStr}`);
  }
}
