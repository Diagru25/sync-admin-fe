import { Button, SimpleGrid, rem } from "@mantine/core";
import { IconDownload, IconRefresh } from "@tabler/icons-react";
import { BrdcType } from "constants/types/brdc";
import { useFiles } from "hooks/request";
import { FC, Fragment } from "react";
import { saveAs } from "file-saver";

type Props = {
  type?: string;
};
const FileList: FC<Props> = ({ type }) => {
  const { data, isLoading, error, mutate } = useFiles(type);

  const handleDownloadFile = (filename: string, filepath: string) => {
    saveAs(filepath, filename);
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
        {data.data.map((item: BrdcType) => (
          <Button
            size="xs"
            fullWidth
            variant="subtle"
            rightSection={
              <IconDownload style={{ width: rem(16), height: rem(16) }} />
            }
            styles={{
              label: {
                fontSize: "14px",
              },
            }}
            onClick={() => handleDownloadFile(item.filename, item.filePath)}
          >
            {item.filename}
          </Button>
        ))}
      </SimpleGrid>
    </Fragment>
  );
};

export default FileList;
