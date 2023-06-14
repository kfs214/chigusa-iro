import dayjs, { Dayjs } from "dayjs";
import { ReqSetting, ParsedSetting } from "./types";
import { dayDirection } from "@/consts";

// TODO マイナスの掛け算
const manipulateOffset = (date: Dayjs, offset?: ReqSetting["offset"]) => {
  if (!offset) return date;

  const { direction, value, unit } = offset;

  switch (direction) {
    case dayDirection.AFTER:
      return date.add(value, unit);

    case dayDirection.BEFORE:
      return date.subtract(value, unit);

    default:
      return date;
  }
};

const parseSetting = ({ duration, offset }: ReqSetting): ParsedSetting => {
  // TODO バリデーション必要なら実装。必須値はフレームワークでチェックされる？値の無効値はどんなのを考慮する？

  const dayjsFromDuration = dayjs().subtract(duration.value, duration.unit);
  const publishedDate = manipulateOffset(dayjsFromDuration, offset);
  const [publishedDateStr] = publishedDate.format().split("T");

  return { publishedDateStr, duration, offset };
};

export const parseSettings = (settings: ReqSetting[]): ParsedSetting[] =>
  settings.map((setting) => parseSetting(setting));
