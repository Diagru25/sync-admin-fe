import { Title } from "@mantine/core";
import FileList from "components/FileList";
import { Fragment } from "react";

const FileAll = () => {
  return (
    <Fragment>
      <Title order={3}>Danh sách file brdc đa hệ</Title>
      <FileList type="MULTIPLE" />
    </Fragment>
  );
};

export default FileAll;
