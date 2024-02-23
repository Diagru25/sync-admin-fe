import { lazy } from "react";
import { GLONASS_PAGE } from "routes/route.constant";
const FileGlonass = lazy(() => import("pages/FileGlonass"));

export default {
  path: GLONASS_PAGE,
  element: FileGlonass,
};
