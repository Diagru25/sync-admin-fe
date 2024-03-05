import { Button, Flex, Modal, Textarea } from "@mantine/core";
import { agentApi } from "apis/agentApi";
import { AgentType } from "constants/types/agent";
import { useAgents } from "hooks/request";
import { useNotification } from "hooks/ui";
import { FC, Fragment, useEffect, useState } from "react";

type Props = {
  opened: boolean;
  onClose: () => void;
  agent: AgentType | null;
};
const AgentEditModal: FC<Props> = ({ opened, onClose, agent }) => {
  const { mutate } = useAgents();
  const { notification } = useNotification();
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    if (agent) {
      setNote(agent?.note || "");
    }
  }, [agent]);

  const handleUpdateAgent = async () => {
    try {
      if (!agent) return;

      const res = await agentApi.updateAgent({ ...agent, note });
      if (res.status === 200) {
        console.log(res);
      }
      notification.success("Cập nhật thành công!");
      onClose();
      mutate();
    } catch (err) {
      console.log(err);
      notification.success("Cập nhật thất bại!");
    }
  };
  return (
    <Fragment>
      <Modal size="xl" opened={opened} onClose={onClose} title="Chỉnh sửa trạm">
        <Textarea
          label="Ghi chú"
          autosize
          minRows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Flex justify="flex-end" mt="xs" gap="xs">
          <Button variant="default" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleUpdateAgent}>Cập nhật</Button>
        </Flex>
      </Modal>
    </Fragment>
  );
};

export default AgentEditModal;
