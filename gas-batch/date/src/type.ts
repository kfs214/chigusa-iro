/* eslint-disable @typescript-eslint/no-unused-vars */
type Unit = "year" | "month" | "day";
type Direction = "after" | "before";

type Duration = { value: number; unit: Unit };
type Offset = { value: number; unit: Unit; direction: Direction };

type Setting = {
  duration: Duration;
  offset?: Offset;
};

type Post = {
  link: string;
  title: string;
  excerpt: string;
};

type PostWithSetting = {
  post: Post;
  setting: Setting;
};

type Message = {
  type: "text";
  text: string;
};

type BroadcastProps = {
  postHeading: string | undefined;
  notificationBodies: string[];
};
