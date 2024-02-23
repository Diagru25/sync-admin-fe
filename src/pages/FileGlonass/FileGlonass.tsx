import { Title } from "@mantine/core";
import FileList from "components/FileList";
import { Fragment } from "react";

const FileGlonass = () => {
  return (
    <Fragment>
      <Title order={3}>Danh sách file brdc GLONASS</Title>
      <FileList type="GLONASS" />
    </Fragment>
  );
};

export default FileGlonass;
