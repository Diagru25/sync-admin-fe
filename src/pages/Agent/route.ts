import { AGENT_PAGE } from "routes/route.constant";
import { lazy } from "react";

const Agent = lazy(() => import("pages/Agent"));

export default {
  path: AGENT_PAGE,
  element: Agent,
};
