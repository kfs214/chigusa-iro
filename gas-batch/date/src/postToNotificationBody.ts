const localizedUnits = {
  year: "年",
  month: "ヶ月",
  day: "日",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function postToNotificationBody(postWithSetting: PostWithSetting): string {
  const {
    setting: {
      duration: { value, unit },
    },
    post: { link, title, excerpt },
  } = postWithSetting;

  const localizedUnit = localizedUnits[unit];

  return `${value}${localizedUnit}前の投稿

${title}
${excerpt}

${link}`;
}
