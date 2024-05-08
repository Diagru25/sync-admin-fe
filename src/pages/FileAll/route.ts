import { lazy } from "react";
import { ALL_SATELLITE_PAGE } from "routes/route.constant";
const FileAll = lazy(() => import("pages/FileAll"));

export default {
  path: ALL_SATELLITE_PAGE,
  element: FileAll,
};
