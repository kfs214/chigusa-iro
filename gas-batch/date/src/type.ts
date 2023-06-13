type Unit = "year" | "month" | "day";
type Direction = "after" | "before";

type Duration = { value: number; unit: Unit };
type Offset = { value: number; unit: Unit; direction: Direction };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Setting = {
  duration: Duration;
  offset?: Offset;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Post = {
  link: string;
  title: string;
};
