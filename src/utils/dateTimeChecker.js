import dayjs from "dayjs";

export const getDayInNextTime = (numberOfDay) => {
  return dayjs()
    .add(numberOfDay || 31, "day")
    .format();
};
