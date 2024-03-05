import {
  ActionIcon,
  Box,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import dayjs from "configs/dayjs";
import { DATE_TIME_FORMAT } from "constants/common/common";
import { AgentType } from "constants/types/agent";
import { FC, Fragment, useRef } from "react";
import AgentEditModal from "pages/Agent/component/AgentEditModal";

type Props = {
  data: AgentType[];
};

const Line: FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <Flex mt="0.25rem" fz="xs" align="center" justify="space-between">
      <Text fw={500}>{label}</Text>
      <Text c="dimmed">{value}</Text>
    </Flex>
  );
};

const AgentMobile: FC<Props> = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const agentRef = useRef<AgentType | null>(null);

  return (
    <Fragment>
      <Box hiddenFrom="sm">
        {data.map((item: AgentType, index: number) => (
          <Card withBorder shadow="sm" radius="md" key={index} my="xs">
            <Card.Section withBorder inheritPadding py="xs">
              <Group justify="space-between">
                <Text fw="bold" c="blue">
                  {item.agentId}
                </Text>
                <Menu withinPortal position="bottom-end" shadow="sm">
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <IconDots style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={
                        <IconEdit style={{ width: rem(14), height: rem(14) }} />
                      }
                      onClick={() => {
                        agentRef.current = { ...item };
                        open();
                      }}
                    >
                      Chỉnh sửa
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      color="red"
                    >
                      Xóa
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Card.Section>
            <Line label="IP" value={item.IP} />
            <Line
              label="Máy"
              value={item.name + (item.username ? ` (${item.username})` : "")}
            />
            <Line
              label="Cập nhật"
              value={dayjs(item.updatedAt).format(DATE_TIME_FORMAT)}
            />
            <Text mt="sm" c="dimmed">
              <Text span inherit c="var(--mantine-color-anchor)">
                Ghi chú:
              </Text>{" "}
              {item.note}
            </Text>
          </Card>
        ))}
      </Box>
      <AgentEditModal
        opened={opened}
        onClose={close}
        agent={agentRef.current}
      />
    </Fragment>
  );
};

export default AgentMobile;
