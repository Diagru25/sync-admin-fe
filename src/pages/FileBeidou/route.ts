import { lazy } from "react";
import { BEIDOU_PAGE } from "routes/route.constant";
const FileBeidou = lazy(() => import("pages/FileBeidou"));

export default {
  path: BEIDOU_PAGE,
  element: FileBeidou,
};
