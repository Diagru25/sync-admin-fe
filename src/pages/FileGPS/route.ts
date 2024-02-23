import { lazy } from "react";
import { GPS_PAGE } from "routes/route.constant";
const FileGPS = lazy(() => import("pages/FileGPS"));

export default {
  path: GPS_PAGE,
  element: FileGPS,
};
