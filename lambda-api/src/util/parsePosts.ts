import { decode } from "html-entities";
import { Post, WPPost } from "@/type";

function parsePost([post]: WPPost[]): Post {
  const { link, title, excerpt } = post;
  const excerptText = excerpt.rendered.replace(/<.*?>/g, "");
  const decodedExcerpt = decode(excerptText);

  return { link, title: title.rendered, excerpt: decodedExcerpt };
}

export function parsePosts(posts: Array<WPPost[] | undefined>): Post[] {
  const filteredPosts = posts.filter((e) => e && e.length > 0) as WPPost[][];

  return filteredPosts.filter((e) => e).map(parsePost);
}
