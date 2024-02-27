import { request } from "apis/base";
import { AgentType } from "constants/types/agent";

export const agentApi = {
  updateAgent: (data: AgentType) => {
    return request({
      url: "/api/agents/status",
      method: "POST",
      data,
    });
  },
};
