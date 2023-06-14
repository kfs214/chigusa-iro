import { decode } from "html-entities";
import { Post, WPPost } from "@/type";

function formatURI(uri: string) {
  try {
    return decodeURI(uri);
  } catch (e) {
    return uri;
  }
}

function parsePost([post]: WPPost[]): Post {
  const { link, title, excerpt } = post;

  const decodedLink = formatURI(link);

  const excerptText = excerpt.rendered.replace(/<.*?>/g, "");
  const decodedExcerpt = decode(excerptText);

  return { link: decodedLink, title: title.rendered, excerpt: decodedExcerpt };
}

export function parsePosts(posts: WPPost[][]): Post[] {
  const filteredPosts = posts.filter((e) => e && e.length > 0);

  return filteredPosts.map(parsePost);
}
