import { REGEX_TIME_BRDC } from "constants/common/common";
import dayjs from "configs/dayjs";

export const checkTypeRinex = (content: string) => {
  try {
    const firstLine = content.split(/\r?\n/)[0];

    const matchVersion = firstLine.trim().match(/[0-9]/gi);
    const version = matchVersion ? matchVersion[0] : "";

    let type = "";
    if (
      firstLine.includes("C:") ||
      firstLine.includes("BeiDou") ||
      firstLine.includes("BDS")
    )
      type = "BDS";

    if (firstLine.includes("G:") || firstLine.includes("GPS")) type = "GPS";

    return { version, type };
  } catch (error) {
    return { version: "", type: "" };
  }
};

export const getTimeOnBrdcFile = (content: string, version: string) => {
  try {
    let dayOfYear: string = "";
    let year: string | number = "";
    if (version === "2") {
      const matchTime = content.match(REGEX_TIME_BRDC);
      const time = matchTime ? matchTime[0] : "";
      const dateObj = dayjs(time, "DD-MMM-YY");
      dayOfYear = dateObj.dayOfYear().toString();
      year = dateObj.format("YY");
    } else if (version === "3") {
      dayOfYear = "";
      year = "";
    }
    return {
      dayOfYear,
      year,
    };
  } catch (error) {
    return {
      dayOfYear: "",
      year: "",
    };
  }
};

export const genFileNameBrdc = (fileContent: string) => {
  try {
    if (!fileContent) return "";

    let filename = "";

    const { version, type } = checkTypeRinex(fileContent as string);
    if (!version || !type) return "";

    const { dayOfYear, year } = getTimeOnBrdcFile(fileContent, version);
    if (!dayOfYear || !year) return "";

    filename = `${dayOfYear.padStart(3, "0")}0.${year}n`;
    filename = type ? `${type}brdc${filename}` : filename;

    return filename;
  } catch (error) {
    return "";
  }
};
