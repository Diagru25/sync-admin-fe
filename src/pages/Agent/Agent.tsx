import { Button, Group, Table, Text, Title } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import CopyClipboardIcon from "components/CopyClipboardIcon";
import { DATE_TIME_FORMAT } from "constants/common/common";
import { AgentType } from "constants/types/agent";
import dayjs from "dayjs";
import { useAgents } from "hooks/request";
import { Fragment } from "react";
import EditableInputCell from "./component/EditableInputCell";
import { agentApi } from "apis/agentApi";
import { useNotification } from "hooks/ui";

const Agent = () => {
  const { notification } = useNotification();
  const { data, isLoading, error, mutate } = useAgents();

  const handleUpdateAgent = async (agent: AgentType) => {
    try {
      const res = await agentApi.updateAgent(agent);
      if (res.status === 200) {
        console.log(res);
      }
      notification.success("Cập nhật thành công!");
      mutate();
    } catch (err) {
      console.log(err);
      notification.success("Cập nhật thất bại!");
    }
  };

  console.log("parent");

  if (!data && isLoading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        Lỗi khi tải dữ liệu{" "}
        <Button leftSection={<IconRefresh />} onClick={() => mutate()}>
          Tải lại
        </Button>
      </div>
    );

  return (
    <Fragment>
      <Title order={3}>Danh sách trạm thu</Title>
      <Table striped highlightOnHover withTableBorder mt="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Mã trạm</Table.Th>
            <Table.Th>Tên máy</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>IP</Table.Th>
            <Table.Th>Ngày cập nhật</Table.Th>
            <Table.Th>SSH</Table.Th>
            <Table.Th>Ghi chú</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.data.map((item: AgentType, index: number) => (
            <Table.Tr key={index}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{item.agentId}</Table.Td>
              <Table.Td>{item.name}</Table.Td>
              <Table.Td>{item.username}</Table.Td>
              <Table.Td>{item.IP}</Table.Td>
              <Table.Td>
                {dayjs(item.updatedAt).format(DATE_TIME_FORMAT)}
              </Table.Td>
              <Table.Td>
                <Group miw={300}>
                  <Text>{item.sshCommand}</Text>
                  <CopyClipboardIcon value={item.sshCommand} />
                </Group>
              </Table.Td>

              <EditableInputCell
                value={item.note}
                onSave={(note) => handleUpdateAgent({ ...item, note })}
              />
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Fragment>
  );
};

export default Agent;
