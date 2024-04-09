/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from "react";
import "@mantine/dropzone/styles.css";
import { IconUpload, IconFile, IconX } from "@tabler/icons-react";
import { Dropzone, FileRejection, FileWithPath } from "@mantine/dropzone";
import { Button, Center, Group, Text, Title, rem } from "@mantine/core";
import dayjs from "dayjs";
import { REGEX_EXT } from "constants/common/common";
import { genFileNameBrdc } from "utils/string";
import { uploadApi } from "apis/uploadApi";
import { useNotification } from "hooks/ui";

const UploadBrdc = () => {
  const { notification } = useNotification();
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [fileRejected, setFileRejected] = useState<FileRejection | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleValidFile = (file: File) => {
    const tmp_arr = file.name.split(".");
    const ext = `.${tmp_arr[tmp_arr.length - 1]}`;

    if (!ext.toLowerCase().match(REGEX_EXT)) {
      return {
        code: "Sai định dạng",
        message: `Định dạng này không được hỗ trợ`,
      };
    } else {
      return null;
    }
  };

  const handleSelectedFile = (files: FileWithPath[]) => {
    setFile(files[0]);
    setFileRejected(null);
  };

  const handleUploadBrdc = () => {
    const reader = new FileReader();
    if (file) {
      reader.readAsText(file, "UTF-8");

      reader.onload = function (evt) {
        if (evt.target) {
          const fileContent = evt.target.result || "";

          let filename = genFileNameBrdc(fileContent as string);
          filename = filename ? filename : file.name;
          setUploading(true);
          uploadApi
            .uploadBrdc(file, filename)
            .then((res) => {
              setUploading(false);
              if (res?.data?.success === true)
                notification.success("Thông báo", "Upload file thành công!");
              else
                notification.error("Upload file thất bại", res?.data?.message);
            })
            .catch((err) => {
              setUploading(false);
              notification.error("Upload file thất bại", err.toString());
            });
        }
      };
    }
  };

  return (
    <Fragment>
      <Title order={3}>Upload file brdc</Title>
      <Dropzone
        mt="md"
        onDrop={handleSelectedFile}
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
          <Button
            loading={uploading}
            leftSection={<IconUpload />}
            onClick={handleUploadBrdc}
          >
            Upload
          </Button>
        </Center>
      )}
    </Fragment>
  );
};

export default UploadBrdc;
