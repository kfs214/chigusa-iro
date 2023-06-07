import dayjs, { Dayjs } from "dayjs";
import { Setting } from "./types";
import { dayDirection } from "@/consts";

const manipulateOffset = (date: Dayjs, offset?: Setting["offset"]) => {
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

// TODO 0:00:00 - 23:59:59でいい？それはどこでやる？
const settingToDateString = ({ duration, offset }: Setting) => {
  // TODO バリデーション必要なら実装。必須値はフレームワークでチェックされる？値の無効値はどんなのを考慮する？

  const dayjsFromDuration = dayjs().subtract(duration.value, duration.unit);
  const publishedDate = manipulateOffset(dayjsFromDuration, offset);
  const [publishedDateStr] = publishedDate.format().split("T");

  return publishedDateStr;
};

export const settingsToDateStrings = (settings: Setting[]) =>
  settings.map((setting) => settingToDateString(setting));
