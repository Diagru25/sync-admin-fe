/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from "react";
import "@mantine/dropzone/styles.css";
import { IconUpload, IconFile, IconX } from "@tabler/icons-react";
import { Dropzone, FileRejection, FileWithPath } from "@mantine/dropzone";
import { Button, Center, Group, Text, Title, rem } from "@mantine/core";
import dayjs from "dayjs";
import { REGEX_EXT } from "constants/common/common";

const UploadBrdc = () => {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [fileRejected, setFileRejected] = useState<FileRejection | null>(null);

  const handleValidFile = (file: File) => {
    const tmp_arr = file.name.split(".");
    const ext = `.${tmp_arr[tmp_arr.length - 1]}`;

    if (!ext.toLowerCase().match(REGEX_EXT)) {
      return {
        code: "Sai định dạng",
        message: `Định dạng này không được hỗ trợ`,
      };
    } else {
      console.log("gggg");
    }

    return null;
  };

  return (
    <Fragment>
      <Title order={3}>Upload file brdc</Title>
      <Dropzone
        mt="md"
        onDrop={(files) => {
          setFile(files[0]);
          setFileRejected(null);
        }}
        onReject={(files) => {
          setFileRejected(files[0]);
          setFile(null);
        }}
        maxSize={5 * 1024 ** 2}
        validator={handleValidFile}
        multiple={false}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFile
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          {file && (
            <Text size="xl" inline>
              {file.name}
            </Text>
          )}

          {fileRejected && (
            <div>
              <Text size="xl" inline c="red">
                {fileRejected.file.name}
              </Text>
              <Text size="sm" c="red" inline mt={7}>
                {fileRejected.errors[0].code}
              </Text>
            </div>
          )}

          {!file && !fileRejected && (
            <div>
              <Text size="xl" inline>
                Drag brdc file here or click to select file
              </Text>
              <Text size="sm" c="dimmed" inline mt={7} opacity={0.7}>
                Accept *.{dayjs().format("YY")}n file
              </Text>
            </div>
          )}
        </Group>
      </Dropzone>
      {file && !fileRejected && (
        <Center mt="md">
          <Button leftSection={<IconUpload />}>Upload</Button>
        </Center>
      )}
    </Fragment>
  );
};

export default UploadBrdc;
