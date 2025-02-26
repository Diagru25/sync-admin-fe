import {
  ActionIcon,
  Button,
  Group,
  SimpleGrid,
  Text,
  Tooltip,
  rem,
} from "@mantine/core";
import { IconRefresh, IconTrash } from "@tabler/icons-react";
import { BrdcType } from "constants/types/brdc";
import { useFiles } from "hooks/request";
import { FC, Fragment } from "react";
import { saveAs } from "file-saver";
import classes from "./style.module.css";
import { fileApi } from "apis/fileApi";
import { useNotification } from "hooks/ui";

type Props = {
  type?: string;
};
const FileList: FC<Props> = ({ type }) => {
  const { notification } = useNotification();

  const { data, isLoading, error, mutate } = useFiles(type);

  const handleDownloadFile = (filename: string, filepath: string) => {
    saveAs(filepath, filename);
  };

  const handleDeleteFile = async (filename: string) => {
    try {
      const res = await fileApi.delete(filename);
      if (res.data?.success) {
        notification.success(`Xoá file ${filename} thành công!`);
        mutate();
      } else {
        notification.error(
          res.data?.message || `Xoá file ${filename} thất bại!`
        );
      }
    } catch (e) {
      notification.error("Lỗi không xác định! Xoá file thất bại");
    }
  };

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
      <SimpleGrid cols={{ base: 1, sm: 2, md: 5, lg: 4, xl: 5 }} mt="md">
        {data.data.map((item: BrdcType, index: number) => (
          <Tooltip key={index} label="Click to download">
            <Group
              w="100%"
              justify="center"
              gap="xs"
              className={classes["file-item-box"]}
              onClick={() => handleDownloadFile(item.filename, item.filePath)}
            >
              <Text fw="bold" size="sm" c="blue">
                {item.filename}
              </Text>
              <ActionIcon
                variant="subtle"
                aria-label="Settings"
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(item.filename);
                }}
              >
                <IconTrash
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          </Tooltip>
        ))}
      </SimpleGrid>
    </Fragment>
  );
};

export default FileList;
