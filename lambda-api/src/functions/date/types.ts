import type {
  ValidatedAPIGatewayProxyEvent,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import schema from "./schema";

type Schema = typeof schema;
type DateEvent = ValidatedAPIGatewayProxyEvent<Schema>;
export type DateEventHandler = ValidatedEventAPIGatewayProxyEvent<Schema>;
type DateEventBody = DateEvent["body"];
export type Setting = DateEventBody["settings"][number];
