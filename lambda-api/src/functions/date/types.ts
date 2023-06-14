import type {
  ValidatedAPIGatewayProxyEvent,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import schema from "@/functions/date/schema";
import { Post } from "@/type";

type Schema = typeof schema;
type DateEvent = ValidatedAPIGatewayProxyEvent<Schema>;
export type DateEventHandler = ValidatedEventAPIGatewayProxyEvent<Schema>;
type DateEventBody = DateEvent["body"];
export type ReqSetting = DateEventBody["settings"][number];
export type ParsedSetting = ReqSetting & { publishedDateStr: string };

export type PostWithSetting = {
  post: Post;
  setting: ReqSetting;
};
