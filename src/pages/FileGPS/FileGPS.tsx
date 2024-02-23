import { Title } from "@mantine/core";
import FileList from "components/FileList";
import { Fragment } from "react";

const FileGPS = () => {
  return (
    <Fragment>
      <Title order={3}>Danh sách file brdc GPS</Title>
      <FileList type="GPS" />
    </Fragment>
  );
};

export default FileGPS;
