/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { pickPosts } from './pickPosts';
import { composeText } from './composeText';

const parsePostLimitParam = (postLimitParam?: string) => {
  // nullishな場合は1。0も無効値なので1。
  if (!postLimitParam) return 1;
  if (isNaN(+postLimitParam)) return 1;
  return +postLimitParam;
};

const getProperties = () => {
  const wpEndpoint = PropertiesService.getScriptProperties().getProperty('wpEndpoint');
  const apiEndpoint = PropertiesService.getScriptProperties().getProperty('apiEndpoint');
  const heading = PropertiesService.getScriptProperties().getProperty('heading') ?? '';

  const footer = PropertiesService.getScriptProperties().getProperty('footer') ?? '';

  const postLimitProperty = PropertiesService.getScriptProperties().getProperty('postLimit') ?? '';
  const postLimit = parsePostLimitParam(postLimitProperty);

  const categoriesProperty =
    PropertiesService.getScriptProperties().getProperty('categories') ?? '';
  const categories = categoriesProperty
    .split(' ')
    .map((categoryStr) => +categoryStr)
    .filter((e) => !isNaN(e));

  const subject = PropertiesService.getScriptProperties().getProperty('subject') ?? '';
  const address = PropertiesService.getScriptProperties().getProperty('address');

  return { wpEndpoint, apiEndpoint, address, subject, heading, postLimit, categories, footer };
};

export const main = async (): Promise<void> => {
  const { wpEndpoint, apiEndpoint, address, subject, heading, postLimit, categories, footer } =
    getProperties();
  console.log('starting process...', {
    wpEndpoint,
    apiEndpoint,
    address,
    subject,
    heading,
    postLimit,
    categories,
    footer,
  });

  if (!wpEndpoint || !apiEndpoint || !address) {
    console.log(
      `missing required property(ies):${wpEndpoint ? '' : ' wpEndpoint'}${
        apiEndpoint ? '' : ' apiEndpoint'
      }${address ? '' : ' address'}. ending process...`
    );
    return;
  }

  const posts = pickPosts({
    wpEndpoint,
    apiEndpoint,
    postLimit,
    categories,
  });

  if (!posts.length) {
    console.log('picked 0 post. ending process...');
    return;
  }

  const composedText = composeText({ heading, posts, footer });
  console.log('composedTextStringified', composedText);
  try {
    console.log('sending e-mail...');
    GmailApp.sendEmail(address, subject, composedText);
  } catch (error) {
    console.error(error);
  }

  console.log('completed!');
};
