type Args = {
  heading?: string;
  posts: Array<{
    title: string;
    link: string;
  }>;
  footer?: string;
};

export const composeText = (args: Args): string => {
  const { heading, posts, footer } = args;

  const postsStringified = posts.map(({ title, link }) => `${title}\n${link}`).join('\n\n');

  return `${heading ? heading + '\n\n\n' : ''}${postsStringified}${
    footer ? '\n\n\n' + footer : ''
  }`;
};
