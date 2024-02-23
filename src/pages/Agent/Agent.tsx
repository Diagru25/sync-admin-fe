import { Button, Group, Table, Text } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import CopyClipboardIcon from "components/CopyClipboardIcon";
import { DATE_TIME_FORMAT } from "constants/common/common";
import { AgentType } from "constants/types/agent";
import dayjs from "dayjs";
import { useAgents } from "hooks/request";
import { Fragment } from "react";

const Agent = () => {
  const { data, isLoading, error, mutate } = useAgents();

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

  console.log(data);

  return (
    <Fragment>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Tên máy</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>IP</Table.Th>
            <Table.Th>Ngày cập nhật</Table.Th>
            <Table.Th>SSH</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.data.map((item: AgentType, index: number) => (
            <Table.Tr key={index}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{item.name}</Table.Td>
              <Table.Td>{item.username}</Table.Td>
              <Table.Td>{item.IP}</Table.Td>
              <Table.Td>
                {dayjs(item.updatedAt).format(DATE_TIME_FORMAT)}
              </Table.Td>
              <Table.Td>
                <Group>
                  <Text>{item.sshCommand}</Text>
                  <CopyClipboardIcon value={item.sshCommand} />
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Fragment>
  );
};

export default Agent;
